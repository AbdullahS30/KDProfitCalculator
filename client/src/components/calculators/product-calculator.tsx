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
  quantity: z.number().min(0),
  avgGrossSalesValue: z.number().min(0),
  avgCommissionPercentage: z.number().min(0).max(100),
});

type Props = {
  onCalculate: (commission: number) => void;
};

export default function ProductCalculator({ onCalculate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      avgGrossSalesValue: 0,
      avgCommissionPercentage: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const commission = 
      values.quantity * 
      values.avgGrossSalesValue * 
      (values.avgCommissionPercentage / 100);
    onCalculate(commission);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
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
          name="avgGrossSalesValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Gross Sales Value (PKR)</FormLabel>
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
