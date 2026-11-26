// the one place every error ends up. always sends json, never an html page
import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors.js";

// express only treats this as an error handler if it has all 4 params, even if next goes unused
export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  // errors I threw on purpose, like 400 and 404
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  // express.json() throws this when the body isn't valid json
  if (typeof err === "object" && err !== null && "type" in err && err.type === "entity.parse.failed") {
    res.status(400).json({ error: "Request body is not valid JSON" });
    return;
  }

  // anything else is a supabase problem or a bug, so log it and send a plain 500
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
}