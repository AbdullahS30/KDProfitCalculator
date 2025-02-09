import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator } from "lucide-react";

export default function Scenarios() {
  const [scenarios, setScenarios] = useState([]);

  // Load saved scenarios from localStorage
  useEffect(() => {
    const savedScenarios = JSON.parse(localStorage.getItem("scenarios") || "[]");
    setScenarios(savedScenarios);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Saved Scenarios</h1>
            <p className="text-muted-foreground mt-2">View and compare your previously saved scenarios</p>
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
            {scenarios.length === 0 ? (
              <p>No saved scenarios yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scenarios.map((scenario) => (
                      <TableRow key={scenario.id}>
                        <TableCell className="font-medium">{scenario.name}</TableCell>
                        <TableCell>
                        <Link href={`/scenarios/${scenario.id}`}>
  <Button variant="outline" size="sm">View Details</Button>
</Link>

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
