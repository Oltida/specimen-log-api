import { HttpError } from "./errors.js";
import { Constants } from "./types/database.types.js";
import type { Database } from "./types/database.types.js";

type Specimen = Database["public"]["Tables"]["specimens"]["Insert"];
type Rarity = Database["public"]["Enums"]["specimen_rarity"];
type Category = Database["public"]["Enums"]["specimen_category"];

const rarities = Constants.public.Enums.specimen_rarity;
const categories = Constants.public.Enums.specimen_category;

function isRarity(value: unknown): value is Rarity {
  return typeof value === "string" && (rarities as readonly string[]).includes(value);
}

function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (categories as readonly string[]).includes(value);
}

function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(value + "T00:00:00Z");
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function optionalText(value: unknown, name: string, max: number, problems: string[]): string | null {
  if (value === undefined || value === null) return null;

  if (typeof value !== "string") {
    problems.push(`${name} must be text`);
    return null;
  }

  const text = value.trim();
  if (text.length > max) {
    problems.push(`${name} must be ${max} characters or less`);
    return null;
  }

  return text === "" ? null : text;
}

export default function validateSpecimen(body: unknown): Specimen {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new HttpError(400, "Request body must be a JSON object");
  }

  const data = body as Record<string, unknown>;
  const problems: string[] = [];

  const speciesName = typeof data.species_name === "string" ? data.species_name.trim() : "";
  if (speciesName === "") {
    problems.push("species_name is required and must be text");
  } else if (speciesName.length > 100) {
    problems.push("species_name must be 100 characters or less");
  }

  if (!isCategory(data.category)) {
    problems.push(`category is required and must be one of: ${categories.join(", ")}`);
  }

  let rarity: Rarity = "common";
  if (data.rarity !== undefined) {
    if (isRarity(data.rarity)) {
      rarity = data.rarity;
    } else {
      problems.push(`rarity must be one of: ${rarities.join(", ")}`);
    }
  }

  let dateFound: string | null = null;
  if (data.date_found !== undefined && data.date_found !== null) {
    if (typeof data.date_found === "string" && isRealDate(data.date_found)) {
      dateFound = data.date_found;
    } else {
      problems.push("date_found must be a real date like 2026-09-14");
    }
  }

  const habitat = optionalText(data.habitat, "habitat", 100, problems);
  const notes = optionalText(data.notes, "notes", 500, problems);

  if (problems.length > 0) {
    throw new HttpError(400, problems.join("; "));
  }

  return {
    species_name: speciesName,
    category: data.category as Category, 
    rarity,
    habitat,
    date_found: dateFound,
    notes,
  };
}