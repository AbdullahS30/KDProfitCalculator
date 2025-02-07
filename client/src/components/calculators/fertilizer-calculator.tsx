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

const formSchema = z.object({
  marketPenetration: z.number().min(0),
  requirementPerAcre: z.number().min(0),
  avgCommissionPerUnit: z.number().min(0),
});

type Props = {
  onCalculate: (commission: number) => void;
};

export default function FertilizerCalculator({ onCalculate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marketPenetration: 0,
      requirementPerAcre: 0,
      avgCommissionPerUnit: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const totalRequirement = values.marketPenetration * values.requirementPerAcre;
    const commission = totalRequirement * values.avgCommissionPerUnit;
    onCalculate(commission);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="marketPenetration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>KDL Market Penetration (Acres)</FormLabel>
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

        <FormField
          control={form.control}
          name="avgCommissionPerUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Commission per Unit (PKR)</FormLabel>
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
