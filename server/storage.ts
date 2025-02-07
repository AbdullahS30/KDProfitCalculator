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
