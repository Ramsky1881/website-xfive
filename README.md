# Neraka Portal - Gaming Community Platform

A Nuxt 3 gaming community website with a secure Admin Dashboard, built for Netlify deployment.

## Tech Stack
- **Framework:** Nuxt 3 (Vue 3 + TypeScript)
- **Styling:** SCSS (Custom Cyberpunk Theme, No Tailwind)
- **Database:** Prisma ORM (Neon Postgres for Prod, SQLite for Dev)
- **Rate Limiting:** Upstash Redis (Prod) / In-Memory (Dev)
- **Validation:** Zod
- **Auth:** JWT (HttpOnly Cookie) + Bcrypt
- **Icons:** Lucide Vue Next

## 🚀 Step-by-Step Tutorial: From Zero to Deploy

### 1. Prerequisites
- Node.js 20+
- Netlify Account
- Neon (Postgres) Account
- Upstash (Redis) Account

### 2. Local Development Setup

1. **Clone & Install**
   ```bash
   git clone <repo_url>
   cd neraka-portal
   npm install
   ```

2. **Setup Database (SQLite)**
   This project uses SQLite for local development to avoid needing a live DB connection.
   ```bash
   # Copies prisma/schema.sqlite.prisma to prisma/schema.prisma
   npm run db:setup:dev

   # Run migration
   npx prisma migrate dev --name init

   # Seed Admin User (Default: admin@example.com / changeme)
   npm run db:seed
   ```
   > **Note:** If `ADMIN_EMAIL` and `ADMIN_PASSWORD` are not set in `.env`, the seed script creates a default admin and warns you.

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the site at `http://localhost:3000`.
   - Admin Login: `http://localhost:3000/admin/login`
   - Default Creds: `admin@example.com` / `changeme`

### 3. Production Deployment (Netlify + Neon + Upstash)

1. **Database Setup (Neon)**
   - Create a project in [Neon](https://neon.tech).
   - Get the Connection String (Pooled is recommended for serverless).
   - Ensure it starts with `postgres://` or `postgresql://` and includes `?sslmode=require`.

2. **Rate Limit Setup (Upstash)**
   - Create a Redis database in [Upstash](https://upstash.com).
   - Get the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the REST API section.

3. **Prepare for Build**
   The build script needs the Production Schema.

   **Important:** In Netlify, you typically don't run `npm run db:setup:prod` manually. Instead, you can rely on the fact that you will likely commit the schema you want, OR better yet, ensure the build command handles it.

   However, since we swap schemas:
   - **Option A (Recommended):** The `package.json` build script is standard `nuxt build`. You should add a prebuild step or customize the build command in Netlify to: `npm run db:setup:prod && npx prisma generate && nuxt build`.

   Let's set the **Build Command** in Netlify to:
   ```bash
   npm run db:setup:prod && npx prisma generate && npm run build
   ```

4. **Environment Variables (Netlify)**
   Go to **Site Settings > Environment Variables** and add:

   | Key | Value |
   | --- | --- |
   | `DATABASE_URL` | Your Neon connection string |
   | `JWT_SECRET` | A long random string (e.g. generated via `openssl rand -hex 32`) |
   | `UPSTASH_REDIS_REST_URL` | From Upstash |
   | `UPSTASH_REDIS_REST_TOKEN` | From Upstash |
   | `ADMIN_EMAIL` | Your desired admin email (for seeding if needed, or manual DB entry) |
   | `ADMIN_PASSWORD` | Your desired admin password |
   | `NUXT_app_cdnURL` | (Optional) |

   > **Note on Seeding in Prod:** You usually don't want to auto-seed in prod on every build. It's better to connect to the DB locally with `DATABASE_URL` set to prod and run `npm run db:seed` once, or use the SQL editor in Neon to insert the admin user manually using a bcrypt hash.
   >
   > To generate a hash locally: `node -e "console.log(require('bcrypt').hashSync('YOUR_PASSWORD', 10))"`

5. **Deploy**
   - Push your code to GitHub.
   - Connect the repo to Netlify.
   - Verify the Build Command matches step 3.
   - Deploy Site.

### 4. Common Pitfalls & Fixes

- **"Prisma Client not initialized":** Ensure `npx prisma generate` runs *after* `db:setup:prod` and *before* the build completes.
- **"500 Error on API":** Check Netlify Function logs. Often due to missing env vars or DB connection timeouts.
- **Images not loading:** This demo uses placeholders. In a real app, you must manually paste Cloudinary/S3 URLs into the admin forms.
- **Style issues:** Ensure `assets/scss/main.scss` is correctly loaded in `nuxt.config.ts`.

## 🛡️ Security Features implemented
- **HttpOnly Cookies:** JWTs are never exposed to client JS.
- **Rate Limiting:** Protects Login (5 req/10m) and CRUD (60 req/m).
- **Zod Validation:** All inputs are strictly validated.
- **Audit Logs:** Critical actions are logged to DB.
- **Security Headers:** Strict CSP, NoSniff, Frame-Options.

## 📂 Project Structure
```
├── assets/scss/      # Global Styles (Cyberpunk Theme)
├── components/       # Vue Components (Navbar, UI)
├── layouts/          # Layouts (Default, Admin)
├── middleware/       # Nuxt Middleware (Auth)
├── pages/            # Frontend Routes
│   ├── index.vue     # Home
│   ├── admin/        # Admin Dashboard & CRUD
│   └── ...
├── prisma/           # DB Schemas & Seeds
├── server/           # Backend Logic (Netlify Functions)
│   ├── api/          # API Endpoints
│   │   ├── admin/    # Protected Admin Routes
│   │   └── ...       # Public Routes
│   ├── middleware/   # Server Middleware (Auth Check)
│   └── utils/        # Helpers (Prisma, Redis, Auth)
└── scripts/          # DB Setup Scripts
```
