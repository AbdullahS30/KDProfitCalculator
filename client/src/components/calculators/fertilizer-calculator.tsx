
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const fertilizerEntry = z.object({
  acres: z.number().min(0),
  fertilizerType: z.string(),
  brand: z.string(),
  requirementPerAcre: z.number().min(0),
});

const formSchema = z.object({
  entries: z.array(fertilizerEntry),
});

const FERTILIZER_COMMISSION = 2.5; // Hardcoded commission percentage

type Props = {
  onCalculate: (commission: number) => void;
};

export default function FertilizerCalculator({ onCalculate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entries: [{ acres: 0, fertilizerType: "", brand: "", requirementPerAcre: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "entries",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const totalCommission = values.entries.reduce((acc, entry) => {
      const entryCommission = entry.acres * entry.requirementPerAcre * (FERTILIZER_COMMISSION / 100);
      return acc + entryCommission;
    }, 0);
    onCalculate(totalCommission);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <Card className="p-4" key={field.id}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`entries.${index}.acres`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Acres</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`entries.${index}.fertilizerType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Fertilizer</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="urea">Urea</SelectItem>
                        <SelectItem value="dap">DAP</SelectItem>
                        <SelectItem value="potash">Potash</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`entries.${index}.brand`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ffc">FFC</SelectItem>
                        <SelectItem value="engro">Engro</SelectItem>
                        <SelectItem value="fatima">Fatima</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`entries.${index}.requirementPerAcre`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirement per Acre (Bags)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="w-full"
                >
                  Remove Entry
                </Button>
              )}
            </div>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ acres: 0, fertilizerType: "", brand: "", requirementPerAcre: 0 })}
          className="w-full"
        >
          Add Another Entry
        </Button>

        <Button type="submit" className="w-full">Calculate Commission</Button>
      </form>
    </Form>
  );
}
