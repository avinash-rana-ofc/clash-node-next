import express from "express";
import { Request, Response } from "express";
import "dotenv/config";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import Routes from "./routes/index.js"
// * Queues
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

console.log("Routes is:", typeof Routes); // should log [Function: router] or similar

// * Routes
app.use(Routes);

/*app.get("/", async (req: Request, res: Response) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
      name: "Avinash Rana",
    });
  //   await sendEmail("satebic297@deusa7.com", "Test Email", html);
  await emailQueue.add(emailQueueName, { to: "satebic297@deusa7.com", subject: "Testing", body:html });
  res.json({msg : "Email send successfully"});
});
*/



app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
