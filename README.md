# Terminofeu

> Terminology management solution for the Swiss Fire Safety Regulations by the Swiss Cantonal Fire Insurance Association (VKF)

Frontend website:
https://terminofeu.ch

Frontend repository:
https://github.com/mornir/terminofeu-web-astro

## Tech Stack

- Sanity Studio v5
- Portable Text
- Hosted on Sanity.io
- PNPM
- Prettier

## Local Development

### Add env variables

- Add .env file based on .env.example

### Install dependencies

```bash
pnpm install
```

### Run the studio locally

> Warning: The Studio does not use a local database. When running locally, it connects to the live production dataset on Sanity. Changes made to content are immediately applied to production.

```bash
pnpm run dev
```

Studio runs at:
http://localhost:3333

### Deploy changes

```bash
pnpm run deploy
```
