-- a few test rows so GET has something to return
insert into public.specimens (species_name, category, habitat, rarity, date_found, notes) values
  ('Monarch butterfly', 'insect', 'meadow', 'common', '2026-09-14', 'on milkweed near the creek'),
  ('Fly agaric', 'fungi', 'birch forest', 'uncommon', '2026-10-02', 'red cap with white spots'),
  ('Northern cardinal', 'bird', 'backyard', 'common', '2026-11-01', 'at the feeder'),
  ('Ghost pipe', 'plant', 'shaded forest floor', 'rare', '2026-08-20', 'all white, no chlorophyll');