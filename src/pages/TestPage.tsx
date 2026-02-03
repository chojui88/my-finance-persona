import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '@/data/questions';
import { QuestionCard } from '@/components/QuestionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Answers } from '@/utils/calculateResult';

const TestPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  const handleAnswer = useCallback((value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    // Auto-advance to next question after a short delay
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300);
    }
  }, [currentQuestion.id, isLastQuestion]);

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion && answers[currentQuestion.id]) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (allAnswered) {
      // Store answers in sessionStorage for result page
      sessionStorage.setItem('financialMbtiAnswers', JSON.stringify(answers));
      navigate('/result');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-primary">금융 MBTI</h1>
            <span className="text-sm text-muted-foreground">
              나의 금융 성향 찾기
            </span>
          </div>
          <ProgressBar current={answeredCount} total={totalQuestions} />
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-2xl mx-auto px-4 py-8">
        <div className="relative min-h-[400px]">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={index + 1}
              totalQuestions={totalQuestions}
              value={answers[question.id] || null}
              onChange={handleAnswer}
              isActive={index === currentQuestionIndex}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">이전</span>
          </Button>

          <div className="flex gap-1">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentQuestionIndex
                    ? 'bg-primary w-6'
                    : answers[questions[index].id]
                    ? 'bg-primary/50'
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="gradient-accent text-accent-foreground hover:opacity-90 transition-opacity"
            >
              결과보기
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline">다음</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </main>

      {/* Footer hint */}
      <footer className="container max-w-2xl mx-auto px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          각 문항에 솔직하게 답변해주세요
        </p>
      </footer>
    </div>
  );
};

export default TestPage;
