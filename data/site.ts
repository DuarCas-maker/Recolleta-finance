export const site = {
  name: "RECOLLETA FINANCIAL",
  shortName: "Recolleta",
  legalName: "Recolleta Financial",
  description:
    "Corporate funding command center for U.S. businesses, with structured applications, document intake, and payment modeling.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://recolleta-financial.example.com",
  email: "contact@recolletafinancial.example",
  phone: "(888) 555-0147",
  address: "United States",
  colors: {
    teal: "#085D54",
    charcoal: "#202C33",
    accent: "#6BAFA8",
    mist: "#E7F1F0",
    white: "#FFFFFF"
  }
};

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Calculator", href: "/calculator" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Apply", href: "/apply" },
  { label: "Contact", href: "/contact" }
];

export const fundingMetrics = [
  { label: "Funding Readiness", value: 94, suffix: "%", detail: "Sample package signal" },
  { label: "Command Sections", value: 5, suffix: "", detail: "Business to signature" },
  { label: "Capital Uses", value: 6, suffix: "", detail: "Common funding scenarios" },
  { label: "Validation Points", value: 18, suffix: "", detail: "Before webhook submission" }
];

export const fundingSolutions = [
  {
    title: "Working Capital",
    summary: "Operating capital requests for payroll, inventory, marketing, and short-cycle cash-flow pressure.",
    metrics: ["Cash-flow context", "Document package", "Use-of-funds notes"]
  },
  {
    title: "Revenue Based Financing",
    summary: "Revenue-aligned funding review for businesses with active deposits and repeatable sales activity.",
    metrics: ["Revenue pattern", "Deposit cadence", "Repayment scenario"]
  },
  {
    title: "Equipment Funding",
    summary: "Capital requests for machinery, vehicles, kitchen equipment, and other operating assets.",
    metrics: ["Asset category", "Quote review", "Term comparison"]
  },
  {
    title: "Expansion Capital",
    summary: "Funding packages for new locations, hiring, renovations, and strategic growth campaigns.",
    metrics: ["Timeline", "Capital stack", "Business case"]
  },
  {
    title: "Bridge Liquidity",
    summary: "Short-horizon requests organized around near-term obligations and incoming receivables.",
    metrics: ["Timing gap", "Repayment source", "Priority schedule"]
  }
];

export const pipelineSteps = [
  {
    label: "01 Business",
    title: "Establish the company file",
    body: "Company identity, entity type, tax ID, incorporation state, and business timing are captured first."
  },
  {
    label: "02 Owner",
    title: "Verify the principal",
    body: "Owner 1 uses separate first and last names in the interface, then submits as one ownerName field."
  },
  {
    label: "03 Ownership",
    title: "Map control clearly",
    body: "Ownership percentages are validated and a second owner is included only when the applicant says yes."
  },
  {
    label: "04 Documents",
    title: "Package the proof",
    body: "Bank statements and business tax returns are checked for type and size before conversion to raw Base64."
  },
  {
    label: "05 Submit",
    title: "Route the JSON v2 package",
    body: "The final payload is sent directly to the configured intake webhook with the required commercial fields."
  }
];

export const testimonials = [
  {
    quote:
      "Sample: The application made each required document and owner field visible before we submitted the package.",
    name: "Sample restaurant operator",
    company: "Regional hospitality group",
    metric: "5-section package completed",
    sample: true
  },
  {
    quote:
      "Sample: The estimate helped us compare monthly and weekly scenarios before moving into document review.",
    name: "Sample retail founder",
    company: "Multi-location retail business",
    metric: "2 payment views modeled",
    sample: true
  },
  {
    quote:
      "Sample: Recolleta's intake workspace felt polished and serious without becoming a generic finance form.",
    name: "Sample operations lead",
    company: "Specialty services company",
    metric: "100% readiness check",
    sample: true
  }
];

export const entityTypes = [
  "Sole Proprietorship",
  "LLC",
  "Corporation",
  "Partnership",
  "Non-Profit"
] as const;

export const statesAndTerritories = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "DC",
  "PR",
  "GU",
  "VI",
  "AS",
  "MP"
] as const;

export const disclosureTexts = [
  "The above hereby authorizes Recolleta Financial, on a on exclusive basis, to seek financial transactions on its behalf from the date stated herein, and otherwise from time to time until any and all loans and/or revenue based financings are repaid in full and the relationship with the merchant is completed, including but not limited to for any renewal or for any purpose relating thereto.",
  "By signing below, the Merchant and its owners/principals: (1) certify that all information and documents submitted in connection with this application are true, correct, and complete; and (2) authorize Recolleta Financial and its assignees/designees to obtain credit reports and any other information regarding the Merchant and its owners and principals to verify the information provided on the application."
];

