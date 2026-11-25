
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Allows Express to read JSON request bodies
app.use(express.json());

// Our first test endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Specimen Log API is running"
  });
});

// Start server locally, but not on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
}

export default app;
