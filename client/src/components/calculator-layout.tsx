import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationSidebar } from "./navigation-sidebar";

interface CalculatorLayoutProps {
  title: string;
  children: ReactNode;
}

export function CalculatorLayout({ title, children }: CalculatorLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <NavigationSidebar />
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </main>
    </div>
  );
}
