import { QuickActions } from "../QuickActions";

export default function QuickActionsExample() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <QuickActions
        onAddStudent={() => console.log("Add student clicked")}
        onRecordPayment={() => console.log("Record payment clicked")}
        onAddExpense={() => console.log("Add expense clicked")}
        onGenerateReport={() => console.log("Generate report clicked")}
      />
    </div>
  );
}
