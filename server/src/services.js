// These entries are examples for the demo UI, not an official government catalogue.
export const services = [
  {
    id: "department-directory",
    name: "Department-wise services",
    description: "Browse the official service directory by government department.",
    href: "https://www.tn.gov.in/services.php"
  },
  {
    id: "government-forms",
    name: "Government forms",
    description: "Find forms published by Tamil Nadu Government departments.",
    href: "https://www.tn.gov.in/"
  },
  {
    id: "contact-directory",
    name: "Contact directory",
    description: "Find contact information for government offices and departments.",
    href: "https://www.tn.gov.in/"
  }
];

export function listServices() {
  return services;
}
