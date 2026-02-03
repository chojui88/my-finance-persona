import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, TrendingUp, Shield, Target } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: '감정 성향',
    description: '금융 결정 시 불안감 수준',
  },
  {
    icon: Target,
    title: '자기조절 능력',
    description: '충동 vs 계획적 소비',
  },
  {
    icon: TrendingUp,
    title: '위험 선호도',
    description: '투자 성향 분석',
  },
  {
    icon: Shield,
    title: '의사결정 방식',
    description: '논리적 vs 회피적 판단',
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    sessionStorage.removeItem('financialMbtiAnswers');
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Hero Section */}
      <main className="container max-w-2xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-6 animate-fade-in">
          {/* Logo/Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2">
            <span className="text-sm font-medium text-secondary-foreground">
              💰 나만의 금융 성향 찾기
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            금융 <span className="text-primary">MBTI</span>
            <br />
            테스트
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            12가지 질문으로 알아보는
            <br />
            나의 금융 성향 유형
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleStart}
            className="gradient-accent text-accent-foreground hover:opacity-90 transition-all text-lg px-8 py-6 rounded-xl group shadow-elevated"
          >
            검사 시작하기
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Time estimate */}
          <p className="text-sm text-muted-foreground">
            ⏱️ 약 3분 소요
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-xs text-muted-foreground">
            본 테스트는 금융 성향 파악을 위한 참고용입니다
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
