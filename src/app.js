import express from "express";
import morgan from "morgan";
import cors from "cors"


const app = express();

// Import routes
import restaurantRouter from "./routes/restaurantRoutes.js"
// Middlewares
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", restaurantRouter)


export default app;