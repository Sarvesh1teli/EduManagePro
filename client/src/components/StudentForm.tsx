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

interface StudentFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

export function StudentForm({ onSubmit, onCancel, initialData }: StudentFormProps) {
  const [formData, setFormData] = useState(initialData || {
    firstName: "",
    lastName: "",
    rollNumber: "",
    class: "",
    section: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onSubmit?.(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-6">Student Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Enter first name"
              className="mt-2"
              data-testid="input-first-name"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Enter last name"
              className="mt-2"
              data-testid="input-last-name"
            />
          </div>
          <div>
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              value={formData.rollNumber}
              onChange={(e) => handleChange("rollNumber", e.target.value)}
              placeholder="e.g., 2024001"
              className="mt-2"
              data-testid="input-roll-number"
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              className="mt-2"
              data-testid="input-date-of-birth"
            />
          </div>
          <div>
            <Label htmlFor="class">Class</Label>
            <Select value={formData.class} onValueChange={(value) => handleChange("class", value)}>
              <SelectTrigger className="mt-2" data-testid="select-class">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="section">Section</Label>
            <Select value={formData.section} onValueChange={(value) => handleChange("section", value)}>
              <SelectTrigger className="mt-2" data-testid="select-section">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
              <SelectTrigger className="mt-2" data-testid="select-gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="student@example.com"
              className="mt-2"
              data-testid="input-email"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 234 567 8900"
              className="mt-2"
              data-testid="input-phone"
            />
          </div>
          <div>
            <Label htmlFor="guardianName">Guardian Name</Label>
            <Input
              id="guardianName"
              value={formData.guardianName}
              onChange={(e) => handleChange("guardianName", e.target.value)}
              placeholder="Enter guardian name"
              className="mt-2"
              data-testid="input-guardian-name"
            />
          </div>
          <div>
            <Label htmlFor="guardianPhone">Guardian Phone</Label>
            <Input
              id="guardianPhone"
              value={formData.guardianPhone}
              onChange={(e) => handleChange("guardianPhone", e.target.value)}
              placeholder="+1 234 567 8900"
              className="mt-2"
              data-testid="input-guardian-phone"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter complete address"
              className="mt-2"
              data-testid="input-address"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
            Cancel
          </Button>
          <Button type="submit" data-testid="button-submit">
            Save Student
          </Button>
        </div>
      </form>
    </Card>
  );
}
