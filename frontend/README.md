# Frontend - MechBook

React + Vite frontend application for MechBook.

## 📁 Structure

```
frontend/
├── index.html            # HTML entry point
├── src/
│   ├── main.jsx         # React entry point
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   └── lib/             # Utility functions
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind CSS config
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## 📡 API Configuration

The frontend is configured to proxy API requests to the backend server running on `http://localhost:5000`.

This is configured in `vite.config.js`:

```js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach

## 📝 Notes

- Make sure the backend server is running before using the app
- API calls are made to `/api/*` endpoints
- User authentication uses localStorage (JWT tokens)

