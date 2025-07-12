# Logout Functionality Test Guide

## Test Steps

1. **Start the Admin Panel:**
   ```bash
   cd Admin
   npm run dev
   ```

2. **Start the User Frontend (in a separate terminal):**
   ```bash
   cd User
   npm run dev
   ```

3. **Test the Logout Function:**
   - Navigate to the admin panel (usually `http://localhost:5173`)
   - Click the "Logout" button in the sidebar
   - Verify the following:
     - ✅ Toast notification appears: "Logout successful! Redirecting to homepage..."
     - ✅ After 1 second, redirects to User frontend (`http://localhost:3000`)
     - ✅ All authentication data is cleared from localStorage and sessionStorage

## Expected Behavior

### Success Message
- A green toast notification appears in the top-right corner
- Message: "Logout successful! Redirecting to homepage..."
- Auto-closes after 2 seconds
- Can be manually closed by clicking

### Redirect
- After 1 second delay, redirects to the User frontend homepage
- URL changes to `http://localhost:3000` (or configured URL)

### Data Cleanup
- `localStorage.access_token` is removed
- `localStorage.admin_token` is removed
- `sessionStorage` is completely cleared

## Configuration

If you need to change the redirect URL, edit `src/config.js`:

```javascript
export const config = {
  userFrontendUrl: "http://localhost:3000", // Change this URL
  // ...
};
```

## Troubleshooting

### Issue: Toast notification doesn't appear
- Check that `react-toastify` is installed: `npm install react-toastify`
- Verify `ToastContainer` is imported in `main.jsx`
- Check browser console for errors

### Issue: Redirect doesn't work
- Verify the User frontend is running on the configured port
- Check the `userFrontendUrl` in `src/config.js`
- Ensure both applications are running simultaneously

### Issue: Data not cleared
- Check browser developer tools > Application > Storage
- Verify localStorage and sessionStorage are empty after logout 