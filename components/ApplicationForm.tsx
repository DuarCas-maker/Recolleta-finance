"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  FileUp,
  Loader2,
  Send,
  ShieldCheck
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { disclosureTexts, entityTypes, statesAndTerritories, submissionConfig } from "@/data/site";
import {
  buildPayload,
  fileToSubmissionDocument,
  isAdult,
  isFederalTaxId,
  isSsn,
  ownerName,
  tenMb
} from "@/lib/application";
import type { ApplicationDraft, BusinessDraft, OwnerDraft, SecondOwnerPayload } from "@/types/application";
import { SignaturePad } from "./SignaturePad";

const emptyBusiness: BusinessDraft = {
  legalCompanyName: "",
  entityType: "",
  federalTaxId: "",
  stateOfIncorporation: "",
  businessInceptionDate: "",
  businessAddress: "",
  businessCity: "",
  businessState: "",
  businessZip: ""
};

const emptyOwner: OwnerDraft = {
  firstName: "",
  lastName: "",
  ownerEmail: "",
  ssn: "",
  dateOfBirth: "",
  cellPhone: "",
  ownerAddress: "",
  ownerCity: "",
  ownerState: "",
  ownerZip: "",
  ownershipPercentage: ""
};

const steps = [
  { number: "01", label: "BUSINESS" },
  { number: "02", label: "OWNER" },
  { number: "03", label: "OWNERSHIP" },
  { number: "04", label: "DOCUMENTS" },
  { number: "05", label: "SIGN & SUBMIT" }
] as const;

type Errors = Record<string, string>;

function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label>
      <span className="label">{label}</span>
      <input className="input" {...props} />
      {error ? <p className="error-text">{error}</p> : null}
    </label>
  );
}

function SelectField({
  label,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return (
    <label>
      <span className="label">{label}</span>
      <select className="input" {...props}>
        {children}
      </select>
      {error ? <p className="error-text">{error}</p> : null}
    </label>
  );
}

function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="grid gap-2 md:grid-cols-5">
      {steps.map((step, index) => {
        const active = currentStep === index;
        const complete = currentStep > index;
        return (
          <div
            key={step.label}
            className={`rounded-lg border p-3 transition ${
              active
                ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                : complete
                  ? "border-primary/20 bg-white text-primary"
                  : "border-primary/10 bg-white/70 text-slate"
            }`}
          >
            <p className="font-heading text-3xl font-extrabold leading-none">{step.number}</p>
            <p className="mt-2 text-xs font-extrabold tracking-[0.16em]">{step.label}</p>
          </div>
        );
      })}
    </div>
  );
}

