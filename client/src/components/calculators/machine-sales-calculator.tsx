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
  ordersBooked: z.number().min(0),
  avgCostPerAcre: z.number().min(0),
  avgCommissionPercentage: z.number().min(0).max(100),
});

type Props = {
  onCalculate: (commission: number) => void;
};

export default function MachineSalesCalculator({ onCalculate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ordersBooked: 0,
      avgCostPerAcre: 0,
      avgCommissionPercentage: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const commission = 
      values.ordersBooked * 
      values.avgCostPerAcre * 
      (values.avgCommissionPercentage / 100);
    onCalculate(commission);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="ordersBooked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Machine Orders Booked (Acres)</FormLabel>
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
          name="avgCostPerAcre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Cost per Acre (PKR)</FormLabel>
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
          name="avgCommissionPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Commission Percentage (%)</FormLabel>
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
