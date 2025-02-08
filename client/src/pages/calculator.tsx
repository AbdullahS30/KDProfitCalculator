import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import FertilizerCalculator from "@/components/calculators/fertilizer-calculator";
import DirectInputsCalculator from "@/components/calculators/direct-inputs-calculator";
import ProductCalculator from "@/components/calculators/product-calculator";
import CropSalesCalculator from "@/components/calculators/crop-sales-calculator";
import MachineSalesCalculator from "@/components/calculators/machine-sales-calculator";
import CommissionBreakdown from "@/components/results/commission-breakdown";
import ProfitVisualization from "@/components/results/profit-visualization";
import { useState } from "react";
import type { CalculatorResults } from "@shared/schema";

export default function Calculator() {
  const [results, setResults] = useState<CalculatorResults>({
    fertilizer: 0,
    directInputs: 0,
    products: 0,
    cropSales: 0,
    machineSales: 0,
    total: 0
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Profit Calculator</h1>
          <p className="text-muted-foreground mt-2">
            Calculate commissions and profits across different product categories
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6 order-2 lg:order-1">
            <Card className="p-6">
              <Tabs defaultValue="fertilizer">
                <TabsList className="flex w-full overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-5">
                  <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
                  <TabsTrigger value="direct-inputs">Direct Inputs</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="crop-sales">Crop Sales</TabsTrigger>
                  <TabsTrigger value="machine-sales">Machine Sales</TabsTrigger>
                </TabsList>
                <TabsContent value="fertilizer">
                  <FertilizerCalculator
                    onCalculate={(commission) => 
                      setResults(prev => ({...prev, fertilizer: commission, total: prev.total - prev.fertilizer + commission}))
                    }
                  />
                </TabsContent>
                <TabsContent value="direct-inputs">
                  <DirectInputsCalculator
                    onCalculate={(commission) => 
                      setResults(prev => ({...prev, directInputs: commission, total: prev.total - prev.directInputs + commission}))
                    }
                  />
                </TabsContent>
                <TabsContent value="products">
                  <ProductCalculator
                    onCalculate={(commission) => 
                      setResults(prev => ({...prev, products: commission, total: prev.total - prev.products + commission}))
                    }
                  />
                </TabsContent>
                <TabsContent value="crop-sales">
                  <CropSalesCalculator
                    onCalculate={(commission) => 
                      setResults(prev => ({...prev, cropSales: commission, total: prev.total - prev.cropSales + commission}))
                    }
                  />
                </TabsContent>
                <TabsContent value="machine-sales">
                  <MachineSalesCalculator
                    onCalculate={(commission) => 
                      setResults(prev => ({...prev, machineSales: commission, total: prev.total - prev.machineSales + commission}))
                    }
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <CommissionBreakdown results={results} />
            <ProfitVisualization results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
