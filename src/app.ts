import express, { Express, Request, Response } from 'express';
import { AppController } from './controllers/appController';
import { Habit } from './models/Habit';
import fs from 'fs'
import https from 'https';

const app: Express = express();
app.use(express.json())
const port = 3000;
const parameters = {
    key: fs.readFileSync('./tutorial.key', 'utf-8'),
    cert: fs.readFileSync('./tutorial.crt', 'utf-8')
}

let server = https.createServer(parameters, app)

app.get('/', async (req: Request, res: Response) => {
    try {
        res.sendFile("./views/list.html", { root: "src" })
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.get('/getAll', async (req: Request, res: Response) => {
    try {
        res.send(await new AppController().getAll())
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.get('/getSingle', async (req: Request, res: Response) => {
    try {
        let id = req.query.id;
        if (id) {
            res.send(await new AppController().getSingle(id.toString()))
        } else {
            throw new Error("Empty id");
        }
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.get('/insert', async (req: Request, res: Response) => {
    try {
        let exampleModel: Habit = new Habit(1, "Test Habit " + Math.floor(Math.random() * 9999999), 0, 61);

        await new AppController().insert(exampleModel);
        res.redirect("/get");
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.get('/addDoneSession', async (req: Request, res: Response) => {
    try {
        let exampleModel: Habit = new Habit(1, "Test Habit " + Math.floor(Math.random() * 9999999), 0, 61);

        await new AppController().insert(exampleModel);
        res.redirect("/get");
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.get('/delete', async (req: Request, res: Response) => {
    try {
        await new AppController().delete();
        res.redirect("/get");
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

server.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});