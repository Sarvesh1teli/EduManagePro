import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface FeePaymentFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export function FeePaymentForm({ onSubmit, onCancel }: FeePaymentFormProps) {
  const [formData, setFormData] = useState({
    studentId: "",
    amount: "",
    paymentMethod: "",
    paymentDate: new Date().toISOString().split("T")[0],
    transactionId: "",
    feeType: "",
    remarks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment submitted:", formData);
    onSubmit?.(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-6">Record Fee Payment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="studentId">Student ID / Roll Number</Label>
            <Input
              id="studentId"
              value={formData.studentId}
              onChange={(e) => handleChange("studentId", e.target.value)}
              placeholder="Enter student ID"
              className="mt-2"
              data-testid="input-student-id"
            />
          </div>
          <div>
            <Label htmlFor="feeType">Fee Type</Label>
            <Select value={formData.feeType} onValueChange={(value) => handleChange("feeType", value)}>
              <SelectTrigger className="mt-2" data-testid="select-fee-type">
                <SelectValue placeholder="Select fee type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tuition">Tuition Fee</SelectItem>
                <SelectItem value="exam">Exam Fee</SelectItem>
                <SelectItem value="transport">Transport Fee</SelectItem>
                <SelectItem value="library">Library Fee</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              placeholder="0.00"
              className="mt-2"
              data-testid="input-amount"
            />
          </div>
          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) => handleChange("paymentMethod", value)}>
              <SelectTrigger className="mt-2" data-testid="select-payment-method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
                <SelectItem value="online">Online Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Input
              id="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e) => handleChange("paymentDate", e.target.value)}
              className="mt-2"
              data-testid="input-payment-date"
            />
          </div>
          <div>
            <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
            <Input
              id="transactionId"
              value={formData.transactionId}
              onChange={(e) => handleChange("transactionId", e.target.value)}
              placeholder="Enter transaction ID"
              className="mt-2"
              data-testid="input-transaction-id"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="remarks">Remarks (Optional)</Label>
            <Input
              id="remarks"
              value={formData.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              placeholder="Add any additional notes"
              className="mt-2"
              data-testid="input-remarks"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
            Cancel
          </Button>
          <Button type="submit" data-testid="button-submit">
            Record Payment
          </Button>
        </div>
      </form>
    </Card>
  );
}
