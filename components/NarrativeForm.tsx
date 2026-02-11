'use client';

import { useState } from 'react';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { questions, Answer } from './content';
import QuestionBlock from './QuestionBlock';
import NarrativeResult from './NarrativeResult';
import { sections, Section } from '@/components/sections';



export default function NarrativeForm() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [currentSection, setCurrentSection] = useState<Section>('entry');
  const [submitted, setSubmitted] = useState(false);

  const sectionIndex = sections.indexOf(currentSection);
  const progress = ((sectionIndex + 1) / sections.length) * 100;

  const sectionQuestions = questions.filter(
    (q) => q.section === currentSection
  );

  const isSectionComplete = sectionQuestions.every(
    (q) => answers[q.id]
  );

  const handleAnswer = (id: string, value: Answer) => {
    setAnswers({ ...answers, [id]: value });
  };

  const goNext = () => {
    if (currentSection === 'entry') {
      if (answers['decentralised_need'] === 'no') {
        setSubmitted(true);
        return;
      }
    }

    const next = sections[sectionIndex + 1];
    if (next) setCurrentSection(next);
    else setSubmitted(true);
  };

  if (submitted) {
    return <NarrativeResult answers={answers} />;
  }

  return (
    <Box>
      {/* Progress indicator */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mb: 3 }}
      />

      <Typography variant="h6" gutterBottom>
        {sectionTitle(currentSection)}
      </Typography>

      {sectionQuestions.map((q) => (
        <QuestionBlock
          key={q.id}
          question={q}
          value={answers[q.id]}
          onChange={handleAnswer}
        />
      ))}

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        disabled={!isSectionComplete}
        onClick={goNext}
      >
        Continue
      </Button>
    </Box>
  );
}

function sectionTitle(section: Section) {
  switch (section) {
    case 'entry':
      return 'Initial Assessment';
    case 'data':
      return 'The Data Matter';
    case 'stakeholder':
      return 'The Stakeholder Matter';
    case 'cost':
      return 'The Cost Matter';
    default:
      return '';
  }
}
