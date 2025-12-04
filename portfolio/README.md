# Dental Portfolio - 82 Clinic Websites

A portfolio showcasing 82 professional dental clinic websites built for Delhi-based dental practices.

## Live Demo

Once deployed, the portfolio will be available at:
- **Portfolio**: `https://YOUR_USERNAME.github.io/dental-portfolio/`
- **Individual Site**: `https://YOUR_USERNAME.github.io/dental-portfolio/site/[clinic-folder]/`

## Features

- 82 unique dental clinic websites
- Responsive design with modern UI
- Multiple color schemes (trust-blue, calm-teal, fresh-green, professional-slate, warm-coral)
- Integrated features per clinic (appointment booking, AI chatbot, voice assistant, etc.)
- Static export for GitHub Pages hosting

## Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. Create a new repository named `dental-portfolio` on GitHub
2. Push the entire `dentist` folder to the repository:
   ```bash
   cd leads/dentist
   git init
   git add .
   git commit -m "Initial commit: 82 dental clinic websites"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dental-portfolio.git
   git push -u origin main
   ```
3. Go to repository Settings > Pages
4. Under "Build and deployment", select "GitHub Actions"
5. The workflow will automatically build and deploy

### Option 2: Manual Deployment

1. Build the static site:
   ```bash
   cd portfolio
   npm run deploy-build
   ```
2. The `out` folder contains the static site ready for deployment

## Site URLs

After deployment, a list of all sites with URLs is available at:
- JSON: `/site-urls.json`
- CSV: `/site-urls.csv`
- TXT: `/site-urls.txt`

## Project Structure

```
dentist/
├── portfolio/           # Next.js portfolio app
│   ├── app/            # App router pages
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   ├── data/          # Portfolio data
│   └── out/           # Built static site
├── websites/           # 82 clinic website data
│   └── [clinic-name]/
│       └── data/
│           └── clinic.json
└── sub agents/        # Website generation scripts
```

## Development

```bash
cd portfolio
npm install
npm run dev
```

## Build

```bash
npm run deploy-build
```

This generates the static site in the `out` folder with all 82 clinic websites.
