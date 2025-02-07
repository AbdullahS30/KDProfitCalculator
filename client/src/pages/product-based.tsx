import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculationSchema } from "@shared/schema";
import { calculateCommissions } from "@/lib/calculate";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultsDisplay } from "@/components/results-display";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProductBased() {
  const [results, setResults] = useState(null);

  const form = useForm({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      productQuantity: 50,
      productValue: 2500,
      productCommission: 2.86,
    },
  });

  function onSubmit(values: any) {
    const results = calculateCommissions(values);
    setResults(results);
  }

  return (
    <CalculatorLayout title="Product Based Calculator">
      <div className="space-y-6">
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="productQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (Units)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter number of product units sold
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Gross Sales Value (PKR)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter average sales value per unit
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productCommission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Commission Percentage (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter commission percentage (e.g. 2.86)
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button type="submit">Calculate Commission</Button>
            </form>
          </Form>
        </Card>

        {results && <ResultsDisplay results={results} />}
      </div>
    </CalculatorLayout>
  );
}
