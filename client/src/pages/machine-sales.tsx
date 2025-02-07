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

export default function MachineSales() {
  const [results, setResults] = useState(null);

  const form = useForm({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      landArea: 200,
      machineCostPerAcre: 6000,
      machineCommission: 2,
    },
  });

  function onSubmit(values: any) {
    const results = calculateCommissions(values);
    setResults(results);
  }

  return (
    <CalculatorLayout title="Machine Sales Calculator">
      <div className="space-y-6">
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="landArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Machine Orders Booked (Acres)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter total land area for machine orders
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="machineCostPerAcre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Cost per Acre (PKR)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter average machine cost per acre
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="machineCommission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Commission Percentage (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter commission percentage (e.g. 2.00)
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
