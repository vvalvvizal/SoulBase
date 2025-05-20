import { useEffect, useRef } from 'react';
import {
  Chart,
  type ChartConfiguration,
  type ChartTypeRegistry,
} from 'chart.js/auto';
interface PoolCompositionChartProps {
  bbtAmount: number;
  polAmount: number;
}

export function PoolCompositionChart({
  bbtAmount,
  polAmount,
}: PoolCompositionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      //이미 차트 인스턴스가 있으면 제거
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d'); //canvas 사용
    if (!ctx) return;

    // Calculate total value

    //현재 exchangeRate가 pol/bbt

    // pol = pol * bbt / bbt
    const bbtValue = bbtAmount; // 그대로
    const polValue = polAmount;
    const totalValue = bbtValue + polValue;

    // Calculate percentages
    const bbtPercentage = (bbtValue / totalValue) * 100;
    const polPercentage = (polValue / totalValue) * 100;

    const config: ChartConfiguration<
      keyof ChartTypeRegistry,
      number[],
      string
    > = {
      type: 'doughnut',
      data: {
        labels: [
          `BBT (${bbtPercentage.toFixed(1)}%)`,
          `POL (${polPercentage.toFixed(1)}%)`,
        ],
        datasets: [
          {
            data: [bbtValue, polValue],
            backgroundColor: ['#3b82f6', '#a855f7'],
            borderColor: ['#2563eb', '#7e22ce'],
            borderWidth: 1,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#e5e7eb',
              font: {
                size: 12,
              },
              padding: 20,
            },
          },
          tooltip: {
            //마우스 올렸을 때 텍스트
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw as number;
                return `${label}: $${value.toLocaleString()}`;
              },
            },
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [bbtAmount, polAmount]);

  return <canvas ref={chartRef} />;
}
