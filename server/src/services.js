// These are prototype records, not live government application links.
export const services = [
  {
    id: 'revenue-community',
    name: 'Community Certificate',
    department: 'Revenue',
    description: 'A sample entry showing how a certificate service could appear in the catalogue.',
  },
  {
    id: 'revenue-income',
    name: 'Income Certificate',
    department: 'Revenue',
    description: 'A second sample entry, kept here to demonstrate the list and its grouping.',
  },
  {
    id: 'voter-correction',
    name: 'Voter ID Correction',
    department: 'Election services',
    description: 'A placeholder record for the catalogue layout; no application journey is connected.',
  },
];

export function listServices() {
  return services;
}
