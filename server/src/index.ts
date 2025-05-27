import express from "express";
import "dotenv/config";
import { fileURLToPath } from "url";
import Routes from "./routes/index.js"
// * Queues
import "./jobs/index.js";
import path from "path";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

console.log("Routes is:", typeof Routes); // should log [Function: router] or similar
// * Routes
app.use(Routes);

// app.get("/", async (req: Request, res: Response) => {
//   res.json({msg : "Email send successfully"});
// });




app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
