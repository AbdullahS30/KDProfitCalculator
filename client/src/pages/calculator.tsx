import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import FertilizerCalculator from "@/components/calculator/FertilizerCalculator";
import DirectInputsCalculator from "@/components/calculator/DirectInputsCalculator";
import ProductBasedCalculator from "@/components/calculator/ProductBasedCalculator";
import CropSalesCalculator from "@/components/calculator/CropSalesCalculator";
import MachineSalesCalculator from "@/components/calculator/MachineSalesCalculator";
import ResultsDisplay from "@/components/calculator/ResultsDisplay";
import { useState } from "react";
import type { CalculatorInput } from "@shared/schema";

export default function Calculator() {
  const [calculatorData, setCalculatorData] = useState<CalculatorInput>({
    fertilizerEntries: [],
    directInputEntries: [],
    productEntries: [],
    cropEntries: [],
    machineEntries: [],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">KDukaan Profit Calculator</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="fertilizer" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="fertilizer" className="text-sm">Fertilizer</TabsTrigger>
                <TabsTrigger value="direct" className="text-sm">Direct Inputs</TabsTrigger>
                <TabsTrigger value="product" className="text-sm">Products</TabsTrigger>
                <TabsTrigger value="crop" className="text-sm whitespace-nowrap">Crop Sales</TabsTrigger>
                <TabsTrigger value="machine" className="text-sm whitespace-nowrap">Machines</TabsTrigger>
              </TabsList>

              <TabsContent value="fertilizer">
                <FertilizerCalculator 
                  data={calculatorData}
                  onChange={setCalculatorData}
                />
              </TabsContent>

              <TabsContent value="direct">
                <DirectInputsCalculator 
                  data={calculatorData}
                  onChange={setCalculatorData}
                />
              </TabsContent>

              <TabsContent value="product">
                <ProductBasedCalculator 
                  data={calculatorData}
                  onChange={setCalculatorData}
                />
              </TabsContent>

              <TabsContent value="crop">
                <CropSalesCalculator 
                  data={calculatorData}
                  onChange={setCalculatorData}
                />
              </TabsContent>

              <TabsContent value="machine">
                <MachineSalesCalculator 
                  data={calculatorData}
                  onChange={setCalculatorData}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <ResultsDisplay data={calculatorData} />
      </div>
    </div>
  );
}