function OwnerFields({
  owner,
  setOwner,
  errors,
  prefix,
  includeOwnership
}: {
  owner: OwnerDraft;
  setOwner: (owner: OwnerDraft) => void;
  errors: Errors;
  prefix: "primaryOwner" | "secondOwner";
  includeOwnership?: boolean;
}) {
  const update = (key: keyof OwnerDraft, value: string) => setOwner({ ...owner, [key]: value });
  const ownerLabel = prefix === "primaryOwner" ? "Owner 1" : "Owner 2";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field
        label={`${ownerLabel} First Name`}
        value={owner.firstName}
        onChange={(event) => update("firstName", event.target.value)}
        error={errors[`${prefix}.firstName`]}
        autoComplete="given-name"
        required
      />
      <Field
        label={`${ownerLabel} Last Name`}
        value={owner.lastName}
        onChange={(event) => update("lastName", event.target.value)}
        error={errors[`${prefix}.lastName`]}
        autoComplete="family-name"
        required
      />
      <Field
        label="Owner Email"
        type="email"
        value={owner.ownerEmail}
        onChange={(event) => update("ownerEmail", event.target.value)}
        autoComplete="email"
      />
      <Field
        label="SSN"
        placeholder="123-45-6789"
        value={owner.ssn}
        maxLength={11}
        onChange={(event) => update("ssn", event.target.value)}
        error={errors[`${prefix}.ssn`]}
        autoComplete="off"
        required
      />
      <Field
        label="Date of Birth"
        type="date"
        value={owner.dateOfBirth}
        onChange={(event) => update("dateOfBirth", event.target.value)}
        error={errors[`${prefix}.dateOfBirth`]}
        required
      />
      <Field label="Cell Phone" value={owner.cellPhone} onChange={(event) => update("cellPhone", event.target.value)} />
      <Field
        label="Owner Address"
        value={owner.ownerAddress}
        onChange={(event) => update("ownerAddress", event.target.value)}
      />
      <Field label="Owner City" value={owner.ownerCity} onChange={(event) => update("ownerCity", event.target.value)} />
      <SelectField
        label="Owner State / Province"
        value={owner.ownerState}
        onChange={(event) => update("ownerState", event.target.value)}
      >
        <option value="">Select state</option>
        {statesAndTerritories.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </SelectField>
      <Field label="Owner ZIP / Postal Code" value={owner.ownerZip} onChange={(event) => update("ownerZip", event.target.value)} />
      {includeOwnership ? (
        <Field
          label="Ownership Percentage"
          type="number"
          min="0"
          max="100"
          value={owner.ownershipPercentage}
          onChange={(event) => update("ownershipPercentage", event.target.value)}
          error={errors[`${prefix}.ownershipPercentage`]}
          required
        />
      ) : null}
    </div>
  );
}

function validateOwner(
  prefix: "primaryOwner" | "secondOwner",
  owner: OwnerDraft,
  errors: Errors,
  includeOwnership = true
) {
  if (!owner.firstName.trim()) errors[`${prefix}.firstName`] = "Required.";
  if (!owner.lastName.trim()) errors[`${prefix}.lastName`] = "Required.";
  if (!isSsn(owner.ssn)) errors[`${prefix}.ssn`] = "Use format 123-45-6789.";
  if (!owner.dateOfBirth || !isAdult(owner.dateOfBirth)) {
    errors[`${prefix}.dateOfBirth`] = "Owner must be 18 or older and date cannot be in the future.";
  }
  const percent = Number(owner.ownershipPercentage);
  if (includeOwnership && (!owner.ownershipPercentage || !Number.isFinite(percent) || percent < 0 || percent > 100)) {
    errors[`${prefix}.ownershipPercentage`] = "Enter a percentage from 0 to 100.";
  }
}

function isAllowedFile(file: File, allowed: string[]) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  return allowed.includes(file.type) || allowed.includes(extension);
}

