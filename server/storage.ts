import type { InsertScenario, Scenario } from "@shared/schema";

export interface IStorage {
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  getScenarios(): Promise<Scenario[]>;
}

export class MemStorage implements IStorage {
  private scenarios: Map<number, Scenario>;
  private currentId: number;

  constructor() {
    this.scenarios = new Map();
    this.currentId = 1;
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const id = this.currentId++;
    const scenario: Scenario = { ...insertScenario, id };
    this.scenarios.set(id, scenario);
    return scenario;
  }

  async getScenarios(): Promise<Scenario[]> {
    return Array.from(this.scenarios.values());
  }
}

export const storage = new MemStorage();
