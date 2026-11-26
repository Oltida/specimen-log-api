
import express from "express";
import specimensRouter from "./routes/specimens.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

// logger goes first so it sees every request
app.use(logger);
// Allows Express to read JSON request bodies
app.use(express.json());

// Our first test endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Specimen Log API is running"
  });
app.use("/specimens", specimensRouter);
});
// if nothing above matched, it's a 404 (json, not html)
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// error handler goes last, after all the routes
app.use(errorHandler);

// Start server locally, but not on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
}

export default app;
