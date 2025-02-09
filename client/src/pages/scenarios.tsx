import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, ArrowLeft, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function Scenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Load saved scenarios from localStorage
  useEffect(() => {
    const savedScenarios = JSON.parse(localStorage.getItem("scenarios") || "[]");
    setScenarios(savedScenarios);
  }, []);

  const handleDelete = () => {
    if (!deleteId) return;
    
    const updatedScenarios = scenarios.filter((s: any) => s.id !== deleteId);
    localStorage.setItem("scenarios", JSON.stringify(updatedScenarios));
    setScenarios(updatedScenarios);
    setDeleteId(null);
  };

  return (
    <div className="container px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Saved Scenarios</h1>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-muted-foreground">View and compare your previously saved scenarios</p>
          </div>
          <Link href="/calculator">
            <Button className="w-full sm:w-auto">
              <Calculator className="mr-2 h-4 w-4" />
              New Calculation
            </Button>
          </Link>
        </header>

        <Card>
          <CardContent className="p-3 sm:p-6">
            {scenarios.length === 0 ? (
              <p className="text-center py-4">No saved scenarios yet.</p>
            ) : (
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scenarios.map((scenario: any) => (
                      <TableRow key={scenario.id}>
                        <TableCell className="font-medium">{scenario.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/scenarios/${scenario.id}`}>
                              <Button variant="outline" size="sm">View Details</Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setDeleteId(scenario.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
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

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Scenario</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this scenario? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
