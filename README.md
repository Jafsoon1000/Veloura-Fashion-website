# Veloura Fashion Website (Full Stack)

Full-stack fashion website built with:
- Frontend: HTML, CSS, JavaScript, React (Vite)
- Backend: Node.js, Express, JavaScript
- Database: MongoDB (Mongoose)
- Auth: Register/Login with JWT
- Phone verification: OTP flow (Twilio-ready, with dev fallback)

## Pages Included (10+)
1. Home
2. Shop
3. Product Details
4. Categories
5. Lookbook
6. About
7. Contact
8. Blog
9. Cart
10. Checkout
11. Login
12. Register
13. Verify Phone
14. Profile
15. 404 Not Found

## Project Structure
```text
frontend/
backend/
```

## Setup

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Set these in `backend/.env`:
- `MONGO_URI`
- `JWT_SECRET`
- Optional Twilio fields for real SMS:
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_PHONE_NUMBER`

If Twilio is not configured, OTP is returned in API response as `debugOtp` for testing.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.
Backend runs on `http://localhost:5000`.
