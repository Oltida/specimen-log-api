// all the /specimens routes live in this file
import { Router } from "express";
import supabase from "../supabase.js";
import { Constants } from "../types/database.types.js";
import type { Database } from "../types/database.types.js";
import { HttpError } from "../errors.js";

type Rarity = Database["public"]["Enums"]["specimen_rarity"];
type Category = Database["public"]["Enums"]["specimen_category"];

// the allowed values come straight from the generated types
const rarities = Constants.public.Enums.specimen_rarity;
const categories = Constants.public.Enums.specimen_category;

const router = Router();

// GET /specimens
// optional query params: ?rarity=rare  ?category=bird  ?sort=date_found
router.get("/", async (req, res) => {
  const { rarity, category, sort } = req.query;

  // start with a plain select of everything, then add filters if they sent them
  let query = supabase.from("specimens").select("*");

  if (rarity !== undefined) {
    if (typeof rarity !== "string" || !rarities.includes(rarity as Rarity)) {
      throw new HttpError(400, `rarity must be one of: ${rarities.join(", ")}`);
    }
    query = query.eq("rarity", rarity as Rarity);
  }

  if (category !== undefined) {
    if (typeof category !== "string" || !categories.includes(category as Category)) {
      throw new HttpError(400, `category must be one of: ${categories.join(", ")}`);
    }
    query = query.eq("category", category as Category);
  }

  // newest finds first if they ask for it, otherwise just go by id
  if (sort === "date_found") {
    query = query.order("date_found", { ascending: false });
  } else {
    query = query.order("id", { ascending: true });
  }

  const { data, error } = await query;

  // express 5 catches errors thrown in async routes and sends them to the error handler
  if (error) throw error;

  res.status(200).json(data);
});

export default router;