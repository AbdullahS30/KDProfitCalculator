import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  landArea: decimal("land_area").notNull(),
  fertilizerBagsPerAcre: decimal("fertilizer_bags_per_acre").notNull(),
  fertilizerCommissionPerUnit: decimal("fertilizer_commission_per_unit").notNull(),
  directInputsSalesPerAcre: decimal("direct_inputs_sales_per_acre").notNull(),
  directInputsCommissionPercent: decimal("direct_inputs_commission_percent").notNull(),
  productQuantity: integer("product_quantity").notNull(),
  productSalesValue: decimal("product_sales_value").notNull(),
  productCommissionPercent: decimal("product_commission_percent").notNull(),
  cropYieldPerAcre: decimal("crop_yield_per_acre").notNull(),
  cropPricePerMaund: decimal("crop_price_per_maund").notNull(),
  cropCommissionPercent: decimal("crop_commission_percent").notNull(),
  machineCostPerAcre: decimal("machine_cost_per_acre").notNull(),
  machineCommissionPercent: decimal("machine_commission_percent").notNull()
});

export const insertScenarioSchema = createInsertSchema(scenarios);
export type InsertScenario = z.infer<typeof insertScenarioSchema>;
export type Scenario = typeof scenarios.$inferSelect;

export const calculatorInputSchema = z.object({
  landArea: z.number().min(0),
  fertilizerBagsPerAcre: z.number().min(0),
  fertilizerCommissionPerUnit: z.number().min(0),
  directInputsSalesPerAcre: z.number().min(0),
  directInputsCommissionPercent: z.number().min(0).max(100),
  productQuantity: z.number().min(0),
  productSalesValue: z.number().min(0),
  productCommissionPercent: z.number().min(0).max(100),
  cropYieldPerAcre: z.number().min(0),
  cropPricePerMaund: z.number().min(0),
  cropCommissionPercent: z.number().min(0).max(100),
  machineCostPerAcre: z.number().min(0),
  machineCommissionPercent: z.number().min(0).max(100)
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;
