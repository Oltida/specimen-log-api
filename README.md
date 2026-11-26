# Specimen Log API

A REST API for managing specimen records, including plants, insects, birds, and fungi.

Built with Express, TypeScript, and Supabase. Deployed on Vercel.

**Live API:** https://specimen-log-api.vercel.app

## Technologies
- Express
- TypeScript
- Supabase
- Vercel

## Run Locally

```bash
npm install
```

Create a `.env` file with:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

Start the server:

```bash
npm run dev
```

## API Endpoints

Base URL: `https://specimen-log-api.vercel.app`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/specimens` | Get all specimens |
| GET | `/specimens/:id` | Get one specimen |
| POST | `/specimens` | Create a specimen |
| PUT | `/specimens/:id` | Update a specimen |
| DELETE | `/specimens/:id` | Delete a specimen |

### Query Parameters

- `category` filters by category
- `rarity` filters by rarity
- `sort=date_found` sorts by date found

### POST / PUT Request Body

```json
{
  "species_name": "Blue jay",
  "category": "bird",
  "rarity": "uncommon",
  "habitat": "Woodlands",
  "date_found": "2026-11-26",
  "notes": "Spotted near the park"
}
```

Required: `species_name`, `category`.

### Example Response

```json
{
  "id": 5,
  "species_name": "Blue jay",
  "category": "bird",
  "rarity": "uncommon"
}
```

### Status Codes

- `200` Successful request
- `201` Created
- `204` Deleted
- `400` Invalid request
- `404` Not found
- `500` Server error

## Database

Specimen records are stored in Supabase. Secret credentials are kept in environment variables and are not committed to GitHub.