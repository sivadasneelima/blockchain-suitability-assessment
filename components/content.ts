// components/content.ts

export type Answer = 'yes' | 'no';

export interface Question {
  id: string;
  section: 'entry' | 'data' | 'stakeholder' | 'cost';
  text: string;
  narrativeImpact?: {
    yes?: string;
    no?: string;
  };
}

export const questions: Question[] = [
  // ENTRY
  {
    id: 'decentralised_need',
    section: 'entry',
    text: 'Does your solution require a decentralised framework?',
    narrativeImpact: {
      no: 'Your responses indicate that decentralisation is not a core requirement. In such cases, conventional architectures are often simpler, more efficient, and easier to govern than blockchain-based systems.',
    },
  },

  // DATA MATTER
  {
    id: 'shared_access',
    section: 'data',
    text: 'Does your solution need to provide shared access to data outside your organisation?',
    narrativeImpact: {
      yes: 'The need to share data across organisational boundaries suggests a requirement for a common, synchronised data layer.',
    },
  },
  {
    id: 'traceability',
    section: 'data',
    text: 'Does your solution require complete traceability of data?',
    narrativeImpact: {
      yes: 'Traceability requirements align well with append-only and auditable data structures typically offered by distributed ledgers.',
    },
  },
  {
    id: 'authentication',
    section: 'data',
    text: 'Does the data need to be verified or authenticated?',
    narrativeImpact: {
      yes: 'The need for verification and authentication indicates potential value in cryptographically verifiable records.',
    },
  },
  {
    id: 'ownership',
    section: 'data',
    text: 'Do you need to certify ownership of assets included in your solution?',
    narrativeImpact: {
      yes: 'Certifying ownership across multiple parties is a well-established use case for blockchain-based systems.',
    },
  },
  {
    id: 'timestamping',
    section: 'data',
    text: 'Do you need time-stamped records?',
    narrativeImpact: {
      yes: 'Time-stamped records support non-repudiation and accountability across distributed processes.',
    },
  },
  {
    id: 'tamper_evident',
    section: 'data',
    text: 'Does the data need to be tamper-evident?',
    narrativeImpact: {
      yes: 'Tamper-evident data is a foundational property of blockchain and other distributed ledger technologies.',
    },
  },
  {
    id: 'sensitive_data',
    section: 'data',
    text: 'Do you need to store sensitive data?',
    narrativeImpact: {
      yes: 'The presence of sensitive data introduces constraints related to transparency, access control, and regulatory compliance.',
    },
  },

  // STAKEHOLDER MATTER
  {
    id: 'numerous_participants',
    section: 'stakeholder',
    text: 'Are the participants involved in this process numerous?',
    narrativeImpact: {
      yes: 'A large and distributed set of participants can increase coordination complexity in centralised systems.',
    },
  },
  {
    id: 'intermediaries',
    section: 'stakeholder',
    text: 'Do you wish to eliminate intermediaries or third parties and automate the process?',
    narrativeImpact: {
      yes: 'Reducing reliance on intermediaries aligns with decentralised execution and automated settlement models.',
    },
  },
  {
    id: 'known_participants',
    section: 'stakeholder',
    text: 'Are the participants known?',
    narrativeImpact: {
      yes: 'Known participants enable controlled access, governance, and permissioned ledger models.',
      no: 'Unknown or open participation environments align more closely with public permissionless blockchain models.',
    },
  },

  // COST MATTER
  {
    id: 'budget',
    section: 'cost',
    text: 'Can the organisation afford to allocate a periodic budget for building the blockchain solution?',
    narrativeImpact: {
      no: 'Budgetary constraints significantly reduce the feasibility of blockchain-based solutions, regardless of technical suitability.',
    },
  },
  {
    id: 'long_term_cost',
    section: 'cost',
    text: 'Is the solution primarily focused on reducing costs in the long term?',
    narrativeImpact: {
      no: 'If long-term cost reduction is not a primary objective, the additional complexity introduced by blockchain may not be justified.',
    },
  },
];
