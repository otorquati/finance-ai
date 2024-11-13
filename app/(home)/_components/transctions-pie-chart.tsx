"use client";

import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { TransactionType } from "@prisma/client";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investimento",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}
const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];
  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            {/* Icone */}
            <TrendingUp size={16} className="text-primary" />
            <p className="text-sm text-muted-foreground">Receita</p>
            <p className="text-sm font-bold">
              {typesPercentage[TransactionType.DEPOSIT]}%
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            {/* Icone */}
            <TrendingDown size={16} className="text-red-500" />
            <p className="text-sm text-muted-foreground">Despesas</p>
            <p className="text-sm font-bold">
              {typesPercentage[TransactionType.EXPENSE]}%
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            {/* Icone */}
            <PiggyBank size={16} />
            <p className="text-sm text-muted-foreground">Investimento</p>
            <p className="text-sm font-bold">
              {typesPercentage[TransactionType.INVESTMENT]}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
