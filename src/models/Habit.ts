export class Habit {
    id: number;
    name: string;
    done: number;
    todo: number;

    constructor(id: number, name: string, done: number, todo: number) {
        this.id = id;
        this.name = name;
        this.done = done;
        this.todo = todo;
    }
}