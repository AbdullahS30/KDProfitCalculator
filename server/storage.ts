import { type Scenario, type InsertScenario } from "@shared/schema";

export interface IStorage {
  getAllScenarios(): Promise<Scenario[]>;
  getScenario(id: number): Promise<Scenario | undefined>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  updateScenario(id: number, scenario: InsertScenario): Promise<Scenario | undefined>;
  deleteScenario(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private scenarios: Map<number, Scenario>;
  private currentId: number;

  constructor() {
    this.scenarios = new Map();
    this.currentId = 1;
    
    // Add dummy scenarios
    const dummyScenarios: InsertScenario[] = [
      {
        name: "Small Farm Plan",
        landArea: "10",
        fertilizer: { marketPenetration: 60, requirementPerAcre: 2, avgCommissionPerUnit: 100 },
        directInputs: { marketPenetration: 40, avgSalesValuePerAcre: 5000, avgCommissionPercentage: 2 },
        products: { quantity: 50, avgGrossSalesValue: 2000, avgCommissionPercentage: 5 },
        cropSales: { paidawarLandBooked: 8, avgYieldPerAcre: 40, lastApproxPricePerMaund: 2000, avgCommissionPercentage: 1 },
        machineSales: { ordersBooked: 2, avgCostPerAcre: 15000, avgCommissionPercentage: 3 }
      },
      {
        name: "Medium Farm Plan",
        landArea: "50",
        fertilizer: { marketPenetration: 80, requirementPerAcre: 3, avgCommissionPerUnit: 150 },
        directInputs: { marketPenetration: 60, avgSalesValuePerAcre: 6000, avgCommissionPercentage: 2.5 },
        products: { quantity: 200, avgGrossSalesValue: 2500, avgCommissionPercentage: 6 },
        cropSales: { paidawarLandBooked: 40, avgYieldPerAcre: 45, lastApproxPricePerMaund: 2200, avgCommissionPercentage: 1.5 },
        machineSales: { ordersBooked: 5, avgCostPerAcre: 18000, avgCommissionPercentage: 3.5 }
      },
      {
        name: "Large Farm Plan",
        landArea: "100",
        fertilizer: { marketPenetration: 90, requirementPerAcre: 4, avgCommissionPerUnit: 200 },
        directInputs: { marketPenetration: 75, avgSalesValuePerAcre: 7000, avgCommissionPercentage: 3 },
        products: { quantity: 500, avgGrossSalesValue: 3000, avgCommissionPercentage: 7 },
        cropSales: { paidawarLandBooked: 85, avgYieldPerAcre: 50, lastApproxPricePerMaund: 2500, avgCommissionPercentage: 2 },
        machineSales: { ordersBooked: 10, avgCostPerAcre: 20000, avgCommissionPercentage: 4 }
      }
    ];

    // Initialize with dummy data
    dummyScenarios.forEach(scenario => {
      const id = this.currentId++;
      this.scenarios.set(id, { ...scenario, id });
    });
  }

  async getAllScenarios(): Promise<Scenario[]> {
    return Array.from(this.scenarios.values());
  }

  async getScenario(id: number): Promise<Scenario | undefined> {
    return this.scenarios.get(id);
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const id = this.currentId++;
    const scenario: Scenario = { ...insertScenario, id };
    this.scenarios.set(id, scenario);
    return scenario;
  }

  async updateScenario(id: number, insertScenario: InsertScenario): Promise<Scenario | undefined> {
    if (!this.scenarios.has(id)) {
      return undefined;
    }

    const scenario: Scenario = { ...insertScenario, id };
    this.scenarios.set(id, scenario);
    return scenario;
  }

  async deleteScenario(id: number): Promise<boolean> {
    return this.scenarios.delete(id);
  }
}

export const storage = new MemStorage();
