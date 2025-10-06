import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  feeStatus: "paid" | "pending" | "overdue";
  attendance: number;
}

interface StudentTableProps {
  students: Student[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function StudentTable({ students, onEdit, onDelete, onView }: StudentTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "pending":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Roll Number</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Class</TableHead>
            <TableHead className="font-semibold">Section</TableHead>
            <TableHead className="font-semibold">Fee Status</TableHead>
            <TableHead className="font-semibold">Attendance</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="hover-elevate" data-testid={`row-student-${student.id}`}>
              <TableCell className="font-mono text-sm" data-testid={`text-roll-${student.id}`}>
                {student.rollNumber}
              </TableCell>
              <TableCell className="font-medium" data-testid={`text-name-${student.id}`}>
                {student.name}
              </TableCell>
              <TableCell data-testid={`text-class-${student.id}`}>{student.class}</TableCell>
              <TableCell data-testid={`text-section-${student.id}`}>{student.section}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(student.feeStatus)} data-testid={`badge-status-${student.id}`}>
                  {student.feeStatus}
                </Badge>
              </TableCell>
              <TableCell data-testid={`text-attendance-${student.id}`}>{student.attendance}%</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView?.(student.id)}
                    data-testid={`button-view-${student.id}`}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit?.(student.id)}
                    data-testid={`button-edit-${student.id}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete?.(student.id)}
                    data-testid={`button-delete-${student.id}`}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
