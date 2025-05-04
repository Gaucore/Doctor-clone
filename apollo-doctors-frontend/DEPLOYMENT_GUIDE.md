# Deployment Guide for Apollo Doctors Frontend

This guide provides step-by-step instructions for deploying your Next.js Apollo Doctors Frontend application to various platforms.

## Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn
- Git

## Option 1: Deploy to Vercel (Recommended for Next.js)

Vercel is the easiest platform to deploy Next.js applications as it's built by the same team.

### Steps:

1. Create an account on [Vercel](https://vercel.com) if you don't have one
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Login to Vercel:
   ```
   vercel login
   ```
4. Navigate to your project directory and run:
   ```
   vercel
   ```
5. Follow the prompts to deploy your application
6. Add the environment variable:
   - `NEXT_PUBLIC_API_URL=https://doctor-clone-1-o2jl.onrender.com/api`

### Alternative: Deploy via GitHub

1. Push your code to GitHub
2. Import your repository in the Vercel dashboard
3. Configure the environment variables
4. Deploy

## Option 2: Deploy to Render

Render is a unified cloud platform that can host static sites, web services, and databases.

### Steps:

1. Create an account on [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the build settings:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
5. Add the environment variable:
   - `NEXT_PUBLIC_API_URL=https://doctor-clone-1-o2jl.onrender.com/api`
6. Click Deploy

## Option 3: Deploy to Netlify

Netlify is a popular platform for deploying static sites and serverless functions.

### Steps:

1. Create an account on [Netlify](https://netlify.com)
2. Install the Netlify CLI:
   ```
   npm install -g netlify-cli
   ```
3. Login to Netlify:
   ```
   netlify login
   ```
4. Build your application:
   ```
   npm run export
   ```
5. Deploy to Netlify:
   ```
   netlify deploy --prod
   ```
6. Add the environment variable:
   - `NEXT_PUBLIC_API_URL=https://doctor-clone-1-o2jl.onrender.com/api`

## Option 4: Deploy to a VPS (Digital Ocean, AWS, etc.)

If you want more control, you can deploy to your own server.

### Steps:

1. SSH into your server
2. Clone your repository:
   ```
   git clone <your-repo-url>
   ```
3. Navigate to your project directory:
   ```
   cd apollo-doctors-frontend
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Build the application:
   ```
   npm run build
   ```
6. Start the server:
   ```
   npm run start
   ```
7. Set up a process manager like PM2:
   ```
   npm install -g pm2
   pm2 start npm --name "apollo-frontend" -- run start
   ```
8. Set up Nginx as a reverse proxy (optional but recommended)

## Troubleshooting

### Common Issues:

1. **Build fails with useSearchParams error**:
   - Wrap components using useSearchParams in a Suspense boundary

2. **API calls not working**:
   - Check that the NEXT_PUBLIC_API_URL environment variable is set correctly
   - Verify CORS is enabled on your backend

3. **Images not loading**:
   - Make sure the image domains are properly configured in next.config.js

4. **Styling issues**:
   - Ensure Tailwind CSS is properly built and included

## Maintaining Your Deployment

- Set up CI/CD for automatic deployments
- Monitor your application's performance
- Regularly update dependencies
- Back up your data and configuration
