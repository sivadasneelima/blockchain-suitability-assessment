'use client';

import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import { Question, Answer } from './content';

interface QuestionBlockProps {
  question: Question;
  value?: Answer;
  onChange: (id: string, value: Answer) => void;
}

export default function QuestionBlock({
  question,
  value,
  onChange,
}: QuestionBlockProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        {question.text}
      </Typography>

      <RadioGroup
        row
        value={value ?? ''}
        onChange={(e) =>
          onChange(question.id, e.target.value as Answer)
        }
      >
        <FormControlLabel
          value="yes"
          control={<Radio />}
          label="Yes"
        />
        <FormControlLabel
          value="no"
          control={<Radio />}
          label="No"
        />
      </RadioGroup>
    </Box>
  );
}
