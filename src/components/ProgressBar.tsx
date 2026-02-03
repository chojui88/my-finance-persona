import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">진행률</span>
        <span className="font-semibold text-primary">
          {current} / {total}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out gradient-primary'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
