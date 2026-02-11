'use client';

import { Box, Typography, Divider, Button } from '@mui/material';
import { Answer } from './content';
import { buildReport } from './reportBuilder';

/**
 * NarrativeResult
 * Shows ONLY the final canonical verdict from the flowchart
 */
export default function NarrativeResult({
  answers,
}: {
  answers: Record<string, Answer>;
}) {
  const verdict = deriveFinalVerdict(answers);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Assessment Summary
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mt: 2 }}
      >
        {verdict}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Button
        variant="outlined"
        onClick={() => downloadPDF(answers)}
      >
        Download PDF Report
      </Button>
    </Box>
  );
}

/**
 * Maps answers directly to the canonical outcomes
 * defined in the flowchart
 */
function deriveFinalVerdict(
  answers: Record<string, Answer>
): string {
  // 1. No decentralisation required → exit
  if (answers['decentralised_need'] === 'no') {
    return 'Please search for alternative models';
  }

  // 2. Cost constraints override everything
  if (
    answers['budget'] === 'no' ||
    answers['long_term_cost'] === 'no'
  ) {
    return 'Please search for alternative models';
  }

  // 3. Sensitive data + known participants
  if (
    answers['sensitive_data'] === 'yes' &&
    answers['known_participants'] === 'yes'
  ) {
    return 'A Private Permissioned Ledger can be an optimum choice here';
  }

  // 4. Default case → public permissionless
  return 'A Public Permissionless Ledger can be an optimum choice here';
}

/**
 * Client-side PDF download
 */
async function downloadPDF(
  answers: Record<string, Answer>
) {
  const verdict = deriveFinalVerdict(answers);

  const res = await fetch('/api/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answers,
      verdict,
    }),
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'Blockchain_Assessment_Report.pdf';
  a.click();

  window.URL.revokeObjectURL(url);
}
