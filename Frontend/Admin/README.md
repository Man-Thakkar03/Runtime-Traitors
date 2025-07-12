# Ripple† Admin Dashboard

A modern, mobile-responsive admin dashboard built with React and Tailwind CSS.

## Features

### 🎨 Design
- **Dark Theme**: Modern dark UI with purple/blue gradient accents
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Tech-Focused**: Clean, professional interface optimized for admin tasks

### 📱 Mobile Responsiveness
- **Responsive Sidebar**: Collapsible sidebar with mobile menu toggle
- **Card Layouts**: Mobile-optimized card views for data tables
- **Touch-Friendly**: Optimized touch targets and interactions
- **Flexible Grids**: Responsive grid layouts that adapt to screen size
- **Mobile Navigation**: Hamburger menu with smooth animations

### 🚀 Key Pages
- **Dashboard**: Analytics overview with responsive charts
- **User Management**: User listing with mobile card views
- **Question Moderation**: Content moderation with responsive filters
- **Answer Management**: Answer moderation with mobile-friendly interface
- **Moderation Panel**: User and content moderation tools
- **Settings**: Comprehensive admin settings with responsive forms

### 🛠 Technical Features
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Responsive data visualization
- **React Icons**: Consistent iconography
- **Custom Animations**: Smooth transitions and micro-interactions

## Mobile Optimizations

### Responsive Breakpoints
- **Mobile**: < 640px - Single column layouts, card views
- **Tablet**: 640px - 1024px - Hybrid layouts
- **Desktop**: > 1024px - Full table views, sidebar always visible

### Mobile-First Features
- Touch-optimized buttons (44px minimum)
- Swipe-friendly interfaces
- Readable typography at all sizes
- Optimized spacing and padding
- Smooth scrolling and animations

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the application

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **React Icons** - Icon library

## Mobile Testing

The application has been optimized for:
- ✅ iPhone (iOS Safari)
- ✅ Android (Chrome)
- ✅ iPad (Safari)
- ✅ Desktop browsers
- ✅ Tablet devices

All pages feature responsive design with mobile-first approach and smooth transitions between breakpoints.

## Configuration

### Logout Redirect URL

The admin panel is configured to redirect to the User frontend after logout. You can modify the redirect URL in `src/config.js`:

```javascript
export const config = {
  // URL for the User frontend (adjust based on your setup)
  userFrontendUrl: "http://localhost:3000",
  // ... other config
};
```

**Default Configuration:**
- User Frontend URL: `http://localhost:3000` (Next.js default port)
- Admin Panel: `http://localhost:5173` (Vite default port)

**To change the redirect URL:**
1. Open `src/config.js`
2. Update the `userFrontendUrl` to match your User frontend URL
3. Save the file and restart the development server

**Example configurations:**
```javascript
// For production
userFrontendUrl: "https://yourdomain.com"

// For different local ports
userFrontendUrl: "http://localhost:3001"

// For subdomain setup
userFrontendUrl: "https://app.yourdomain.com"
```
