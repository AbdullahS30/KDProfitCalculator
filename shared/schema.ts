import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Constants for commissions
export const COMMISSIONS = {
  FERTILIZER: 77, // PKR per bag
  DIRECT_INPUTS: {
    SEEDS: 13.70,
    PESTICIDE: 12.50,
    BIO_CHEMICALS: 14.20
  }, // Percentages
  PRODUCT: {
    WANDA: 2.86,
    SILAGE: 3.00,
    CHAUKAR: 2.50,
    SOLAR_PANELS: 4.00,
    TRACTOR: 3.50
  }, // Percentages
  CROP: {
    WHEAT: 0.30,
    RICE: 0.35,
    MAIZE: 0.32,
    COTTON: 0.40
  }, // Percentages
  MACHINE: {
    HARVESTER: 3.0,
    THRESHER: 2.5,
    TROLLEY: 2.0,
    RICE_PLANTER: 2.8
  } // Percentages
} as const;

// Entry type interfaces
export interface FertilizerEntry {
  id: string;
  type: string;
  brand: string;
  bagsPerAcre: number;
  landArea: number;
}

export interface DirectInputEntry {
  id: string;
  type: 'Seeds' | 'Pesticide' | 'Bio Chemicals';
  salesPerAcre: number;
  landArea: number;
}

export interface ProductEntry {
  id: string;
  type: 'Wanda' | 'Silage' | 'Chaukar' | 'Solar Panels' | 'Tractor';
  quantity: number;
  salesValue: number;
}

export interface CropEntry {
  id: string;
  type: 'Wheat' | 'Rice' | 'Maize' | 'Cotton';
  yieldPerAcre: number;
  landArea: number;
  pricePerMaund: number;
}

export interface MachineEntry {
  id: string;
  type: 'Harvester' | 'Thresher' | 'Trolley' | 'Rice Planter';
  landArea: number;
}

export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  fertilizerEntries: text("fertilizer_entries").notNull(),
  directInputEntries: text("direct_input_entries").notNull(),
  productEntries: text("product_entries").notNull(),
  cropEntries: text("crop_entries").notNull(),
  machineEntries: text("machine_entries").notNull(),
});

export const insertScenarioSchema = createInsertSchema(scenarios);
export type InsertScenario = z.infer<typeof insertScenarioSchema>;
export type Scenario = typeof scenarios.$inferSelect;

export const calculatorInputSchema = z.object({
  fertilizerEntries: z.array(z.object({
    id: z.string(),
    type: z.string(),
    brand: z.string(),
    bagsPerAcre: z.number().min(0),
    landArea: z.number().min(0),
  })),
  directInputEntries: z.array(z.object({
    id: z.string(),
    type: z.enum(['Seeds', 'Pesticide', 'Bio Chemicals']),
    salesPerAcre: z.number().min(0),
    landArea: z.number().min(0),
  })),
  productEntries: z.array(z.object({
    id: z.string(),
    type: z.enum(['Wanda', 'Silage', 'Chaukar', 'Solar Panels', 'Tractor']),
    quantity: z.number().min(0),
    salesValue: z.number().min(0),
  })),
  cropEntries: z.array(z.object({
    id: z.string(),
    type: z.enum(['Wheat', 'Rice', 'Maize', 'Cotton']),
    yieldPerAcre: z.number().min(0),
    landArea: z.number().min(0),
    pricePerMaund: z.number().min(0),
  })),
  machineEntries: z.array(z.object({
    id: z.string(),
    type: z.enum(['Harvester', 'Thresher', 'Trolley', 'Rice Planter']),
    landArea: z.number().min(0),
  })),
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;

export const FERTILIZER_TYPES = ["Urea", "DAP", "SOP", "NP"] as const;
export const FERTILIZER_BRANDS = ["Engro", "FFC", "Fatima"] as const;
export const DIRECT_INPUT_TYPES = ["Seeds", "Pesticide", "Bio Chemicals"] as const;
export const PRODUCT_TYPES = ["Wanda", "Silage", "Chaukar", "Solar Panels", "Tractor"] as const;
export const CROP_TYPES = ["Wheat", "Rice", "Maize", "Cotton"] as const;
export const MACHINE_TYPES = ["Harvester", "Thresher", "Trolley", "Rice Planter"] as const;