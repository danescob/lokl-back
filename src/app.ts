import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connection } from "./modules/db.module";
import ruta from "./routes";

dotenv.config()

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true}));

const router = Router();

app.use('/', ruta);

app.listen(process.env.APP_PORT, () => console.log(`Server running on port ${process.env.APP_PORT}`));
