import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateResult, ResultType, Answers } from '@/utils/calculateResult';
import { ResultChart } from '@/components/ResultChart';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink } from 'lucide-react';

const ResultPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<ResultType | null>(null);

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem('financialMbtiAnswers');
    
    if (!storedAnswers) {
      navigate('/');
      return;
    }

    const answers: Answers = JSON.parse(storedAnswers);
    const calculatedResult = calculateResult(answers);
    setResult(calculatedResult);
  }, [navigate]);

  const handleRetake = () => {
    sessionStorage.removeItem('financialMbtiAnswers');
    navigate('/');
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-primary text-center">
            금융 MBTI 결과
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Result card */}
        <div className="animate-slide-up">
          <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 text-center space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">나의 금융 성향은</p>
              <div className="gradient-primary text-primary-foreground rounded-xl py-6 px-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                  {result.displayText}
                </h2>
              </div>
            </div>

            {/* Type breakdown */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-secondary/50 rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">위험선호</p>
                <p className="font-semibold text-foreground">{result.types.riskPreference}</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">의사결정</p>
                <p className="font-semibold text-foreground">{result.types.decisionMaking}</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">감정</p>
                <p className="font-semibold text-foreground">{result.types.emotion}</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">자기조절</p>
                <p className="font-semibold text-foreground">{result.types.selfControl}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <ResultChart userResult={result.code} />
        </div>

        {/* CTA section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-secondary/30 rounded-2xl p-6 text-center space-y-4">
            <p className="text-foreground font-medium">
              자세한 검사 결과는 밸류디 웹을 통해 확인하세요
            </p>
            <Button
              variant="outline"
              className="group"
              onClick={() => window.open('https://valuedy.com', '_blank')}
            >
              밸류디 바로가기
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Retake button */}
        <div className="flex justify-center pt-4">
          <Button
            variant="ghost"
            onClick={handleRetake}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="mr-2 w-4 h-4" />
            다시 검사하기
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
