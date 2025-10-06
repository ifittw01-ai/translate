# Supabase Setup Guide for Translation App

This guide will walk you through setting up Supabase to save and load translation history.

## Prerequisites

- A Supabase account (sign up at https://supabase.com if you don't have one)
- Your OpenRouter API key already configured

## Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in the project details:
   - **Project Name**: Choose any name (e.g., "translation-app")
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose the region closest to you
4. Click "Create new project"
5. Wait for the project to be created (this takes about 2 minutes)

## Step 2: Create the Database Table

1. In your Supabase project dashboard, click on **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy and paste the following SQL code:

```sql
-- Create translation_history table
CREATE TABLE translation_history (
  id BIGSERIAL PRIMARY KEY,
  input_text TEXT NOT NULL,
  translations JSONB NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on timestamp for faster queries
CREATE INDEX idx_translation_history_timestamp ON translation_history(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE translation_history ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for development)
-- In production, you should create more restrictive policies
CREATE POLICY "Allow all operations" ON translation_history
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click **"Run"** to execute the SQL
5. You should see a success message

## Step 3: Get Your Supabase Credentials

1. In your Supabase project dashboard, click on **"Project Settings"** (gear icon) in the left sidebar
2. Click on **"API"** in the settings menu
3. You'll see two important values:
   - **Project URL**: Looks like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: A long string starting with `eyJ...`

## Step 4: Configure Environment Variables

1. In your project root directory, create or update the `.env` file
2. Add the following lines (replace with your actual values):

```env
# OpenRouter API Key (you should already have this)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Supabase Configuration
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
```

3. Save the file

## Step 5: Verify the Setup

1. Restart your development server:
```bash
npm run dev
```

2. Open your app in the browser (usually http://localhost:3000)

3. Try translating some text:
   - Enter text in the input field
   - Click "開始翻譯"
   - Wait for the translation to complete

4. Check if the history appears in the sidebar:
   - Your translation should automatically appear in the left sidebar
   - The timestamp should show the current date and time

5. Test history features:
   - Click on a history item to reload it
   - Click the trash icon to delete a single item
   - Click "清空" to clear all history

## Step 6: Verify in Supabase Dashboard

1. Go back to your Supabase dashboard
2. Click on **"Table Editor"** in the left sidebar
3. Select the **"translation_history"** table
4. You should see your translation records with:
   - `id`: Auto-generated ID
   - `input_text`: The original text you entered
   - `translations`: JSON array of translations
   - `timestamp`: When the translation was created

## Database Schema Details

The `translation_history` table has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key (auto-increment) |
| input_text | TEXT | The original text that was translated |
| translations | JSONB | Array of translation objects (language, flag, text) |
| timestamp | TIMESTAMPTZ | When the translation was created |
| created_at | TIMESTAMPTZ | Database record creation time |

## Troubleshooting

### Error: "Supabase configuration is missing"

- Make sure your `.env` file has both `SUPABASE_URL` and `SUPABASE_KEY`
- Restart your development server after adding environment variables

### Error: "Database error: permission denied"

- Check that Row Level Security policies are set correctly
- In the SQL Editor, run: `SELECT * FROM translation_history;` to verify permissions

### History is not loading

- Open browser console (F12) and check for errors
- Verify your Supabase credentials are correct
- Make sure the table was created successfully

### Translations are not being saved

- Check the browser console for errors
- Verify the table exists in Supabase Table Editor
- Check that your Supabase project is active and running

## Production Considerations

For production deployment, consider:

1. **Row Level Security**: Implement user authentication and restrict access to users' own history
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **Data Retention**: Implement a cleanup policy for old records
4. **Backup**: Enable Supabase automatic backups
5. **Monitoring**: Set up alerts for database errors

## API Endpoints Created

The following API endpoints are now available:

- `POST /api/history/save` - Save a translation to history
- `GET /api/history/load` - Load translation history (latest 50 records)
- `DELETE /api/history/delete?id={id}` - Delete a specific history item
- `DELETE /api/history/clear` - Clear all history

## Next Steps

Your translation app now has full history functionality! You can:

- Translate text and see it automatically saved
- Click on past translations to reload them
- Delete individual history items
- Clear all history at once

All data is securely stored in Supabase and persists across browser sessions.

## Support

If you encounter any issues:

1. Check the Supabase documentation: https://supabase.com/docs
2. Review the console logs in your browser (F12)
3. Check the Supabase project logs in the dashboard
4. Verify all environment variables are set correctly

