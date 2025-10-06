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
import type { Student } from "@shared/schema";

interface StudentTableProps {
  students: Student[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

export function StudentTable({ students, onEdit, onDelete, onView }: StudentTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "inactive":
        return "bg-muted/50 text-muted-foreground border-muted";
      case "graduated":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
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
            <TableHead className="font-semibold">Phone</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
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
              <TableCell data-testid={`text-phone-${student.id}`}>{student.phone || "-"}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(student.status)} data-testid={`badge-status-${student.id}`}>
                  {student.status}
                </Badge>
              </TableCell>
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
