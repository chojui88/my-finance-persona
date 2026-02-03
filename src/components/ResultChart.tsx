import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ResultChartProps {
  userResult: string;
}

// Mock data for demonstration - in production, this would come from a database
const generateMockData = () => {
  const types = [
    'ACGL', 'ACGV', 'ACSL', 'ACSV',
    'APGL', 'APGV', 'APSL', 'APSV',
    'ICGL', 'ICGV', 'ICSL', 'ICSV',
    'IPGL', 'IPGV', 'IPSL', 'IPSV',
  ];

  return types.map((type) => ({
    type,
    count: Math.floor(Math.random() * 150) + 20,
  }));
};

export const ResultChart = ({ userResult }: ResultChartProps) => {
  const data = useMemo(() => generateMockData(), []);

  const colors = [
    'hsl(222, 47%, 35%)',
    'hsl(168, 50%, 45%)',
    'hsl(15, 85%, 60%)',
    'hsl(280, 60%, 55%)',
  ];

  return (
    <div className="w-full bg-card rounded-2xl shadow-card p-4 md:p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        전체 사용자 유형 분포
      </h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: -10, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis
              dataKey="type"
              tick={{ fontSize: 10, fill: 'hsl(215, 20%, 45%)' }}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'hsl(215, 20%, 45%)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 32%, 91%)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number) => [`${value}명`, '참여자 수']}
              labelFormatter={(label) => `유형: ${label}`}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.type === userResult
                      ? 'hsl(15, 85%, 60%)'
                      : colors[index % colors.length]
                  }
                  opacity={entry.type === userResult ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">
        * 나의 유형은 <span className="font-semibold text-accent">{userResult}</span>입니다
      </p>
    </div>
  );
};
