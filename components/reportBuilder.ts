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

function deriveSummary(answers: Record<string, Answer>) {
  if (answers['decentralised_need'] === 'no') {
    return 'This assessment indicates that decentralisation is not a core requirement. Traditional architectures are likely to be more appropriate.';
  }

  if (answers['budget'] === 'no' || answers['long_term_cost'] === 'no') {
    return 'While some characteristics align with blockchain systems, cost considerations significantly reduce feasibility. Alternative models should be explored.';
  }

  if (answers['sensitive_data'] === 'yes' && answers['known_participants'] === 'yes') {
    return 'The assessment suggests that a private permissioned ledger may offer an appropriate balance between data integrity and access control.';
  }

  return 'Overall, the system characteristics align with decentralised ledger technologies, subject to appropriate design choices.';
}
