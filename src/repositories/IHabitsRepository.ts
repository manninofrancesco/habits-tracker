import { Habit } from "../models/Habit";

export interface IHabitsRepository {
    getAll(): Promise<Habit[]>;
    getSingle(id: number): Promise<Habit>;
    insert(habit: Habit): Promise<void>;
    addDoneSession(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    executeQuery(query: string, params: string[]): Promise<Habit[]>;
    executeVoidQuery(query: string): Promise<void>;
}