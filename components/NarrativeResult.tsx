'use client';

import { Box, Typography, Divider, Button } from '@mui/material';
import { Answer } from './content';
import { buildReport } from './reportBuilder';

interface NarrativeResultProps {
  answers: Record<string, Answer>;
}

export default function NarrativeResult({ answers }: NarrativeResultProps) {
  const report = buildReport(answers);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Assessment Summary
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, color: 'text.primary' }}>
        Verdict: {report.summary}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* This renders beautifully on your main page web UI */}
      <Box sx={{ mt: 2, mb: 3 }}>
        {report.sections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {section.title}
            </Typography>
            {section.paragraphs.map((p, pIdx) => (
              <Typography key={pIdx} variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                • {p}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>

      {/* FIX: We pass both report.summary AND report.sections directly into the downloader */}
      <Button
        variant="outlined"
        onClick={() => downloadPDF(answers, report.summary, report.sections)}
      >
        Download PDF Report
      </Button>
    </Box>
  );
}

/**
 * Client-side PDF download passing full dynamic text parameters
 */
async function downloadPDF(
  answers: Record<string, Answer>, 
  verdict: string, 
  sections: { title: string; paragraphs: string[] }[]
) {
  const res = await fetch('/api/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answers,
      verdict,
      sections, // FIX: This hands the bullet array over to your pdf-lib engine in route.ts
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