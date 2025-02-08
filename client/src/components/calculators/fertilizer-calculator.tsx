
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  acres: z.number().min(0),
  fertilizerType: z.string(),
  fertilizerBrand: z.string(),
  requirementPerAcre: z.number().min(0),
});

const FERTILIZER_COMMISSION = 50; // Hardcoded commission in PKR

type Props = {
  onCalculate: (commission: number) => void;
};

export default function FertilizerCalculator({ onCalculate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acres: 0,
      fertilizerType: "",
      fertilizerBrand: "",
      requirementPerAcre: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const commission = values.acres * values.requirementPerAcre * FERTILIZER_COMMISSION;
    onCalculate(commission);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="acres"
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
          name="fertilizerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Fertilizer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fertilizer type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="urea">Urea</SelectItem>
                  <SelectItem value="dap">DAP</SelectItem>
                  <SelectItem value="sop">SOP</SelectItem>
                  <SelectItem value="nitrophos">Nitrophos</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fertilizerBrand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand of Fertilizer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="requirementPerAcre"
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

        <Button type="submit" className="w-full">Calculate Commission</Button>
      </form>
    </Form>
  );
}
