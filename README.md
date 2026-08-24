# URL Shortener

A full-stack URL shortener: paste a long URL, get back a short one, and visiting the short URL redirects you to the original.

**Live demo:** [https://url-shortner-ten-blond.vercel.app/](https://url-shortner-ten-blond.vercel.app/)
[https://url-shortner-5cdl.onrender.com/](https://url-shortner-5cdl.onrender.com/)


## Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL (hosted on [Neon](https://neon.tech))
- **Frontend:** React (Vite)
- **Deployment:** Render (backend), Vercel (frontend)

## Project Structure

```
url-shortener/
├── backend/     # Express API
└── frontend/    # React (Vite) app
```

## API Endpoints

### `POST /shorten`
Creates a short URL for a given long URL.

**Request body:**
```json
{ "url": "https://example.com/some/very/long/path" }
```

**Response:** `201 Created`
```json
{ "shortUrl": "https://your-app.onrender.com/aB3xZ9" }
```

### `GET /:code`
Redirects to the original long URL associated with `code`.

**Response:** `302 Found` with a `Location` header pointing to the original URL, or `404` if the code doesn't exist.

## Database Schema

Single table, `urls`:

| Column       | Type      | Notes                          |
|--------------|-----------|---------------------------------|
| `id`         | SERIAL    | Primary key                    |
| `code`       | TEXT      | Unique short code               |
| `long_url`   | TEXT      | Original URL                    |
| `created_at` | TIMESTAMP | Defaults to time of insertion   |

## Deployment

- **Backend (Render):** Web Service, root directory `backend`, build command `npm install`, start command `node index.js`. `DATABASE_URL` is set as an environment variable in the Render dashboard.
- **Frontend (Vercel):** root directory `frontend`, framework auto-detected as Vite. `API_URL` in `src/App.jsx` is set to the deployed Render URL before deployment.