// turns the :id from the url into a number, or throws a 400 if it isn't a real id
import { HttpError } from "./errors.js";

export default function parseId(value: string): number {
  const id = Number(value);

  // has to be a whole number, 1 or higher
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new HttpError(400, "id must be a positive whole number");
  }

  return id;
}