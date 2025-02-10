import { useState, useEffect } from "react";
import { useLocation } from "wouter"; // Use useLocation for navigation
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import FertilizerCalculator from "@/components/calculator/FertilizerCalculator";
import DirectInputsCalculator from "@/components/calculator/DirectInputsCalculator";
import ProductBasedCalculator from "@/components/calculator/ProductBasedCalculator";
import CropSalesCalculator from "@/components/calculator/CropSalesCalculator";
import MachineSalesCalculator from "@/components/calculator/MachineSalesCalculator";
import ResultsDisplay from "@/components/calculator/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { CalculatorInput } from "@shared/schema";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Calculator() {
  // Add console.log to debug
  const editingScenario = sessionStorage.getItem("editingScenario");
  console.log("Editing Scenario:", editingScenario);

  const [calculatorData, setCalculatorData] = useState<CalculatorInput>(() => {
    if (editingScenario) {
      const scenario = JSON.parse(editingScenario);
      // Don't remove the session storage immediately
      // sessionStorage.removeItem("editingScenario"); // Remove this line
      return scenario.data;
    }
    return {
      fertilizerEntries: [],
      directInputEntries: [],
      productEntries: [],
      cropEntries: [],
      machineEntries: [],
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveAsNew, setIsSaveAsNew] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null);
  const [scenarioName, setScenarioName] = useState(() => {
    if (editingScenario) {
      const scenario = JSON.parse(editingScenario);
      return scenario.name;
    }
    return "";
  });
  
  const [editingId, setEditingId] = useState(() => {
    if (editingScenario) {
      const scenario = JSON.parse(editingScenario);
      return scenario.id;
    }
    return null;
  });

  // Remove session storage after all state is initialized
  useEffect(() => {
    if (editingScenario) {
      sessionStorage.removeItem("editingScenario");
    }
  }, []);

  const [, setLocation] = useLocation();

  const saveScenario = (saveAsNew: boolean = false) => {
    if (saveAsNew || !editingId) {
      setIsSaveAsNew(true);
      setIsModalOpen(true);
    } else {
      handleSaveScenario(false);
    }
  };

  const handleSaveScenario = (asNew: boolean = false) => {
    const scenarios = JSON.parse(localStorage.getItem("scenarios") || "[]");
    let scenarioId: string;
    
    if (!asNew && editingId) {
      scenarioId = editingId;
      const updatedScenarios = scenarios.map((s: any) => 
        s.id === editingId 
          ? { ...s, name: scenarioName, data: calculatorData }
          : s
      );
      localStorage.setItem("scenarios", JSON.stringify(updatedScenarios));
    } else {
      if (!scenarioName.trim()) return;
      
      scenarioId = Date.now().toString();
      const newScenario = {
        id: scenarioId,
        name: scenarioName.trim(),
        data: calculatorData,
      };
      localStorage.setItem("scenarios", JSON.stringify([...scenarios, newScenario]));
    }

    setIsModalOpen(false);
    setSavedScenarioId(scenarioId);
    setShowConfirmation(true);
    
    // Navigate after delay
    setTimeout(() => {
      setShowConfirmation(false);
      setLocation(`/scenarios/${scenarioId}`);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-1 sm:px-4 py-2 sm:py-8">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-8 w-8"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-xl sm:text-3xl font-bold">KDukaan Profit Calculator</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="fertilizer" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="fertilizer" className="text-sm">Fertilizer</TabsTrigger>
                <TabsTrigger value="direct" className="text-sm">Direct Inputs</TabsTrigger>
                <TabsTrigger value="product" className="text-sm">Products</TabsTrigger>
                <TabsTrigger value="crop" className="text-sm">Crop Sales</TabsTrigger>
                <TabsTrigger value="machine" className="text-sm">Machines</TabsTrigger>
              </TabsList>

              <TabsContent value="fertilizer">
                <FertilizerCalculator data={calculatorData} onChange={setCalculatorData} />
              </TabsContent>

              <TabsContent value="direct">
                <DirectInputsCalculator data={calculatorData} onChange={setCalculatorData} />
              </TabsContent>

              <TabsContent value="product">
                <ProductBasedCalculator data={calculatorData} onChange={setCalculatorData} />
              </TabsContent>

              <TabsContent value="crop">
                <CropSalesCalculator data={calculatorData} onChange={setCalculatorData} />
              </TabsContent>

              <TabsContent value="machine">
                <MachineSalesCalculator data={calculatorData} onChange={setCalculatorData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultsDisplay data={calculatorData} />
          <div className="flex gap-4">
            <Button 
              className="flex-1" 
              onClick={() => saveScenario(false)}
            >
              {editingId ? 'Save Changes' : 'Save Scenario'}
            </Button>
            {editingId && (
              <Button 
                className="flex-1" 
                variant="outline" 
                onClick={() => saveScenario(true)}
              >
                Save as New
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save {isSaveAsNew ? 'New' : ''} Scenario</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter scenario name"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            className="w-full"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsModalOpen(false);
              setIsSaveAsNew(false);
            }}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleSaveScenario(isSaveAsNew)} 
              disabled={!scenarioName.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
          </DialogHeader>
          <p>Scenario saved successfully!</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
