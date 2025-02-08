import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Constants for commissions
export const COMMISSIONS = {
  FERTILIZER: 77, // PKR per bag
  DIRECT_INPUTS: 13.70, // Percentage
  PRODUCT: 2.86, // Percentage
  CROP: {
    WHEAT: 0.30,
    RICE: 0.35,
    COTTON: 0.40
  }, // Percentages
  MACHINE: {
    TRACTOR: 2.0,
    THRESHER: 2.5,
    HARVESTER: 3.0
  } // Percentages
} as const;

export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  landArea: decimal("land_area").notNull(),
  fertilizerType: text("fertilizer_type").notNull(),
  fertilizerBrand: text("fertilizer_brand").notNull(),
  fertilizerBagsPerAcre: decimal("fertilizer_bags_per_acre").notNull(),
  directInputsSalesPerAcre: decimal("direct_inputs_sales_per_acre").notNull(),
  productQuantity: integer("product_quantity").notNull(),
  productSalesValue: decimal("product_sales_value").notNull(),
  cropType: text("crop_type").notNull(),
  cropYieldPerAcre: decimal("crop_yield_per_acre").notNull(),
  machineType: text("machine_type").notNull(),
});

export const insertScenarioSchema = createInsertSchema(scenarios);
export type InsertScenario = z.infer<typeof insertScenarioSchema>;
export type Scenario = typeof scenarios.$inferSelect;

export const calculatorInputSchema = z.object({
  landArea: z.number().min(0),
  fertilizerType: z.string(),
  fertilizerBrand: z.string(),
  fertilizerBagsPerAcre: z.number().min(0),
  directInputsSalesPerAcre: z.number().min(0),
  productQuantity: z.number().min(0),
  productSalesValue: z.number().min(0),
  cropType: z.string(),
  cropYieldPerAcre: z.number().min(0),
  machineType: z.string(),
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;

export const CROP_TYPES = ["Wheat", "Rice", "Cotton"] as const;
export const MACHINE_TYPES = ["Tractor", "Thresher", "Harvester"] as const;
export const FERTILIZER_TYPES = ["Urea", "DAP", "SOP", "NP"] as const;
export const FERTILIZER_BRANDS = ["Engro", "FFC", "Fatima"] as const;