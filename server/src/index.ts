import express, {Application, Request, Response} from "express";
import "dotenv/config";
import path from "path";
import ejs from "ejs";
import {fileURLToPath} from "url";
import { sendEmail } from "./config/mail.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app : Application = express();
const PORT = process.env.PORT || 7000;


app.use(express.json());
app.use(express.urlencoded({extended : false}));

// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", async (req : Request, res: Response) : Promise<Response> => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {name : "Avinash Rana",});
    await sendEmail("satebic297@deusa7.com", "Test Email", html);
    return res.json({msg: "Email sent successfully"});
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
