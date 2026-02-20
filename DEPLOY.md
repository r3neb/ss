# Deploying your Reactive Profile to Vercel

This guide will help you put your new reactive profile page online using Vercel.

## Prerequisites
- A [GitHub](https://github.com/) account.
- A [Vercel](https://vercel.com/) account (linked to GitHub).

## Step 1: Initialize Git and Push to GitHub
Open your terminal in the `reactive` folder and run these commands:

```bash
git init
git add .
git commit -m "Initial commit: Reactive Profile"
```

1. Create a new repository on [GitHub](https://github.com/new).
2. Follow the instructions on GitHub to "push an existing repository from the command line":
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Connect to Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New"** > **"Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect **Vite**.
5. Click **"Deploy"**.

## Your site is live!
Every time you push new code to GitHub, Vercel will automatically update your website.
