# Frontend - Next.js with Tailwind CSS

This is the frontend application built with [Next.js](https://nextjs.org) and styled with [Tailwind CSS](https://tailwindcss.com).

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS 4+
- **Language**: TypeScript
- **Package Manager**: pnpm

## Getting Started

### Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Development

Run with Docker Compose from the root directory:

```bash
docker-compose up frontend
```

Or run all services:

```bash
docker-compose up
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL
  - Local: `http://localhost:3001`
  - Docker: `http://backend:3001`

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind
├── public/                # Static assets
├── Dockerfile             # Docker configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
