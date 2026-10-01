# Vjeera HR Client

React 18, Vite, React Router and Bootstrap 5 frontend for the Vjeera HR Express/MongoDB application.

## Routes

Public pages: `/`, `/about` (also `/about-us`), `/services`, `/courses`, `/career`, `/corporate`, `/clients` (also `/our-client`) and `/contact`.

Admin pages: `/admin/login`, `/admin/dashboard` (also `/admin`), `/admin/records`, `/admin/jobs` and `/admin/courses`. Admin record views are available at `/admin/contacts`, `/admin/enrollments`, `/admin/applications` and `/admin/corporate-enquiries`.

## Run locally

Start the backend in one terminal:

```powershell
cd Server
npm install
npm run dev
```

Set `VITE_API_URL=http://localhost:5000` in the local `Client/.env` file if the API uses a non-default address. Start Vite in a second terminal:

```powershell
cd Client
npm install
npm run dev
```

The frontend reads its API base URL from `VITE_API_URL` and otherwise uses `http://localhost:5000`. Configure MongoDB and admin credentials only in the backend's local `Server/.env`; never put server secrets in frontend environment variables.

## API-backed workflows

- Course list and enrollment: `GET /api/courses`, `POST /api/enrollments`
- Job list and applications: `GET /api/jobs`, `POST /api/applications`
- Contact: `POST /api/contacts`
- Corporate enquiry: `POST /api/corporate-enquiries`
- Admin authentication and management use the existing JWT-protected API routes.

## Production build

```powershell
npm run build
npm run preview
```
