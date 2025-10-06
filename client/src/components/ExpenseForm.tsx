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

interface ExpenseFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    vendor: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    paymentMethod: "",
    invoiceNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Expense submitted:", formData);
    onSubmit?.(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-6">Record Expense</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="category">Expense Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger className="mt-2" data-testid="select-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="salaries">Salaries</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
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
            <Label htmlFor="vendor">Vendor (Optional)</Label>
            <Input
              id="vendor"
              value={formData.vendor}
              onChange={(e) => handleChange("vendor", e.target.value)}
              placeholder="Enter vendor name"
              className="mt-2"
              data-testid="input-vendor"
            />
          </div>
          <div>
            <Label htmlFor="date">Expense Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="mt-2"
              data-testid="input-date"
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
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number (Optional)</Label>
            <Input
              id="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) => handleChange("invoiceNumber", e.target.value)}
              placeholder="Enter invoice number"
              className="mt-2"
              data-testid="input-invoice-number"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter expense description"
              className="mt-2"
              data-testid="input-description"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
            Cancel
          </Button>
          <Button type="submit" data-testid="button-submit">
            Save Expense
          </Button>
        </div>
      </form>
    </Card>
  );
}
