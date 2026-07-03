# EasyShop — Simple, Low-Cost E-Commerce Site

A real, working full-stack store built to match your **EasyShop AI** Stitch design
(dark navy + indigo-violet glassmorphism). This is not a mockup — it's a functioning
MERN app: customer sign up/sign in, a separate admin panel where you upload a product
image and set its price, live search/filter, and a cart → checkout flow.

```
easyshop/
├── backend/   Node + Express + MongoDB API (auth, products, image upload)
└── frontend/  React (Vite) storefront + admin panel
```

## How it matches what you asked for

| You asked for | Where it is |
|---|---|
| Upload a product image + set price | Admin Panel → "Add a new product" form → `POST /api/products/upload-image` then `POST /api/products` |
| Real-time sign up / sign in | `POST /api/auth/register`, `POST /api/auth/login` — JWT-based, instant |
| Separate admin login/panel | `/admin/login` (different route, different check — a customer account is rejected even with the right password) and `/admin` dashboard |
| Quick setup | See **Local setup** below — 5 commands |
| Easy day-to-day editing (add/update price) | Admin Panel product list has inline Edit / Delete / Hide buttons |
| Database options | Built on **MongoDB** (best fit for a MERN stack and for a catalog of products with flexible fields). See **"Different databases"** note below if you specifically need MySQL/PostgreSQL instead |
| Run it locally | Yes — see **Local setup** |
| Host on GitHub / Render / Vercel | Yes — see **Deployment** |

---

## Local setup (from zero)

You need **Node.js 18+** and **MongoDB** installed (or a free MongoDB Atlas account —
easier, no install needed: https://www.mongodb.com/cloud/atlas/register).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and set:
- `MONGO_URI` — your local MongoDB URL, or your Atlas connection string
- `JWT_SECRET` — any long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the login you'll use for the admin panel

```bash
npm run dev
```

The first time it starts, it **automatically creates your admin account** from the
`.env` values — no manual database setup needed. It also prints a reminder in the
terminal. Optionally load sample products:

```bash
npm run seed
```

Backend now runs at `http://localhost:5000`.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and automatically talks to the backend
(no config needed in dev — see `vite.config.js`).

- Storefront: `http://localhost:5173/`
- Customer sign up: `http://localhost:5173/signup`
- Admin panel: `http://localhost:5173/admin/login` (use the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env`)

That's the whole quick setup.

---

## Day-to-day use (adding/updating products)

1. Go to `/admin/login`, sign in.
2. On `/admin`, fill the form: title, category, price, stock, then either **upload an
   image file** (drag from your computer, e.g. an image you saved from another site)
   **or** paste an image URL directly.
3. Click **Add product** — it appears on the storefront immediately.
4. To change a price later, click **Edit** on that product in the list, update the
   price field, **Save changes**.
5. **Hide** takes a product off the storefront without deleting it (useful if you're
   temporarily out of stock). **Delete** removes it permanently.

---

## A note on "three different databases"

MongoDB is the right default here — it's the natural fit for the MERN stack you
already use, it's free to start (MongoDB Atlas), and product catalogs (flexible
fields, varying attributes per product) fit its document model well.

If what you actually meant was **"I want to be able to switch between different
database providers"** rather than three simultaneously, the three realistic options
for a project like this are:

- **MongoDB Atlas** (what this project uses) — free tier, easiest to set up, no server to manage.
- **PostgreSQL** (e.g. via Render's free Postgres, or Supabase) — better if your data is very tabular/relational (strict orders, inventory, invoicing).
- **MySQL** (e.g. via PlanetScale or Railway) — similar tradeoffs to Postgres, more common in shared/cheap hosting.

Swapping from MongoDB to Postgres/MySQL means rewriting the models and queries with
an ORM like Prisma or Sequelize instead of Mongoose — the routes and React frontend
stay almost the same. Let me know if you want that version built out instead, or in
addition.

---

## Deployment (GitHub + Render + Vercel — all free-tier friendly)

Yes, this is fully deployable that way. Suggested setup:

### 1. Push to GitHub
```bash
cd easyshop
git init
git add .
git commit -m "Initial commit - EasyShop e-commerce site"
gh repo create easyshop --public --source=. --push
# or create a repo on github.com and:
# git remote add origin https://github.com/<you>/easyshop.git
# git push -u origin main
```

### 2. Backend → Render
1. On [render.com](https://render.com), **New → Web Service**, connect your GitHub repo.
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables (same as your `.env`): `MONGO_URI`, `JWT_SECRET`,
   `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`, `CLIENT_URL` (set this to your
   Vercel frontend URL once you have it).
6. Deploy. Note the live URL, e.g. `https://easyshop-api.onrender.com`.

   **Image uploads on Render's free tier:** the free tier's disk is not persistent
   across restarts/deploys. For local use and demos this is fine as-is. For a real
   production store, swap the upload target from local disk to a service like
   Cloudinary (free tier) — ask me and I'll wire that in.

### 3. Frontend → Vercel (or Netlify)
1. On [vercel.com](https://vercel.com), **New Project**, import the same repo.
2. Root directory: `frontend`
3. Build command: `npm run build`, output directory: `dist`
4. Environment variable: `VITE_API_URL` = your Render backend URL from step 2.
5. Deploy. Vercel gives you a live URL, e.g. `https://easyshop.vercel.app`.
6. Go back to Render and set `CLIENT_URL` to this Vercel URL (for CORS), redeploy.

### 4. Running locally alongside a live deployment
Totally fine — local `.env` files point at your own local Mongo, deployed env vars
point at Atlas. They don't conflict.

---

## What's intentionally left as a next step

- **Payments**: the cart/checkout flow is wired up and ready, but there's no payment
  gateway yet (Razorpay is the natural pick for India — low fees, UPI support). Say
  the word and I'll integrate it.
- **Order history / order tracking**: currently checkout is a demo action. An `Order`
  model + `/api/orders` routes are a quick addition once you're ready.
- **Persistent image storage in production**: see the Render note above (Cloudinary).

If your time is limited right now, this is safe to hand off later — the code is
plain, commented Express/React with no exotic dependencies, so picking it back up
(with me or with any other developer) will be straightforward.
