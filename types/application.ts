export type SubmissionDocument = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  contentBase64: string;
};

export type BusinessDraft = {
  legalCompanyName: string;
  entityType: string;
  federalTaxId: string;
  stateOfIncorporation: string;
  businessInceptionDate: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
};

export type OwnerDraft = {
  firstName: string;
  lastName: string;
  ownerEmail: string;
  ssn: string;
  dateOfBirth: string;
  cellPhone: string;
  ownerAddress: string;
  ownerCity: string;
  ownerState: string;
  ownerZip: string;
  ownershipPercentage: string;
};

export type OwnerPayload = Omit<OwnerDraft, "ownershipPercentage"> & {
  ownerName: string;
  ownershipPercentage: number;
};

export type SecondOwnerPayload = {
  ownerName: string;
  ownerEmail: string;
  ssn: string;
  dateOfBirth: string;
  cellPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  ownershipPercentage: number;
};

export type ApplicationPayload = BusinessDraft & {
  ownerName: string;
  ownerEmail: string;
  ssn: string;
  dateOfBirth: string;
  cellPhone: string;
  ownerAddress: string;
  ownerCity: string;
  ownerState: string;
  ownerZip: string;
  ownershipPercentage: number;
  hasSecondOwner: "Yes" | "No";
  secondOwner: SecondOwnerPayload | null;
  signatureDataUrl: string;
  status: string;
  submittedAt: string;
  submissionId: string;
  disclosureAccepted: boolean;
  disclosures: Array<{ id: string; text: string; accepted: boolean }>;
  documents: {
    bankStatements: SubmissionDocument[];
    businessTaxReturn: SubmissionDocument[];
  };
};

export type ApplicationDraft = Omit<ApplicationPayload, "status" | "submittedAt" | "submissionId" | "disclosures">;
