'use client';

import { Container, Typography, Box } from '@mui/material';
import NarrativeForm from '@/components/NarrativeForm';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Blockchain Suitability Assessment
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          This tool helps organisations evaluate whether blockchain is an
          appropriate architectural choice based on data, stakeholders, and cost considerations.
        </Typography>

        <NarrativeForm />
      </Box>
    </Container>
  );
}
