import { cn } from '@/lib/utils';

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const scaleLabels = [
  { value: 1, label: '전혀 그렇지 않다' },
  { value: 2, label: '그렇지 않다' },
  { value: 3, label: '보통이다' },
  { value: 4, label: '그렇다' },
  { value: 5, label: '매우 그렇다' },
];

export const LikertScale = ({ value, onChange }: LikertScaleProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-2 md:gap-4">
        {scaleLabels.map((item) => (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={cn(
              'flex-1 flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl transition-all duration-300',
              'hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary/20',
              value === item.value
                ? 'bg-primary text-primary-foreground shadow-card scale-105'
                : 'bg-card border border-border hover:border-primary/30'
            )}
          >
            <span
              className={cn(
                'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-lg transition-all',
                value === item.value
                  ? 'bg-primary-foreground/20'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {item.value}
            </span>
            <span className="text-xs md:text-sm font-medium text-center leading-tight hidden sm:block">
              {item.label}
            </span>
          </button>
        ))}
      </div>
      {/* Mobile labels */}
      <div className="flex justify-between mt-2 sm:hidden">
        <span className="text-xs text-muted-foreground">전혀 아니다</span>
        <span className="text-xs text-muted-foreground">매우 그렇다</span>
      </div>
    </div>
  );
};
