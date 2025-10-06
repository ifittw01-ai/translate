# Setup Instructions

## Quick Start

Follow these steps to get your Nuxt translation app running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**To get your OpenRouter API Key:**
1. Visit https://openrouter.ai/keys
2. Sign up or log in
3. Create a new API key
4. Copy the key and paste it in your `.env` file

### 3. Run the Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

## What Changed from index.html?

Your original single-file HTML application has been converted to a full Nuxt 3 application with the following improvements:

### Security Improvements
- ✅ **API Key is now server-side**: The OpenRouter API key is stored in environment variables and never exposed to the client
- ✅ **Server-side API calls**: All API requests are made through a Nuxt server route (`/api/translate`)

### Project Structure
```
translate/
├── app.vue                    # Root component
├── pages/
│   └── index.vue             # Main page (replaces index.html)
├── server/
│   └── api/
│       └── translate.post.ts # Server API route for translations
├── nuxt.config.ts            # Nuxt configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
└── .env                      # Environment variables (create this!)
```

### Key Files

**`pages/index.vue`**: The main page component with the same UI as your original HTML file

**`server/api/translate.post.ts`**: Server-side API route that:
- Receives translation requests from the client
- Calls OpenRouter API with the server-side API key
- Returns translated text to the client

**`nuxt.config.ts`**: Configures Nuxt with:
- Tailwind CSS module
- Runtime config for API key
- App metadata

## Old index.html File

Your original `index.html` file is still in the directory. You can:
- Keep it as a reference
- Delete it since the functionality is now in the Nuxt app
- Rename it to `index.html.backup` for safekeeping

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Build the app:
```bash
npm run build
```

2. Set the environment variable in your hosting platform:
   - Variable name: `OPENROUTER_API_KEY`
   - Value: Your OpenRouter API key

## Troubleshooting

**"OpenRouter API key is not configured"**
- Make sure you created the `.env` file in the root directory
- Check that the variable name is exactly `OPENROUTER_API_KEY`
- Restart the dev server after creating/modifying `.env`

**Translation errors**
- Verify your OpenRouter API key is valid
- Check if you've reached the daily free tier limit
- Look at the browser console and terminal for error messages

