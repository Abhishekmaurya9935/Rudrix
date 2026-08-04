import express from "express";
import cors from "cors";
import { env } from "./config/env";
import apiRoutes from "./routes";
import { errorHandler } from "./middleware/error-handler";
import { connectDatabase } from "./db/connection";

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (_req, res) => {
  res.send("Rudra API is running");
});

app.use(errorHandler);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
}

startServer();
