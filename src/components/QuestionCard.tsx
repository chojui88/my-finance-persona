import { Question, categoryInfo } from '@/data/questions';
import { LikertScale } from './LikertScale';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  value: number | null;
  onChange: (value: number) => void;
  isActive: boolean;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  value,
  onChange,
  isActive,
}: QuestionCardProps) => {
  const category = categoryInfo[question.category];

  return (
    <div
      className={cn(
        'w-full transition-all duration-500 ease-out',
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute pointer-events-none'
      )}
    >
      <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 space-y-6">
        {/* Category badge */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
            {category.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {category.low} ↔ {category.high}
          </span>
        </div>

        {/* Question number */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-bold text-primary">
            Q{questionNumber}
          </span>
          <span className="text-muted-foreground text-sm">/ {totalQuestions}</span>
        </div>

        {/* Question text */}
        <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
          {question.text}
        </p>

        {/* Likert scale */}
        <div className="pt-4">
          <LikertScale value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
