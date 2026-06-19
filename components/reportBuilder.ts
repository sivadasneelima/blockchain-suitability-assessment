import { questions, Answer } from './content';

export function buildReport(answers: Record<string, Answer>) {
  const sections: { title: string; paragraphs: string[] }[] = [];

  const bySection = (section: string) =>
    questions.filter((q) => q.section === section);

  const buildSection = (title: string, sectionKey: string) => {
    const paragraphs: string[] = [];

    bySection(sectionKey).forEach((q) => {
      const impact = q.narrativeImpact?.[answers[q.id]];
      if (impact) paragraphs.push(impact);
    });

    if (paragraphs.length) {
      sections.push({ title, paragraphs });
    }
  };

  buildSection('Data Considerations', 'data');
  buildSection('Stakeholder Considerations', 'stakeholder');
  buildSection('Cost Considerations', 'cost');

  return {
    summary: deriveSummary(answers),
    sections,
  };
}

function deriveSummary(answers: Record<string, Answer>): string {
  // 1. Existing Initial Check: Is decentralization outright rejected?
  if (answers['decentralised_need'] === 'no') {
    return 'This assessment indicates that decentralisation is not a core requirement. Traditional centralized database architectures are recommended for optimal efficiency, speed, and simplicity.';
  }

  // ==========================================
  // FIX 1: THE LEDGER GATEKEEPER SHORT-CIRCUIT
  // Check if ANY core data ledger properties are actually needed
  // ==========================================
  const requiresLedgerProperties = 
    answers['traceability'] === 'yes' || 
    answers['authentication'] === 'yes' || 
    answers['ownership'] === 'yes' || 
    answers['timestamping'] === 'yes' || 
    answers['tamper_evident'] === 'yes';

  if (!requiresLedgerProperties) {
    return 'While your framework prefers a decentralized organizational layout, your data profile does not require core ledger properties like traceability, asset ownership tracking, or cryptographic immutability. Deploying a public blockchain ledger here would introduce unnecessary architectural complexity, transaction costs, and latent delays. A traditional distributed database or peer-to-peer data layout is highly recommended.';
  }

  // ==========================================
  // FIX 2: SHARED ACCESS CHECK (Writers)
  // ==========================================
  if (answers['shared_access'] === 'no') {
    return 'Because your solution does not feature write operations distributed across multiple independent external entities, a shared consensus state machine is mathematically unnecessary. A centralized or distributed database secured with append-only cryptographic auditing logs (e.g., verifiable Merkle tree ledgers) provides the necessary transparency with vastly higher transaction throughput.';
  }

  // 2. Existing Cost Constraint Check
  if (answers['budget'] === 'no' || answers['long_term_cost'] === 'no') {
    return 'While some characteristics align with blockchain systems, cost considerations significantly restrict infrastructure implementation. Traditional open-source database setups or hyper-low-cost public Layer-2 sidechains should be prioritized over costly enterprise node hosting structures.';
  }

  // 3. Existing Check: Known + Sensitive (Private Permissioned)
  if (answers['sensitive_data'] === 'yes' && answers['known_participants'] === 'yes') {
    return 'The assessment suggests that a private permissioned ledger or consortium network offers an appropriate balance between transactional privacy control among vetted corporate peers and multi-party decentralized data consistency.';
  }

  // ==========================================
  // FIX 3: INTEGRATE HYBRID MODEL NUANCE (Unknown + Sensitive Data)
  // Perfect for decentralized public systems with privacy constraints
  // ==========================================
  if (answers['sensitive_data'] === 'yes' && answers['known_participants'] === 'no') {
    return 'Your architectural goals target a broad base of unknown participants requiring high decentralization, but the information handled is sensitive. To prevent exposing raw states on open block explorers, the optimal model is a Hybrid Framework: state verification roots anchored on a Public Layer-1/Layer-2 ledger, paired with a secure off-chain storage layer bound together using Zero-Knowledge Proofs (ZKPs) to verify execution correctness while keeping underlying data private.';
  }

  // 4. Default Fallback (Only reached if it passes every single gatekeeper check safely)
  return 'Overall, the system characteristics align strongly with public permissionless decentralized ledger technologies. Your requirements demand unhindered global access, cross-entity execution tracking, and high censorship resistance across unknown participants.';
}