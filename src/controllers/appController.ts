import { Habit } from "../models/Habit";
import { HabitsRepository } from "../repositories/HabitsRepository";

export class AppController {
    constructor() { }

    async getAll() {
        return await new HabitsRepository().getAll();
    }

    async getSingle(id: string) {
        return await new HabitsRepository().getSingle(id);
    }

    async insert(input: Habit) {
        return await new HabitsRepository().insert(input);
    }

    async delete() {
        return await new HabitsRepository().delete("1");
    }
}