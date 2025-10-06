# Dual Authentication System

This school management system features a dual authentication setup that automatically detects the environment and uses the appropriate authentication method:

- **Local Development**: Username/password authentication
- **Replit Production**: Replit OIDC authentication

## How It Works

The system detects the environment by checking for the `REPL_ID` environment variable:

- **If `REPL_ID` is NOT present** → Uses local username/password authentication
- **If `REPL_ID` is present** → Uses Replit OIDC authentication

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file (optional for local development):

```env
# Optional: Set a custom session secret (auto-generated if not provided)
SESSION_SECRET=your-random-secret-here

# Optional: Use PostgreSQL for session storage
# If not provided, sessions will use in-memory storage (resets on server restart)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### 3. Create a Test User

Run the seed script to create a test user:

```bash
npx tsx server/seedUser.ts
```

This creates a user with:
- **Email**: `admin@test.com`
- **Password**: `admin123`

### 4. Start the Application

```bash
npm run dev
```

### 5. Login

Visit `http://localhost:5000` and you'll see the login form automatically. Use the test credentials to sign in.

## Replit Production Setup

### 1. Set Environment Variables

In your Replit project, make sure these environment variables are set:

```env
SESSION_SECRET=your-secure-random-secret
DATABASE_URL=your-postgresql-connection-string
REPLIT_DOMAINS=your-repl-domain.repl.co
REPL_ID=automatically-set-by-replit
```

### 2. Deploy

The application will automatically use Replit OIDC authentication when deployed on Replit. Users will click "Sign In" and be redirected to Replit's authentication page.

## Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds (10 by default)
- Passwords are never stored in plain text
- Password verification happens server-side

### Session Security
- **Production**: Cookies are marked as `secure` (HTTPS only) and `httpOnly`
- **Local Development**: Cookies work over HTTP but are still `httpOnly`
- Session secrets are required in production (throws error if missing)
- Session secrets are randomly generated per boot in local development

### Session Storage
- **With DATABASE_URL**: Sessions are stored in PostgreSQL (persistent)
- **Without DATABASE_URL**: Sessions are stored in memory (reset on server restart)

## API Endpoints

### Local Authentication

- `POST /api/login` - Login with email and password
  ```json
  {
    "email": "admin@test.com",
    "password": "admin123"
  }
  ```

- `GET /api/logout` - Logout (local mode only)

### Replit OIDC Authentication

- `GET /api/login` - Redirects to Replit OIDC login page
- `GET /api/callback` - OIDC callback endpoint
- `GET /api/logout` - Logout

### Protected Routes

- `GET /api/auth/user` - Returns current user (requires authentication)
- All other `/api/*` routes require authentication via the `isAuthenticated` middleware

## User Interface

### Landing Page Behavior

- **Local Development**: Shows login form directly on the landing page
- **Replit Production**: Shows landing page with "Sign In" button that redirects to Replit OIDC

This is automatically determined by checking `import.meta.env.REPL_ID` on the frontend.

## Notes

- **Local sessions reset on server restart** if you're not using DATABASE_URL (because the session secret is randomly generated each time)
- To persist sessions in local development, set up a local PostgreSQL database and configure DATABASE_URL
- The test user created by the seed script is stored in memory and will be lost when the server restarts (unless using PostgreSQL storage)
- All authentication routes automatically adapt based on the environment

## Troubleshooting

### Local Development Issues

**Problem**: Login succeeds but immediately logs out
- **Cause**: Session cookie not persisting
- **Solution**: Make sure you're not running HTTPS locally, or ensure SESSION_SECRET is set

**Problem**: "Unauthorized" errors after login
- **Cause**: Session storage not working
- **Solution**: Check if DATABASE_URL is set correctly, or verify MemoryStore is installed

### Production Issues

**Problem**: "SESSION_SECRET environment variable is required"
- **Solution**: Set the SESSION_SECRET environment variable in your Replit Secrets

**Problem**: OIDC login fails
- **Solution**: Verify REPLIT_DOMAINS and REPL_ID are set correctly

## Additional Security Recommendations

1. **Always use strong SESSION_SECRET values in production** - Use a random 32+ character string
2. **Enable DATABASE_URL in production** - For persistent sessions across server restarts
3. **Rotate session secrets periodically** - For enhanced security
4. **Use HTTPS in production** - Replit automatically provides this
5. **Review user roles** - Implement proper role-based access control for different user types
