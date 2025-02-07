import { pgTable, text, serial, numeric, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  landArea: numeric("land_area").notNull(),
  fertilizer: jsonb("fertilizer").$type<{
    marketPenetration: number;
    requirementPerAcre: number;
    avgCommissionPerUnit: number;
  }>(),
  directInputs: jsonb("direct_inputs").$type<{
    marketPenetration: number;
    avgSalesValuePerAcre: number;
    avgCommissionPercentage: number;
  }>(),
  products: jsonb("products").$type<{
    quantity: number;
    avgGrossSalesValue: number;
    avgCommissionPercentage: number;
  }>(),
  cropSales: jsonb("crop_sales").$type<{
    paidawarLandBooked: number;
    avgYieldPerAcre: number;
    lastApproxPricePerMaund: number;
    avgCommissionPercentage: number;
  }>(),
  machineSales: jsonb("machine_sales").$type<{
    ordersBooked: number;
    avgCostPerAcre: number;
    avgCommissionPercentage: number;
  }>()
});

export const scenarioSchema = createInsertSchema(scenarios);
export type InsertScenario = z.infer<typeof scenarioSchema>;
export type Scenario = typeof scenarios.$inferSelect;

export type CalculatorResults = {
  fertilizer: number;
  directInputs: number;
  products: number;
  cropSales: number;
  machineSales: number;
  total: number;
};
