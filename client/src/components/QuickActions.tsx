import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, DollarSign, FileText, Plus } from "lucide-react";

interface QuickActionsProps {
  onAddStudent?: () => void;
  onRecordPayment?: () => void;
  onAddExpense?: () => void;
  onGenerateReport?: () => void;
}

export function QuickActions({ onAddStudent, onRecordPayment, onAddExpense, onGenerateReport }: QuickActionsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          className="justify-start h-auto py-3"
          onClick={onAddStudent}
          data-testid="button-add-student"
        >
          <UserPlus className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Add New Student</div>
            <div className="text-xs text-muted-foreground">Register a new student</div>
          </div>
        </Button>
        <Button
          variant="outline"
          className="justify-start h-auto py-3"
          onClick={onRecordPayment}
          data-testid="button-record-payment"
        >
          <DollarSign className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Record Payment</div>
            <div className="text-xs text-muted-foreground">Log student fee payment</div>
          </div>
        </Button>
        <Button
          variant="outline"
          className="justify-start h-auto py-3"
          onClick={onAddExpense}
          data-testid="button-add-expense"
        >
          <Plus className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Add Expense</div>
            <div className="text-xs text-muted-foreground">Record school expense</div>
          </div>
        </Button>
        <Button
          variant="outline"
          className="justify-start h-auto py-3"
          onClick={onGenerateReport}
          data-testid="button-generate-report"
        >
          <FileText className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Generate Report</div>
            <div className="text-xs text-muted-foreground">Create financial report</div>
          </div>
        </Button>
      </div>
    </Card>
  );
}
