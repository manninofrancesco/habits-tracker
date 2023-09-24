import { Collection, Db, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Habit } from "../models/Habit";


export class HabitsRepository {
    connectionUri: string;
    client: MongoClient;
    databaseName: string;
    collectionName: string;

    constructor() {
        this.connectionUri = "mongodb+srv://admin:3PCiAaBEqr0EaC4h@cluster0.tmbby.mongodb.net?&retryWrites=true&w=majority";
        this.databaseName = "habits_db";
        this.collectionName = "habits";
        this.client = new MongoClient(this.connectionUri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }

    async getAll(): Promise<string> {
        await this.client.connect();
        const db: Db = this.client.db(this.databaseName);
        const habits: Collection = db.collection(this.collectionName);

        return JSON.parse(JSON.stringify(await habits.find().toArray()));
    }

    async getSingle(id: string): Promise<string> {
        await this.client.connect();
        const db: Db = this.client.db(this.databaseName);
        const habits: Collection = db.collection(this.collectionName);

        let options = { "_id": new ObjectId(`${id}`) };

        return JSON.parse(JSON.stringify(await habits.find(options).toArray()));
    }

    async insert(input: Habit) {
        await this.client.connect();
        const db: Db = this.client.db(this.databaseName);
        const habits: Collection = db.collection(this.collectionName);

        return JSON.parse(JSON.stringify(await habits.insertOne(input)));
    }

    async update(input: Habit) {
        await this.client.connect();
        const db: Db = this.client.db(this.databaseName);
        const habits: Collection = db.collection(this.collectionName);

        return JSON.parse(JSON.stringify(await habits.insertOne(input)));
    }

    async delete(id: string) {
        return;
        // let query: string = `DELETE FROM "TestTable";`;
        // await this.ExecuteQuery(query);
    }
}