export const submissionConfig = {
  webhookUrl:
    process.env.NEXT_PUBLIC_WEBHOOK_URL || "https://n8n.srv939555.hstgr.cloud/webhook/submit-forms-curated",
  formId: "RF-001",
  company: "recolleta",
  source: "recolleta-financial-web",
  action: "create",
  payloadFormat: "json-v2",
  status: "New",
  commercialName: process.env.COMMERCIAL_NAME || "COMMERCIAL_NAME",
  commercialEmail: process.env.COMMERCIAL_EMAIL || "COMMERCIAL_EMAIL",
  commercialIdentifier: process.env.COMMERCIAL_IDENTIFIER || "COMMERCIAL_IDENTIFIER"
};

export const legalDraftNotice = "DRAFT — FOR LEGAL REVIEW BEFORE PRODUCTION.";

export const legalPages = {
  privacy: {
    title: "Privacy Policy",
    updated: "September 1, 2026",
    sections: [
      {
        heading: "Overview",
        body: "This draft Privacy Policy explains how Recolleta Financial may collect, use, and share information submitted through this website and related business funding inquiry workflows. It is provided for legal review before production use."
      },
      {
        heading: "Information We May Collect",
        body: "We may collect business contact details, company identifiers, ownership information, funding request details, uploaded documents, signature data, technical metadata, and communications submitted by visitors or applicants."
      },
      {
        heading: "How Information May Be Used",
        body: "Information may be used to review funding requests, communicate with applicants, validate application completeness, coordinate with assignees or designees, maintain records, improve website functionality, and comply with applicable obligations."
      },
      {
        heading: "Sharing",
        body: "Information may be shared with service providers, funding-related assignees or designees, professional advisors, and parties involved in evaluating or processing a requested transaction. Recolleta Financial should review final sharing practices with counsel before launch."
      },
      {
        heading: "Retention",
        body: "Records may be retained for business, legal, audit, dispute-resolution, and operational purposes. Final retention periods should be confirmed before production."
      },
      {
        heading: "Your Choices",
        body: "Applicants may contact Recolleta Financial to request access, correction, or deletion where available under applicable law. Some records may need to be retained where required or reasonably necessary."
      }
    ]
  },
  terms: {
    title: "Terms of Use",
    updated: "September 1, 2026",
    sections: [
      {
        heading: "Use of Site",
        body: "This draft Terms of Use page governs access to the Recolleta Financial website. The site is intended for business funding inquiries and general informational use."
      },
      {
        heading: "No Guarantee",
        body: "Content, calculators, examples, workflow indicators, and sample testimonials are illustrative and do not guarantee approval, eligibility, funding availability, terms, rates, or timing."
      },
      {
        heading: "Submitted Information",
        body: "Users are responsible for submitting true, correct, and complete information. Recolleta Financial may rely on submitted information when reviewing or routing a funding request."
      },
      {
        heading: "Website Availability",
        body: "Recolleta Financial may modify, suspend, or discontinue website features at any time. The site may not always be uninterrupted or error-free."
      },
      {
        heading: "Limitation of Liability",
        body: "To the extent permitted by law, Recolleta Financial should define limitations of liability, warranty disclaimers, and dispute terms with counsel before production deployment."
      }
    ]
  },
  security: {
    title: "Data & Security Notice",
    updated: "September 1, 2026",
    sections: [
      {
        heading: "Purpose",
        body: "This draft notice explains general data handling expectations for Recolleta Financial's website intake workflow. It does not make compliance certifications, infrastructure claims, or security guarantees."
      },
      {
        heading: "Sensitive Information",
        body: "The application may request sensitive ownership and business information for funding review. Applicants should submit information only through the intended form and avoid sending sensitive data through general contact messages."
      },
      {
        heading: "Browser Storage",
        body: "The funding application is designed not to store sensitive application information in persistent browser storage such as localStorage or sessionStorage."
      },
      {
        heading: "Transmission",
        body: "Submissions are transmitted to the configured intake endpoint. Final production infrastructure, access controls, logging, and retention practices should be reviewed before launch."
      },
      {
        heading: "Operational Review",
        body: "Recolleta Financial should review vendor access, webhook handling, document retention, and incident response procedures before collecting production applications."
      }
    ]
  },
  disclosures: {
    title: "Disclosures",
    updated: "September 1, 2026",
    sections: [
      {
        heading: "Illustrative Information",
        body: "Website metrics, funding readiness indicators, sample stories, and calculator outputs are illustrative and are not financing offers, commitments, approvals, or guarantees."
      },
      {
        heading: "Calculator",
        body: "Calculator outputs are estimates generated from user inputs and the configured demo annual interest rate. Actual financing terms may differ after review."
      },
      {
        heading: "Application Authorization",
        body: disclosureTexts.join(" ")
      },
      {
        heading: "Legal Review",
        body: "This page is draft copy and should be reviewed by qualified counsel before production use."
      }
    ]
  }
};
