# student-management-api

A REST API for a student management system: authenticate admins, CRUD student records, and log every mutation to an append-only audit trail.

## What's in it

- **Auth** — admin register / login with `jsonwebtoken` issuance. `middleware/auth.js` verifies the token on every mutating route.
- **Student CRUD** — `POST /api/v1/student`, `GET /api/v1/student`, `GET /api/v1/student/:id`, `PATCH`, `DELETE`. Full record lifecycle.
- **Audit logger** — every student mutation writes an entry via `logger-controller.js`. Separate route (`/api/v1/logger`) exposes the audit trail.
- **Validation** — Mongoose schema validation on the model layer using the `validator` package for email format and required-field constraints.
- **Error handling** — custom error classes (`errors/`) + centralized `error-handler.js`; `express-async-errors` so async controllers can throw without wrapping.
- **Seed data** — `MOCK_DATA.json` + `populate.js` to load sample students into MongoDB for manual testing.

## Stack

Node.js, Express 4, Mongoose 6, MongoDB, JWT, validator, http-status-codes, express-async-errors.

## Project shape

```
app.js
populate.js           loads MOCK_DATA.json into MongoDB
MOCK_DATA.json        seed records
controllers/          auth, student, logger
routes/               auth, student, logger
models/               student, logger
middleware/           auth, error-handler, not-found
errors/               custom error classes
db/                   Mongoose connection
```

## Run locally

```bash
npm install
# create .env with:
#   MONGO_URI=<mongodb-connection-string>
#   PASSWORD=<admin-seed-password>
#   SECRET_KEY=<jwt-secret>
npm start
# optional: populate DB with seed data
node populate.js
```
