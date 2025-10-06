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
import type { Staff } from "@shared/schema";

interface StaffTableProps {
  staff: Staff[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

export function StaffTable({ staff, onEdit, onDelete, onView }: StaffTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "on-leave":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "inactive":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Employee ID</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Department</TableHead>
            <TableHead className="font-semibold">Designation</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((member) => (
            <TableRow key={member.id} className="hover-elevate" data-testid={`row-staff-${member.id}`}>
              <TableCell className="font-mono text-sm" data-testid={`text-employee-id-${member.id}`}>
                {member.employeeId}
              </TableCell>
              <TableCell className="font-medium" data-testid={`text-name-${member.id}`}>
                {member.name}
              </TableCell>
              <TableCell data-testid={`text-department-${member.id}`}>{member.department}</TableCell>
              <TableCell data-testid={`text-designation-${member.id}`}>{member.designation}</TableCell>
              <TableCell className="text-sm" data-testid={`text-email-${member.id}`}>
                {member.email}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(member.status)} data-testid={`badge-status-${member.id}`}>
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onView?.(member.id)} data-testid={`button-view-${member.id}`}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit?.(member.id)} data-testid={`button-edit-${member.id}`}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete?.(member.id)} data-testid={`button-delete-${member.id}`}>
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
