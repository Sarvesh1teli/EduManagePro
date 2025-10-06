import { ExpenseForm } from "../ExpenseForm";

export default function ExpenseFormExample() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ExpenseForm
        onSubmit={(data) => console.log("Expense recorded:", data)}
        onCancel={() => console.log("Expense cancelled")}
      />
    </div>
  );
}
