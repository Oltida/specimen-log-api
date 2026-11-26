
import express from "express";
import specimensRouter from "./routes/specimens.js";
import logger from "./middleware/logger.js";

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

// Start server locally, but not on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
}

export default app;
