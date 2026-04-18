import * as React from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  title: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionShell({
  title,
  icon,
  actions,
  children,
  className,
  contentClassName,
}: SectionShellProps) {
  return (
    <Card className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", className)}>
      <CardContent className={cn("flex min-h-0 flex-1 flex-col gap-4 p-4", contentClassName)}>
        <PageHeader title={title} icon={icon} actions={actions} />
        {children}
      </CardContent>
    </Card>
  );
}
