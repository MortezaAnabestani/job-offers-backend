
# Job Offers Backend Assignment

## 📌 Project Overview

This backend application integrates with two external job provider APIs, transforms their data into a unified structure, stores them in a PostgreSQL database, and exposes an API for retrieving and filtering the job offers.

It demonstrates skills in:
- Data transformation
- API integration
- Database design and deduplication
- RESTful API development
- Scheduling (cron jobs)
- Error handling and logging
- Unit and integration testing

---

## 🚀 Technologies Used

- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- Axios
- @nestjs/schedule
- Jest + Supertest

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MortezaAnabestani/job-offers-backend.git
cd job-offers-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a file named `.env` in the project root and define your database connection:

```
DATABASE_URL="postgresql://user:password@localhost:5432/job_offers_db"
```

> Replace `user`, `password`, and `job_offers_db` with your actual PostgreSQL credentials.

### 4. Initialize the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the application

```bash
npm run start:dev
```

By default, the app runs at: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Documentation

### `GET /api/job-offers`

Retrieve transformed job offers with support for filtering and pagination.

#### Query Parameters:
| Parameter   | Type     | Description                              |
|-------------|----------|------------------------------------------|
| `title`     | string   | Filter by job title (partial match)      |
| `location`  | string   | Filter by location (partial match)       |
| `salaryMin` | number   | Filter by minimum salary                 |
| `salaryMax` | number   | Filter by maximum salary                 |
| `page`      | number   | Page number (default: 1)                 |
| `limit`     | number   | Items per page (default: 10)             |

#### Sample Request:

```bash
curl "http://localhost:3000/api/job-offers?title=engineer&location=Berlin&page=1&limit=5"
```

#### Sample Response:

```json
{
  "data": [
    {
      "externalId": "P1-123",
      "title": "Software Engineer",
      "company": "Tech Corp",
      "location": "Berlin",
      "salaryMin": 60000,
      "salaryMax": 85000,
      "currency": "EUR",
      "postedAt": "2025-07-12T00:00:00.000Z",
      "source": "provider1"
    }
  ],
  "meta": {
    "total": 134,
    "page": 1,
    "limit": 5
  }
}
```

---

## ⏱️ Cron Job (Scheduled Data Fetching)

- Data is fetched from both providers periodically via a scheduled job using `@nestjs/schedule`.
- The scheduling frequency can be configured in code (or later via `.env`).
- Deduplication is enforced during storage using a composite key (`externalId + source`).

---

## 🧠 Data Transformation

Each provider has a different data structure:

- **Provider 1**: JSON array with `jobId`, `details.salaryRange`, `company.name`, etc.
- **Provider 2**: Nested object `jobsList` keyed by job ID, with `position`, `compensation.min/max`, etc.

Each item is transformed into the following unified structure:

```ts
interface UnifiedJobOffer {
  externalId: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  postedAt: Date;
  source: 'provider1' | 'provider2';
}
```

---

## 🧪 Running Tests

### Unit & Integration Tests

```bash
npm run test
```

Tests include:
- Transformers (data conversion)
- API endpoint (`GET /api/job-offers`)
- E2E: Fetch → Transform → Store pipeline

---

## 📁 Project Structure

```
src/
├── providers/           # API integrations
├── transformers/        # Data format converters
├── jobs/                # Job persistence logic
├── scheduler/           # Cron job runner
├── job-offers/          # Public-facing API endpoint
```

---

## 🚫 .gitignore

```
node_modules
.env
coverage
dist
```

---

## 📬 Submission

- Push this project to a **public GitHub repository**
- Submit the repository link

---

## 🙌 Author
Morteza Anabestani
[Frontend Developer (React & NextJs),
MERN-stack Developer]

Although I had no prior experience with NestJS or PostgreSQL before this challenge, I took it as an opportunity to learn quickly and deliver a production-ready result.

Built with care and attention to detail.
