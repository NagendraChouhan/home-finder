# home-finder

A full-stack web application for finding and listing rooms online. Tenants can browse, filter and review rooms; owners can list their property with photos and receive enquiries by email.

Built with a React (CRA) frontend and an Express + MongoDB backend, with room photos stored on AWS S3 and transactional email sent through SendGrid.

---

## Features

**For people looking for a room**
- Browse all listed rooms with photos, price and amenities
- Filter by room type and maximum price, sort by price (low → high / high → low)
- View full room details, image gallery and owner information
- Rate a room on four axes — service, quality, price and location — and leave a review (one review per email per room)
- Send an enquiry directly to the room owner, or a general message through the contact form

**For owners**
- List a room with type, bedrooms/bathrooms, area, rent, security deposit and number of identical units
- Mark amenities: wifi, ventilation, parking, bed / table / almirah counts, PG or not
- Set who the room is open to: boys, girls or families
- Upload up to 31 photos per room, delete or replace them later
- Manage listings from a dashboard and edit details after publishing

**Accounts**
- Signup with email OTP verification (OTP mailed via SendGrid)
- JWT-based login stored in cookies, with protected routes on the frontend
- Forgot-password flow using the same OTP mechanism
- Passwords hashed with bcrypt
- Multi-address profile — a user can save several addresses and pick one when listing a room
- Separate admin account model with a view of all rooms and users

---

## Tech stack

| Layer | What's used |
|---|---|
| Frontend | React 17, React Router v6, plain CSS, `react-cookie` / `js-cookie`, `react-password-checklist`, `react-email-validator` |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas via Mongoose 6 |
| Auth | JSON Web Tokens, bcryptjs |
| File storage | AWS S3 (`@aws-sdk/client-s3`) with pre-signed URLs; `multer` for uploads. Firebase Storage is also wired up as an alternative path |
| Email | SendGrid (`@sendgrid/mail`) |
| Deploy | Vercel (`vercel.json`), with a Heroku build script also present |

---

## Project structure

```
place-finding/
├── src/                        # Express backend
│   ├── app.js                  # Entry point — mounts all routes, serves the React build
│   ├── database/connection.js  # MongoDB Atlas connection
│   ├── aws/s3.js               # upload / pre-signed URL / delete helpers
│   ├── firebase/firebase.js    # Firebase Storage init
│   ├── functionFile/
│   │   └── functions.js        # OTP generation + SendGrid mailers
│   ├── models/                 # Mongoose schemas
│   │   ├── userModel.js            # user + saved addresses + tokens
│   │   ├── adminModel.js           # admin account
│   │   ├── verifyuser.js           # pending signups holding an OTP
│   │   ├── createRoomModel.js      # room listing
│   │   ├── reviewRoomModel.js      # room ratings and reviews
│   │   ├── ownerCounselingModel.js # enquiry sent to an owner
│   │   └── contactCounselingModel.js
│   └── routes/                 # one file per feature area
│
├── frontEnd/                   # Create React App frontend
│   ├── public/
│   ├── build/                  # committed production build (served by Express)
│   └── src/
│       ├── routes/RouterCom.js # all page routes + auth guard
│       ├── component/          # Navbar, Footer, Gallery, StarRating, FilterDiv, ...
│       │   └── pages/          # Home, Rooms, BlockDetails, Login, Signup,
│       │                       # ForgetPassword, Profile, Dashboard, Createroom, Contact
│       ├── function/function.js
│       └── css/
│
├── package.json                # backend deps + scripts
└── vercel.json
```

---

## Getting started

### Prerequisites
- Node.js 14+ and npm
- A MongoDB Atlas cluster
- An AWS S3 bucket with an IAM access key/secret
- A SendGrid account with a verified sender and an API key

### 1. Install

```bash
git clone https://github.com/NagendraChouhan/place-finding.git
cd place-finding

npm install                 # backend
cd frontEnd && npm install  # frontend
cd ..
```

### 2. Environment variables

Create a `.env` file in the project root (it is gitignored):

```env
PORT=8000
NODE_ENV=development

# MongoDB Atlas — see note below about the connection string
PASSWORD=your_mongodb_password
DATABASENAME=your_database_name

# Auth
JWT_TOKEN=any_long_random_secret_string

# AWS S3
AWS_BUCKET_NAME=your_bucket_name
AWS_BUCKET_REGION=ap-south-1
AWS_ACCESS_KEY=your_access_key_id
AWS_SECRET_KEY=your_secret_access_key

# SendGrid
SENDEMAIL_API_KEY=your_sendgrid_api_key
```

> The Atlas cluster host and username are currently hardcoded in `src/database/connection.js`, and only the password and database name come from `.env`. If you are pointing this at your own cluster, edit that file to use your own connection string.

### 3. Run in development

