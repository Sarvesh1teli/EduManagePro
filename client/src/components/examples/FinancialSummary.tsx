import { FinancialSummary } from "../FinancialSummary";

export default function FinancialSummaryExample() {
  const mockData = {
    income: 125000,
    expenses: 78500,
    balance: 46500,
    period: "January 2024",
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <FinancialSummary data={mockData} />
    </div>
  );
}
