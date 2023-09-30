export class Habit {
    Id: Number;
    Name: String;
    Done: Number;
    Todo: Number;

    constructor(id: Number, name: String, done: Number, todo: Number) {
        this.Id = id;
        this.Name = name;
        this.Done = done;
        this.Todo = todo;
    }
}