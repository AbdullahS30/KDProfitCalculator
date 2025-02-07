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

export default function Fertilizer() {
  const [results, setResults] = useState(null);

  const form = useForm({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      landArea: 100,
      fertilizerPerAcre: 3,
      fertilizerCommission: 77,
    },
  });

  function onSubmit(values: any) {
    const results = calculateCommissions(values);
    setResults(results);
  }

  return (
    <CalculatorLayout title="Fertilizer Calculator">
      <div className="space-y-6">
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="landArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KDL Market Penetration (Acres)</FormLabel>
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
                name="fertilizerPerAcre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirement per Acre (Bags)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter number of fertilizer bags needed per acre
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fertilizerCommission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Commission per Unit (PKR)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter commission amount per fertilizer bag
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
