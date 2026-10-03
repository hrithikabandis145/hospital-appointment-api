# Hospital Appointment API

A TypeScript hospital appointment API using Prisma ORM and PostgreSQL.

## Features

* Patient CRUD operations
* Doctor CRUD operations
* Appointment management
* Patient and doctor relationships
* Prisma seed data
* TypeScript type checking

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file with the PostgreSQL connection string:

```env
DATABASE_URL="your-database-url"
```

Generate the Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

## Testing

Check TypeScript:

```bash
npx tsc --noEmit
```

Run the CRUD test script:

```bash
npx tsx src/test.ts
```