Two terminals:

```bash
# terminal 1 — API on http://localhost:8000
npm run dev        # nodemon, or: npm start

# terminal 2 — React dev server on http://localhost:3000
cd frontEnd
npm start
```

The frontend `package.json` sets `"proxy": "http://localhost:8000/"`, so API calls from the dev server are forwarded to Express automatically.

### 4. Production build

```bash
cd frontEnd && npm run build && cd ..
NODE_ENV=production npm start
```

With `NODE_ENV=production`, Express serves `frontEnd/build` and falls back to `index.html` for any unmatched route, so the whole app runs on a single port.

---

## API reference

All backend routes are prefixed with `b` to keep them clear of the React client routes. Protected endpoints expect the JWT in a `token` request header.

### Auth & account

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/bsignup` | Create an account (stored as pending until OTP is verified) |
| `POST` | `/bverifyEmail` | Generate an OTP and mail it to the user |
| `POST` | `/bverifyotp` | Verify the OTP and activate the account |
| `PUT`  | `/bupdatePassword` | Reset password after OTP verification |
| `POST` | `/blogin` | Log in, returns a JWT |
| `DELETE` | `/blogout` | Invalidate the stored token |
| `GET`  | `/btokenvarify` | Check whether the current token is still valid |
| `PUT`  | `/bprofileupdate` | Update profile details and saved addresses |

### Rooms

| Method | Endpoint | Purpose |
|---|---|---|
| `GET`  | `/brooms` | All rooms, each with a pre-signed URL for its cover image |
| `POST` | `/brooms/filter` | Filter by `roomtype` and max `price`, sorted by `sortBy` (`1` asc / `-1` desc) |
| `POST` | `/bcreateRoom` | Create a listing |
| `POST` | `/bcreateRoom/image` | Upload up to 31 images (multipart field `imageFile`) |
| `DELETE` | `/bcreateRoom/deleteImage` | Delete an image from S3 and from the listing |
| `PUT`  | `/bcreateRoom/update` | Update part of a listing |
| `PUT`  | `/bcreateRoom/updateAllData` | Update a full listing |

### Data lookups

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/bgetData` | Current user's profile / saved addresses (token required) |
| `GET` | `/bgetData/room` | Rooms owned by the current user (token required) |
| `GET` | `/bgetData/roomDetails?roomId=&imageKey=` | Full details of one room, with owner name and email |
| `GET` | `/bgetData/addressData?userId=&addressIdRadio=` | A specific saved address for a listing |
| `GET` | `/bgetData/admin` | All rooms and all users (admin) |

### Reviews & enquiries

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/broomReview` | Submit a rating and review for a room |
| `GET`  | `/broomReview/breviewData` | Fetch reviews for a room |
| `POST` | `/bcounseling/owner` | Send an enquiry to a room owner (emailed via SendGrid) |
| `POST` | `/bcounseling/contact` | Send a general contact-form message |

`/bmongo` is a one-off maintenance endpoint used for a schema migration and is not part of the normal app flow.

---

## Frontend routes

| Path | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/rooms` | Room listing with filters | Public |
| `/blockDetails` | Single room details | Public |
| `/contact` | Contact form | Public |
| `/login` | Login | Public |
| `/signup` | Signup with OTP verification | Public |
| `/forgetPassword` | Password reset | Public |
| `/profile` | Profile and addresses | Requires login |
| `/dashboard` | Owner dashboard | Requires login |
| `/createroom` | Create / edit a listing | Requires login |

Protected routes are wrapped in a `PrivateComponent` guard that checks for the `token` cookie and redirects to `/login` if it is missing.

---

## Deployment

`vercel.json` builds `src/app.js` with `@vercel/node` and routes all traffic to it. The root `package.json` also carries a `heroku-postbuild` script that installs and builds the frontend, so the project can be deployed to Heroku as-is.

Set every variable from the `.env` section above in the host's environment settings before deploying.

---

## Known limitations

- The advanced filters (PG, wifi, parking, ventilation, furniture counts, boys/girls/family) are present in the UI and in the request body, but the corresponding Mongo query conditions in `src/routes/rooms.js` are commented out — only room type and price are applied.
- Both AWS S3 and Firebase Storage are wired in; S3 is the active path, Firebase is leftover from an earlier approach.
- The Firebase web config in `src/firebase/firebase.js` is committed to the repo. It is a public client config rather than a secret, but if the Firebase project is still live it is worth locking down the storage rules or moving the config to environment variables.
- `frontEnd/build/` is committed to the repository, so it can go stale relative to the source.
- `src/routes/mongo.js` runs a destructive `update({}, {$unset: ...})` across the rooms collection. It was a one-time migration helper — remove it or protect it before going to production.

---

## Author

[Nagendra Chouhan](https://github.com/NagendraChouhan)
