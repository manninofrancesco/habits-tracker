import { Habit } from "../models/Habit";
import { PostGreDBHabitsRepository as HabitsRepository } from "../repositories/PostgreDBHabitsRepository";

export class AppController {
    constructor() { }

    async getAll() {
        return await new HabitsRepository().getAll();
    }

    async getSingle(id: number) {
        return await new HabitsRepository().getSingle(id);
    }

    async insert(input: Habit) {
        return await new HabitsRepository().insert(input);
    }

    async delete(id: number) {
        return await new HabitsRepository().delete(id);
    }
}