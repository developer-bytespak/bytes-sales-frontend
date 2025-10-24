# Bytes Sales - Sales Calling Platform

A modern sales calling platform built with Next.js 16, React 19, and TypeScript.

## Features

- 🔐 Google OAuth authentication
- 📊 Dashboard with metrics and activity feed
- 👥 Lead management with CSV upload
- 📞 Automated calling with 3CX integration
- 📧 Email follow-ups via Gmail API
- 💰 Deal tracking and conversion metrics

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env.local` file

## Project Structure

```
bytes-sales/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Development

The project uses:
- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **NextAuth** for authentication
- **Prisma** for database (when implemented)

## Deployment

The application is designed to be deployed on Vercel with the following services:
- Frontend: Vercel
- Backend: Render/Railway/DigitalOcean
- Database: Supabase/PostgreSQL
- Redis: Upstash (for job queues)

## License

MIT