import { Habit } from "../models/Habit";
import { IHabitsRepository } from "./IHabitsRepository";
import pg from "pg";

export class PostGreDBHabitsRepository implements IHabitsRepository {
    config: {
        host: string;
        user: string;
        password: string;
        database: string;
        port: number;
        ssl: boolean;
    };

    constructor() {
        this.config = {
            host: 'localhost',
            // Do not hard code your username and password.
            // Consider using Node environment variables.
            user: 'postgres',
            password: 'standard',
            database: 'HabitsTracker',
            port: 5432,
            ssl: false
        };
    }

    async getAll(): Promise<Habit[]> {
        const query = "SELECT * FROM \"Habits\"";

        const result = await this.executeQuery(query);

        return result;
    }

    async getSingle(id: number): Promise<Habit> {
        const query = "SELECT * FROM \"Habits\" WHERE id = $1";
        const params = [id.toString()]

        const result = await this.executeQuery(query, params);

        return result[0];
    }

    async insert(habit: Habit): Promise<void> {
        const query = "INSERT INTO \"Habits\" (name, todo) VALUES ($1, $2)";
        const params = [habit.name, habit.todo.toString()];

        await this.executeQuery(query, params);
    }

    async addDoneSession(id: number): Promise<void> {
        const query = "UPDATE \"Habits\" SET done = done + 1 WHERE id = $1";
        const params = [id.toString()];

        await this.executeVoidQuery(query, params);
    }

    async delete(id: number): Promise<void> {
        const query = "DELETE FROM \"Habits\" WHERE id = $1";
        const params = [id.toString()]

        await this.executeQuery(query, params);
    }

    async executeQuery(query: string, params?: string[]): Promise<Habit[]> {
        const client = new pg.Client(this.config)
        await client.connect()

        const queryObj = {
            text: query,
            values: params
        };

        const response = await client.query<Habit>(queryObj);
        await client.end()

        return response.rows as Habit[];
    }

    async executeVoidQuery(query: string, params?: string[]): Promise<void> {
        const client = new pg.Client(this.config)

        await client.connect()

        const queryObj = {
            text: query,
            values: params
        };

        await client.query(queryObj);

        await client.end()
    }
}