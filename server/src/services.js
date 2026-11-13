// Sample entries for the demo page. This is not an official government service catalogue.
export const services = [
  {
    id: "department-directory",
    name: "Department-wise services",
    description: "Browse the official service directory by government department.",
    href: "https://www.tn.gov.in/services.php"
  },
  {
    id: "government-forms",
    name: "Government information and forms",
    description: "Start from the Government of Tamil Nadu portal to find published forms and information.",
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
