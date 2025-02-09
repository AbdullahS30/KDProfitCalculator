import { useState } from "react";
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
  const [calculatorData, setCalculatorData] = useState<CalculatorInput>({
    fertilizerEntries: [],
    directInputEntries: [],
    productEntries: [],
    cropEntries: [],
    machineEntries: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scenarioName, setScenarioName] = useState("");

  const [, setLocation] = useLocation(); // Use setLocation to navigate

  // Function to save scenario locally
  const saveScenario = () => {
    setIsModalOpen(true);
  };

  const handleSaveScenario = () => {
    if (!scenarioName.trim()) return; // Prevent empty names

    const scenarios = JSON.parse(localStorage.getItem("scenarios") || "[]");

    const newScenario = {
      id: Date.now().toString(),
      name: scenarioName.trim(),
      data: { ...calculatorData },
    };

    localStorage.setItem("scenarios", JSON.stringify([...scenarios, newScenario]));
    setIsModalOpen(false);
    setScenarioName(""); // Reset input

    // Navigate to home after saving
    setLocation("/");
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
          <Button className="w-full" onClick={saveScenario}>
            Save Scenario
          </Button>
        </div>
      </div>

      {/* Save Scenario Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Scenario</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter scenario name"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            className="w-full"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveScenario} disabled={!scenarioName.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