function ownerToSecondOwnerPayload(owner: OwnerDraft): SecondOwnerPayload {
  return {
    ownerName: ownerName(owner),
    ownerEmail: owner.ownerEmail,
    ssn: owner.ssn,
    dateOfBirth: owner.dateOfBirth,
    cellPhone: owner.cellPhone,
    address: owner.ownerAddress,
    city: owner.ownerCity,
    state: owner.ownerState,
    zip: owner.ownerZip,
    ownershipPercentage: Number(owner.ownershipPercentage)
  };
}

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState<BusinessDraft>(emptyBusiness);
  const [primaryOwner, setPrimaryOwner] = useState<OwnerDraft>(emptyOwner);
  const [secondOwner, setSecondOwner] = useState<OwnerDraft>(emptyOwner);
  const [hasSecondOwner, setHasSecondOwner] = useState<boolean | null>(null);
  const [bankFiles, setBankFiles] = useState<File[]>([]);
  const [taxFiles, setTaxFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<Errors>({});
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [disclosureAccepted, setDisclosureAccepted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateBusiness = (key: keyof BusinessDraft, value: string) => setBusiness({ ...business, [key]: value });

  const computeErrors = () => {
    const next: Errors = {};
    if (!business.legalCompanyName.trim()) next["business.legalCompanyName"] = "Required.";
    if (!business.entityType) next["business.entityType"] = "Required.";
    if (!isFederalTaxId(business.federalTaxId)) next["business.federalTaxId"] = "Use format 12-3456789.";
    if (!business.stateOfIncorporation) next["business.stateOfIncorporation"] = "Required.";
    if (!business.businessInceptionDate) next["business.businessInceptionDate"] = "Required.";

    validateOwner("primaryOwner", primaryOwner, next, true);
    if (hasSecondOwner === null) next.hasSecondOwner = "Choose yes or no.";
    if (hasSecondOwner) validateOwner("secondOwner", secondOwner, next, true);

    const ownerOnePercent = Number(primaryOwner.ownershipPercentage || 0);
    const ownerTwoPercent = hasSecondOwner ? Number(secondOwner.ownershipPercentage || 0) : 0;
    if (ownerOnePercent + ownerTwoPercent > 100) next.ownershipTotal = "Owner percentages cannot exceed 100%.";

    if (bankFiles.length < 1) next.bankFiles = "Upload one or more bank statements.";
    if (taxFiles.length < 1) next.taxFiles = "Upload one or more business tax return PDFs.";
    if (!signatureDataUrl) next.signatureDataUrl = "Owner 1 signature is required.";
    if (!disclosureAccepted) next.disclosureAccepted = "Disclosure acceptance is required.";

    return next;
  };

  const liveErrors = useMemo(computeErrors, [
    bankFiles.length,
    business,
    disclosureAccepted,
    hasSecondOwner,
    primaryOwner,
    secondOwner,
    signatureDataUrl,
    taxFiles.length
  ]);

  const errorsForStep = (stepIndex: number, source = liveErrors) => {
    const keysByStep = [
      [
        "business.legalCompanyName",
        "business.entityType",
        "business.federalTaxId",
        "business.stateOfIncorporation",
        "business.businessInceptionDate"
      ],
      ["primaryOwner.firstName", "primaryOwner.lastName", "primaryOwner.ssn", "primaryOwner.dateOfBirth"],
      ["primaryOwner.ownershipPercentage", "hasSecondOwner", "secondOwner.firstName", "secondOwner.lastName", "secondOwner.ssn", "secondOwner.dateOfBirth", "secondOwner.ownershipPercentage", "ownershipTotal"],
      ["bankFiles", "taxFiles"],
      ["signatureDataUrl", "disclosureAccepted"]
    ];
    return keysByStep[stepIndex].filter((key) => source[key]);
  };

  const stepComplete = steps.map((_, index) => errorsForStep(index).length === 0 && (index !== 3 || Object.keys(fileErrors).length === 0));
  const completion = Math.round((stepComplete.filter(Boolean).length / steps.length) * 100);

  const handleFiles = (kind: "bank" | "tax", files: FileList | null) => {
    const selected = Array.from(files || []);
    const nextErrors: Errors = {};
    const allowed =
      kind === "bank"
        ? ["application/pdf", "image/jpeg", "image/png", "pdf", "jpg", "jpeg", "png"]
        : ["application/pdf", "pdf"];
    const valid = selected.filter((file) => {
      if (file.size > tenMb) {
        nextErrors[`${kind}-${file.name}`] = `${file.name} exceeds 10 MB.`;
        return false;
      }
      if (!isAllowedFile(file, allowed)) {
        nextErrors[`${kind}-${file.name}`] =
          kind === "bank" ? `${file.name} must be PDF, JPG, JPEG, or PNG.` : `${file.name} must be a PDF.`;
        return false;
      }
      return true;
    });

    setFileErrors((current) => {
      const remaining = Object.fromEntries(Object.entries(current).filter(([key]) => !key.startsWith(`${kind}-`)));
      return { ...remaining, ...nextErrors };
    });
    if (kind === "bank") setBankFiles(valid);
    else setTaxFiles(valid);
  };

  const goNext = () => {
    const nextErrors = computeErrors();
    const visibleErrors = errorsForStep(step, nextErrors);
    setErrors(Object.fromEntries(visibleErrors.map((key) => [key, nextErrors[key]])));
    if (visibleErrors.length > 0 || (step === 3 && Object.keys(fileErrors).length > 0)) return;
    setErrors({});
    setStep((value) => Math.min(value + 1, steps.length - 1));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = computeErrors();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || Object.keys(fileErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const application: ApplicationDraft = {
        ...business,
        ownerName: ownerName(primaryOwner),
        ownerEmail: primaryOwner.ownerEmail,
        ssn: primaryOwner.ssn,
        dateOfBirth: primaryOwner.dateOfBirth,
        cellPhone: primaryOwner.cellPhone,
        ownerAddress: primaryOwner.ownerAddress,
        ownerCity: primaryOwner.ownerCity,
        ownerState: primaryOwner.ownerState,
        ownerZip: primaryOwner.ownerZip,
        ownershipPercentage: Number(primaryOwner.ownershipPercentage),
        hasSecondOwner: hasSecondOwner ? "Yes" : "No",
        secondOwner: hasSecondOwner ? ownerToSecondOwnerPayload(secondOwner) : null,
        documents: {
          bankStatements: await Promise.all(bankFiles.map(fileToSubmissionDocument)),
          businessTaxReturn: await Promise.all(taxFiles.map(fileToSubmissionDocument))
        },
        signatureDataUrl,
        disclosureAccepted
      };

      await fetch(submissionConfig.webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8"
        },
        body: JSON.stringify(buildPayload(application))
      });

      setSuccess(true);
    } catch {
      setSubmitError("The application could not be submitted. Please review the connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="glass-panel rounded-lg p-8 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 size={40} aria-hidden />
        </div>
        <h1 className="mt-5 font-heading text-3xl font-bold text-ink">Application submitted</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate">
          Your Recolleta Financial application package was sent to the configured intake workflow.
        </p>
      </section>
    );
  }

  return (
    <form onSubmit={submit} className="grid min-h-[calc(100vh-96px)] gap-6">
      <StepProgress currentStep={step} />

      <section className="glass-panel grid min-h-[620px] overflow-hidden rounded-lg lg:grid-cols-[0.62fr_0.38fr]">
        <div className="relative order-2 bg-ink p-6 text-white sm:p-8 lg:sticky lg:top-24 lg:min-h-[620px]">
          <div className="absolute inset-y-0 left-0 w-20 -skew-x-12 bg-primary" aria-hidden />
          <p className="relative text-xs font-extrabold uppercase tracking-[0.22em] text-aqua">Funding application</p>
          <p className="relative mt-8 font-heading text-7xl font-extrabold leading-none sm:text-8xl">
            {steps[step].number}
          </p>
          <h2 className="relative mt-3 font-heading text-3xl font-extrabold uppercase text-white sm:text-5xl">
            {steps[step].label}
          </h2>
          <p className="relative mt-6 max-w-md text-sm leading-6 text-white/70">
            One focused group at a time. Required items are validated before the next screen opens.
          </p>
          <div className="relative mt-10 rounded-lg border border-white/15 bg-white/8 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-aqua">Package completion</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/12">
              <div className="h-full rounded-full bg-aqua" style={{ width: `${Math.max(0, Math.min(100, completion))}%` }} />
            </div>
          </div>
        </div>

        <div className="order-1 bg-white p-5 sm:p-8">
          {step === 0 ? (
            <div>
              <h3 className="font-heading text-3xl font-extrabold text-ink">Business profile</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field
                  label="Legal Company Name"
                  value={business.legalCompanyName}
                  onChange={(event) => updateBusiness("legalCompanyName", event.target.value)}
                  error={errors["business.legalCompanyName"]}
                  required
                />
                <SelectField
                  label="Entity Type"
                  value={business.entityType}
                  onChange={(event) => updateBusiness("entityType", event.target.value)}
                  error={errors["business.entityType"]}
                  required
                >
                  <option value="">Select entity</option>
                  {entityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </SelectField>
                <Field
                  label="Federal Tax ID"
                  placeholder="12-3456789"
                  value={business.federalTaxId}
                  maxLength={10}
                  onChange={(event) => updateBusiness("federalTaxId", event.target.value)}
                  error={errors["business.federalTaxId"]}
                  autoComplete="off"
                  required
                />
                <SelectField
                  label="State of Incorporation"
                  value={business.stateOfIncorporation}
                  onChange={(event) => updateBusiness("stateOfIncorporation", event.target.value)}
                  error={errors["business.stateOfIncorporation"]}
                  required
                >
                  <option value="">Select state</option>
                  {statesAndTerritories.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </SelectField>
                <Field
                  label="Business Inception Date"
                  type="date"
                  value={business.businessInceptionDate}
                  onChange={(event) => updateBusiness("businessInceptionDate", event.target.value)}
                  error={errors["business.businessInceptionDate"]}
                  required
                />
                <Field
                  label="Business Address"
                  value={business.businessAddress}
                  onChange={(event) => updateBusiness("businessAddress", event.target.value)}
                />
                <Field
                  label="Business City"
                  value={business.businessCity}
                  onChange={(event) => updateBusiness("businessCity", event.target.value)}
                />
                <SelectField
                  label="Business State / Province"
                  value={business.businessState}
                  onChange={(event) => updateBusiness("businessState", event.target.value)}
                >
                  <option value="">Select state</option>
                  {statesAndTerritories.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </SelectField>
                <Field
                  label="Business ZIP / Postal Code"
                  value={business.businessZip}
                  onChange={(event) => updateBusiness("businessZip", event.target.value)}
                />
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <h3 className="font-heading text-3xl font-extrabold text-ink">Owner 1 identity</h3>
              <p className="mt-2 text-sm text-slate">The UI collects first and last name separately, then submits ownerName.</p>
              <div className="mt-6">
                <OwnerFields
                  owner={primaryOwner}
                  setOwner={setPrimaryOwner}
                  errors={errors}
                  prefix="primaryOwner"
                  includeOwnership={false}
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <h3 className="font-heading text-3xl font-extrabold text-ink">Ownership map</h3>
              <div className="mt-6 grid gap-4">
                <Field
                  label="Owner 1 Ownership Percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={primaryOwner.ownershipPercentage}
                  onChange={(event) => setPrimaryOwner({ ...primaryOwner, ownershipPercentage: event.target.value })}
                  error={errors["primaryOwner.ownershipPercentage"]}
                  required
                />
                <div className="rounded-lg border border-primary/15 bg-background p-4">
                  <span className="label">Is there a 2nd Owner?</span>
                  <div className="flex flex-wrap gap-3">
                    {[
                      ["Yes", true],
                      ["No", false]
                    ].map(([label, value]) => (
                      <button
                        key={label as string}
                        type="button"
                        className={`rounded-lg border px-5 py-3 text-sm font-extrabold ${
                          hasSecondOwner === value
                            ? "border-primary bg-primary text-white"
                            : "border-primary/20 bg-white text-ink hover:bg-background"
                        }`}
                        onClick={() => setHasSecondOwner(value as boolean)}
                      >
                        {label as string}
                      </button>
                    ))}
                  </div>
                  {errors.hasSecondOwner ? <p className="error-text">{errors.hasSecondOwner}</p> : null}
                  {errors.ownershipTotal ? <p className="error-text">{errors.ownershipTotal}</p> : null}
                </div>
                {hasSecondOwner ? (
                  <div className="rounded-lg border border-primary/15 bg-background p-4">
                    <h4 className="font-heading text-xl font-extrabold text-ink">Second owner</h4>
                    <div className="mt-4">
                      <OwnerFields
                        owner={secondOwner}
                        setOwner={setSecondOwner}
                        errors={errors}
                        prefix="secondOwner"
                        includeOwnership
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <h3 className="font-heading text-3xl font-extrabold text-ink">Documents</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="rounded-lg border border-dashed border-primary/35 bg-background p-5">
                  <span className="inline-flex items-center gap-2 text-sm font-extrabold text-ink">
                    <FileUp size={18} className="text-primary" aria-hidden /> Bank Statements
                  </span>
                  <p className="mt-2 text-sm text-slate">One or more PDF, JPG, JPEG, or PNG files. Max 10 MB each.</p>
                  <input
                    className="mt-4 block w-full text-sm"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                    onChange={(event) => handleFiles("bank", event.target.files)}
                  />
                  {errors.bankFiles ? <p className="error-text">{errors.bankFiles}</p> : null}
                  <p className="mt-3 text-xs font-bold text-primary">{bankFiles.length} selected</p>
                </label>
                <label className="rounded-lg border border-dashed border-primary/35 bg-background p-5">
                  <span className="inline-flex items-center gap-2 text-sm font-extrabold text-ink">
                    <FileUp size={18} className="text-primary" aria-hidden /> Business Tax Return
                  </span>
                  <p className="mt-2 text-sm text-slate">One or more PDF files. Max 10 MB each.</p>
                  <input
                    className="mt-4 block w-full text-sm"
                    type="file"
                    multiple
                    accept=".pdf,application/pdf"
                    onChange={(event) => handleFiles("tax", event.target.files)}
                  />
                  {errors.taxFiles ? <p className="error-text">{errors.taxFiles}</p> : null}
                  <p className="mt-3 text-xs font-bold text-primary">{taxFiles.length} selected</p>
                </label>
              </div>
              {Object.values(fileErrors).length > 0 ? (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {Object.values(fileErrors).map((message) => (
                    <p key={message}>{message}</p>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <h3 className="font-heading text-3xl font-extrabold text-ink">Sign and submit</h3>
              <div className="mt-6">
                <SignaturePad onChange={setSignatureDataUrl} />
                {errors.signatureDataUrl ? <p className="error-text">{errors.signatureDataUrl}</p> : null}
              </div>
              <div className="mt-6 grid gap-4">
                {disclosureTexts.map((text) => (
                  <p key={text} className="rounded-lg border border-primary/15 bg-background p-4 text-sm leading-6 text-slate">
                    {text}
                  </p>
                ))}
              </div>
              <label className="mt-5 flex gap-3 rounded-lg border border-primary/15 bg-background p-4">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-primary"
                  checked={disclosureAccepted}
                  onChange={(event) => setDisclosureAccepted(event.target.checked)}
                  required
                />
                <span>
                  <span className="block text-sm font-extrabold text-ink">I accept the required disclosure.</span>
                  <span className="mt-1 block text-sm text-slate">One required disclosureAccepted checkbox.</span>
                </span>
              </label>
              {errors.disclosureAccepted ? <p className="error-text">{errors.disclosureAccepted}</p> : null}
            </div>
          ) : null}
        </div>
      </section>

      <div className="mb-16 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-ink p-4 text-white lg:mb-0">
        <span className="inline-flex items-center gap-2 text-sm text-white/72">
          <ShieldCheck size={18} className="text-aqua" aria-hidden /> Application details stay in memory until submit.
        </span>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={step === 0 || submitting}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/8 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setStep((value) => Math.max(0, value - 1))}
          >
            <ArrowLeft size={18} aria-hidden /> Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-aqua px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-white"
              onClick={goNext}
            >
              Next <ArrowRight size={18} aria-hidden />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-aqua px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? <Loader2 className="animate-spin" size={18} aria-hidden /> : <Send size={18} aria-hidden />}
              Submit Application
            </button>
          )}
        </div>
        {submitError ? <p className="w-full text-sm font-bold text-aqua">{submitError}</p> : null}
      </div>
    </form>
  );
}
