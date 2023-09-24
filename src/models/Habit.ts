export class Habit {
    Id: Number;
    Name: String;
    Done_Sessions: Number;
    Todo_Sessions: Number;

    constructor(id: Number, name: String, done_Sessions: Number, todo_Sessions: Number) {
        this.Id = id;
        this.Name = name;
        this.Done_Sessions = done_Sessions;
        this.Todo_Sessions = todo_Sessions;
    }
}