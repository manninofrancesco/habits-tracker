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

app.use(express.static(__dirname + '/src'));

let server = https.createServer(parameters, app)

app.get('/', async (req: Request, res: Response) => {
    try {
        res.sendFile("./views/home.html", { root: "src" })
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.get('/add', async (req: Request, res: Response) => {
    try {
        res.sendFile("./views/add.html", { root: "src" })
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.get('/detail', async (req: Request, res: Response) => {
    try {
        res.sendFile("./views/detail.html", { root: "src" })
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

        if (req.query.id) {
            let id: number = parseInt(req.query.id.toString());
            if (id) {
                let result: Habit = await new AppController().getSingle(id);
                res.send(result);
            } else {
                throw new Error("Empty id");
            }
        } else {
            throw new Error("Not valid ID");
        }

    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.post('/insert', async (req: Request, res: Response) => {
    try {
        let exampleModel: Habit = new Habit(0, req.body.name, 0, req.body.todo);

        await new AppController().insert(exampleModel);

        res.redirect("/get");
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.get('/addDoneSession', async (req: Request, res: Response) => {
    try {
        if (req.query.id) {

            let id: number = parseInt(req.query.id.toString());

            const appController = new AppController();

            await appController.addDoneSession(id);
            res.redirect(`/detail?${req.body.id}`);
        }
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

app.get('/delete', async (req: Request, res: Response) => {
    try {
        if (req.query.id) {
            let id: number = parseInt(req.query.id.toString());
            await new AppController().delete(id);
            res.redirect("/");
        } else {
            res.sendFile("./views/delete.html", { root: "src" })
        }
    }
    catch (error) {
        res.send(`Error: ${error}`);
    }
})

server.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});