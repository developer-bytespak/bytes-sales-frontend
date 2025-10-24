# Bytes Sales - Setup Guide

## Quick Start (Demo Mode)

The application works out of the box in demo mode. No configuration needed!

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the application:**
   - Go to `http://localhost:3001`
   - Click **"Try Demo Mode"** button
   - Explore the dashboard and leads page

## Google OAuth Setup (Optional)

If you want to use Google OAuth for authentication:

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (if using port 3000)

### Step 2: Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your Google OAuth credentials:
   ```env
   NEXTAUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. Restart the development server:
   ```bash
   npm run dev
   ```

## Features Available

### ✅ Currently Working
- **Demo Mode Login** - No setup required
- **Dashboard** - Metrics and activity feed
- **Leads Page** - Data table with search and filtering
- **Responsive Design** - Works on all devices
- **Navigation** - Sidebar with all pages

### 🚧 Coming Soon
- CSV Upload functionality
- Call control panel
- Deal confirmation
- Email templates
- Settings page

## Troubleshooting

### Google OAuth 404 Error
- **Cause**: Google OAuth credentials not configured
- **Solution**: Use "Try Demo Mode" button or set up Google OAuth credentials

### Port Already in Use
- **Cause**: Port 3000 is already in use
- **Solution**: The app will automatically use port 3001

### Module Not Found Errors
- **Cause**: Dependencies not installed
- **Solution**: Run `npm install` in the project directory

## Development

### Project Structure
```
bytes-sales/
├── app/                    # Next.js pages
│   ├── auth/              # Login page
│   ├── dashboard/         # Dashboard pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── layout/            # Layout components
├── lib/                  # Utilities and auth
└── types/                # TypeScript types
```

### Tech Stack
- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **NextAuth** for authentication
- **Responsive design** for all devices

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Ensure you're in the correct directory (`bytes-sales`)
3. Try using Demo Mode if Google OAuth isn't working
4. Restart the development server
