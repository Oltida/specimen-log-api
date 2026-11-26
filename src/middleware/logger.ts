// logs every request: method, url, status code, and how long it took
import type { Request, Response, NextFunction } from "express";

export default function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  // the status code isn't known yet, so wait until the response is finished
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
  });

  next();
}