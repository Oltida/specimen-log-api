import express from "express";
import specimensRouter from "./routes/specimens.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Specimen Log API is running"
  });
});

app.use("/specimens", specimensRouter);

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
}

export default app;