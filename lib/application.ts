import { disclosureTexts, submissionConfig } from "@/data/site";
import type { ApplicationPayload, OwnerDraft, SubmissionDocument } from "@/types/application";

export const tenMb = 10 * 1024 * 1024;

export function isFederalTaxId(value: string) {
  return /^\d{2}-\d{7}$/.test(value);
}

export function isSsn(value: string) {
  return /^\d{3}-\d{2}-\d{4}$/.test(value);
}

export function isAdult(dateValue: string) {
  if (!dateValue) return false;

  const birthDate = new Date(`${dateValue}T00:00:00Z`);
  if (Number.isNaN(birthDate.getTime())) return false;

  const now = new Date();
  let age = now.getUTCFullYear() - birthDate.getUTCFullYear();
  const monthDelta = now.getUTCMonth() - birthDate.getUTCMonth();
  const dayDelta = now.getUTCDate() - birthDate.getUTCDate();
  if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) age -= 1;
  return age >= 18;
}

export function ownerName(owner: Pick<OwnerDraft, "firstName" | "lastName">) {
  return `${owner.firstName.trim()} ${owner.lastName.trim()}`.trim();
}

export function generateSubmissionId(now = new Date()) {
  const pad = (value: number) => String(value).padStart(2, "0");
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}${pad(
    now.getUTCHours()
  )}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
  const random = Math.random().toString(36).slice(2, 7).toUpperCase().padEnd(5, "X");
  return `${submissionConfig.formId}-${stamp}-${random}`;
}

export async function fileToSubmissionDocument(file: File): Promise<SubmissionDocument> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    contentBase64: dataUrl.split(",")[1] || ""
  };
}

export function buildPayload(
  application: Omit<ApplicationPayload, "status" | "submittedAt" | "submissionId" | "disclosures">
) {
  const submittedAt = new Date().toISOString();
  const submissionId = generateSubmissionId(new Date(submittedAt));
  const fullApplication: ApplicationPayload = {
    ...application,
    status: submissionConfig.status,
    submittedAt,
    submissionId,
    disclosures: disclosureTexts.map((text, index) => ({
      id: `disclosure-${index + 1}`,
      text,
      accepted: application.disclosureAccepted
    }))
  };

  return {
    company: submissionConfig.company,
    source: submissionConfig.source,
    action: submissionConfig.action,
    payloadFormat: submissionConfig.payloadFormat,
    status: submissionConfig.status,
    submissionId,
    submittedAt,
    commercial: {
      formId: submissionConfig.formId,
      name: submissionConfig.commercialName,
      email: submissionConfig.commercialEmail,
      identifier: submissionConfig.commercialIdentifier
    },
    application: {
      ...fullApplication,
      formId: submissionConfig.formId,
      commercialName: submissionConfig.commercialName,
      commercialEmail: submissionConfig.commercialEmail,
      commercialIdentifier: submissionConfig.commercialIdentifier
    }
  };
}
