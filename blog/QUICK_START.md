# Quick Start Guide - Blog Dashboard with Supabase

## 🚀 Quick Setup (8 minutes)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Sign up (free account)
3. Click "New Project"
4. Name: `cancer-awareness-blog`
5. Set a strong password
6. Click "Create new project" (wait ~1 min)

### Step 2: Create Database Table
In Supabase Console:

1. Click "SQL Editor" in left sidebar
2. Click "New Query"
3. Paste this SQL:

```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_created ON posts(created_at);
```

4. Click "Run" (green button)

### Step 3: Create Storage Bucket
1. Click "Storage" in left menu
2. Click "Create a new bucket"
3. Name: `blog-images`
4. **Uncheck** "Make it private"
5. Click "Create bucket"

### Step 4: Get Your Credentials
1. Click Settings ⚙️ → "API"
2. Copy:
   - **Project URL** (like `https://abc123.supabase.co`)
   - **anon public** key

### Step 5: Configure .env.local
Edit `blog/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 6: Run Locally
```bash
cd blog
npm run dev
```

Visit: http://localhost:3000/dashboard

---

## 📝 Create Your First Post

1. Go to `/dashboard`
2. Click "+ New Post"
3. Fill in:
   - **Title**: "Cancer Awareness Tips"
   - **Author**: "Your Name"
   - **Category**: "Awareness"
   - **Excerpt**: "Important tips for cancer prevention"
   - **Content**: "Write your content here..."
4. Click "Create Post"
5. Check `/blog` to see it published!

---

## 🌐 Deploy to Vercel

```bash
# 1. Initialize git
git init
git add .
git commit -m "Blog dashboard with Supabase"
git branch -M main

# 2. Push to GitHub
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# 3. Go to vercel.com
# 4. Click "New Project"
# 5. Select your GitHub repo
# 6. Add environment variables from .env.local
# 7. Click "Deploy"
```

**Your blog is live!** 🎉

---

## ❓ Common Issues

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Posts not loading"
- Check `.env.local` has correct values
- Check `posts` table exists in Supabase
- Check you created the table with SQL above

### "Image upload fails"
- Check `blog-images` bucket exists
- Check bucket is PUBLIC (not private)
- Check file size < 50MB

### "Connection refused"
- Verify Supabase URL starts with `https://`
- Verify Project URL not "API URL"
- Restart: `npm run dev`

---

## 🆘 Supabase RLS (Security)

By default, your `posts` table is accessible to all. To secure it:

1. In Supabase, click "Authentication" → "Policies"
2. Click on `posts` table
3. Add policy: Allow anyone to READ published posts
4. Add policy: Allow authenticated users to CREATE/EDIT/DELETE

For now, leave it open to test!

---

## 📚 What's Next?

- [ ] Create 5+ blog posts
- [ ] Test category filtering
- [ ] Upload featured images
- [ ] Share `/blog` with team
- [ ] Deploy to Vercel
- [ ] Add more categories
- [ ] Customize theme colors

---

## 🚀 You're All Set!

Supabase gives you:
✅ 500MB database storage (free)
✅ 5GB file storage (free)
✅ Real-time subscriptions
✅ No billing required for Storage (unlike Firebase)

**Start creating posts!** 🎉
