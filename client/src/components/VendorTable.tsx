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
import type { Vendor } from "@shared/schema";

interface VendorTableProps {
  vendors: Vendor[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

export function VendorTable({ vendors, onEdit, onDelete, onView }: VendorTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Vendor Name</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Contact Person</TableHead>
            <TableHead className="font-semibold">Phone</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id} className="hover-elevate" data-testid={`row-vendor-${vendor.id}`}>
              <TableCell className="font-medium" data-testid={`text-name-${vendor.id}`}>
                {vendor.name}
              </TableCell>
              <TableCell data-testid={`text-category-${vendor.id}`}>{vendor.category}</TableCell>
              <TableCell data-testid={`text-contact-${vendor.id}`}>{vendor.contactPerson}</TableCell>
              <TableCell className="font-mono text-sm" data-testid={`text-phone-${vendor.id}`}>
                {vendor.phone}
              </TableCell>
              <TableCell className="text-sm" data-testid={`text-email-${vendor.id}`}>
                {vendor.email || "-"}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={vendor.status === "active" ? "bg-chart-2/10 text-chart-2 border-chart-2/20" : "bg-muted text-muted-foreground"}
                  data-testid={`badge-status-${vendor.id}`}
                >
                  {vendor.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onView?.(vendor.id)} data-testid={`button-view-${vendor.id}`}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit?.(vendor.id)} data-testid={`button-edit-${vendor.id}`}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete?.(vendor.id)} data-testid={`button-delete-${vendor.id}`}>
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
