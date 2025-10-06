import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <Card className={`p-6 ${className || ""}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2" data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}-label`}>
            {title}
          </p>
          <p className="text-3xl font-bold" data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}-value`}>
            {value}
          </p>
          {trend && (
            <p className={`text-xs mt-2 ${trend.isPositive ? "text-chart-2" : "text-destructive"}`} data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}-trend`}>
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
