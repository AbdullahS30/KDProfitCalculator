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

export default function CropSales() {
  const [results, setResults] = useState(null);

  const form = useForm({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      landArea: 100,
      cropYieldPerAcre: 40,
      cropPricePerMaund: 3700,
      cropCommission: 0.30,
    },
  });

  function onSubmit(values: any) {
    const results = calculateCommissions(values);
    setResults(results);
  }

  return (
    <CalculatorLayout title="Crop Sales Calculator">
      <div className="space-y-6">
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="landArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paidawar Land Booked (Acres)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter total land area in acres
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cropYieldPerAcre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Yield per Acre (Maunds)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter expected yield per acre in maunds
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cropPricePerMaund"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Approx Price per Maund (PKR)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter approximate price per maund
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cropCommission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Commission Percentage (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter commission percentage (e.g. 0.30)
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
