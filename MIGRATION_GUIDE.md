# Migration Guide: Next.js to React + Vite

This project has been simplified from Next.js to a standard React + Vite setup for easier understanding.

## What Changed

### Before (Next.js)
- Complex file-based routing with `app/` directory
- Server-side rendering (SSR)
- API routes in `app/api/`
- TypeScript by default
- Next.js specific features

### After (React + Vite)
- Simple React Router for routing
- Client-side only (easier to understand)
- Standard React components
- JavaScript (JSX) - easier for beginners
- Standard React patterns

## New File Structure

```
src/
├── main.jsx          ← React entry point (like index.js)
├── App.jsx           ← Main app with routes
├── components/       ← Reusable components
├── pages/            ← Page components
└── lib/              ← Utilities
```

## Key Differences

### Routing
**Before (Next.js):**
```jsx
// File: app/login/page.tsx
export default function LoginPage() { ... }
```

**After (React Router):**
```jsx
// File: src/pages/LoginPage.jsx
function LoginPage() { ... }
// Route defined in App.jsx
<Route path="/login" element={<LoginPage />} />
```

### Navigation
**Before:**
```jsx
import Link from 'next/link'
<Link href="/login">Login</Link>
```

**After:**
```jsx
import { Link } from 'react-router-dom'
<Link to="/login">Login</Link>
```

### API Calls
**Before:**
```jsx
// API routes in app/api/
fetch('/api/auth/login')
```

**After:**
```jsx
// Same, but needs backend server
fetch('/api/auth/login')
```

## What to Do Next

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Set up backend API:**
   - The frontend expects API endpoints at `/api/*`
   - See `API_ENDPOINTS.md` for details
   - You can use Express.js, Node.js, or any backend framework

4. **Old Next.js files:**
   - The old `src/app/` directory is still there
   - You can delete it if you don't need it
   - The new structure is in `src/pages/` and `src/components/`

## Benefits of This Structure

✅ **Easier to understand** - Standard React patterns
✅ **Better for learning** - No framework-specific concepts
✅ **Simpler routing** - React Router is straightforward
✅ **Faster development** - Vite is very fast
✅ **Standard JavaScript** - No TypeScript complexity

## Need Help?

- Check `README.md` for basic usage
- See `API_ENDPOINTS.md` for backend requirements
- Look at `src/App.jsx` to understand routing
- Check individual page files in `src/pages/`

