
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import type { Scenario } from "@shared/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Scenarios() {
  const { data: scenarios = [], isLoading } = useQuery<Scenario[]>({
    queryKey: ["scenarios"],
    queryFn: () => fetch("/api/scenarios").then(res => res.json())
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Saved Scenarios</h1>
            <p className="text-muted-foreground mt-2">
              View and compare your previously saved scenarios
            </p>
          </div>
          <Link href="/calculator">
            <Button>
              <Calculator className="mr-2 h-4 w-4" />
              New Calculation
            </Button>
          </Link>
        </header>

        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <p>Loading scenarios...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Land Area</TableHead>
                    <TableHead>Fertilizer MP</TableHead>
                    <TableHead>Direct Inputs MP</TableHead>
                    <TableHead>Products Qty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scenarios.map((scenario) => (
                    <TableRow key={scenario.id}>
                      <TableCell className="font-medium">{scenario.name}</TableCell>
                      <TableCell>{scenario.landArea} acres</TableCell>
                      <TableCell>{scenario.fertilizer.marketPenetration}%</TableCell>
                      <TableCell>{scenario.directInputs.marketPenetration}%</TableCell>
                      <TableCell>{scenario.products.quantity}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
