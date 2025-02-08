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
  acres: z.number().min(0),
  avgGrossSalesValuePerAcre: z.number().min(0),
});

const DIRECT_INPUTS_COMMISSION_PERCENTAGE = 2.5; // Hardcoded commission percentage

type Props = {
  onCalculate: (commission: number) => void;
};

export default function DirectInputsCalculator({ onCalculate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acres: 0,
      avgGrossSalesValuePerAcre: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const commission = values.acres * values.avgGrossSalesValuePerAcre * (DIRECT_INPUTS_COMMISSION_PERCENTAGE / 100);
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
          name="avgGrossSalesValuePerAcre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Gross Sales Value Per Acre (PKR)</FormLabel>
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