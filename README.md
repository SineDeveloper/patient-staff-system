# Patient Real-Time Form System v0.1.0

## Project Overview

This project implements a real-time patient information form and staff dashboard.
Patients fill in personal details through a form interface, while staff members can monitor the input live through a dashboard.

The system uses WebSockets to synchronize data instantly between the patient form and the staff dashboard.

---

## Features

* Real-time patient form updates
* Staff dashboard displaying live patient information
* Patient activity tracking:

  * ACTIVE (patient typing)
  * INACTIVE (no activity for 5 seconds)
  * SUBMITTED (form completed)
* WebSocket connection status indicator
* Automatic WebSocket reconnection
* Responsive UI for mobile and desktop
* Clean React component architecture using TypeScript

---

## WebSocket Connection Handling

The application maintains a single WebSocket connection per client using a singleton connection pattern.

Features include:

* Connection status indicator on the staff dashboard
* Automatic reconnection if the WebSocket connection drops
* Structured message format for future extensibility

These mechanisms improve reliability and simulate production-grade real-time system behavior.

---

## Tech Stack

Frontend:

* Next.js 16 (React framework)
* React 19
* TypeScript
* Tailwind CSS 4

Real-Time Communication:

* Native WebSockets (ws library)

Form Libraries:

* react-international-phone (international phone input)
* react-datepicker (date input handling)
* date-fns (date formatting and manipulation)
* country-list (country selection)

Other Tools:

* Node.js
* npm
* tsx (TypeScript execution)

---

## Project Structure

```
patient-staff-system
│
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── patient
│   │   └── page.tsx
│   └── staff
│       └── page.tsx
│
├── components
│   ├── FormDate.tsx
│   ├── FormInput.tsx
│   ├── FormSelect.tsx
│   ├── FormTel.tsx
│   ├── PatientCard.tsx
│   ├── PatientForm.tsx
│   └── phoneInput.css
│
├── services
│   └── websocket.ts
│
├── types
│   ├── patient.ts
│   └── status.ts
│
├── utils
│   └── validation.ts
│
├── websocket-server
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## System Architecture

The application consists of two main interfaces:

1. Patient Form
2. Staff Dashboard

Both interfaces communicate through a WebSocket server.

### Data Flow

```
Patient Form
     │
     │ WebSocket message
     ▼
WebSocket Server
     │
     │ Broadcast update
     ▼
Staff Dashboard
```

Whenever the patient updates a field, the change is sent to the WebSocket server, which then broadcasts the update to all connected staff dashboards.

---

## WebSocket Message Format

Messages follow a structured format:

```
{
  type: "FORM_UPDATE",
  payload: PatientData
}
```

Example message types:

* FORM_UPDATE
* FORM_SUBMIT

This structure allows the system to easily support additional message types in the future.

---

## Patient Status System

The staff dashboard displays the patient’s current activity status:

ACTIVE
The patient is actively typing.

INACTIVE
No activity detected for 5 seconds.

SUBMITTED
The patient submitted the form.

This provides staff members with real-time insight into patient progress.

---

## Environment Configuration

This project requires specific environment variables for both development and production environments.

### Required Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_WS_URL` | Yes | WebSocket server URL for frontend connection | `ws://localhost:8080` (dev) |
| `WS_PORT` | No | WebSocket server port (backend only) | `8080` |
| `NODE_ENV` | No | Environment mode (affects logging) | `development` |

### Setting Up Environment Variables

#### For Development:

1. Create `.env.local` in the project root:
   ```bash
   NEXT_PUBLIC_WS_URL=ws://localhost:8080
   WS_PORT=8080
   NODE_ENV=development
   ```

2. Or use the provided script:
   ```bash
   echo "NEXT_PUBLIC_WS_URL=ws://localhost:8080" > .env.local
   echo "WS_PORT=8080" >> .env.local
   echo "NODE_ENV=development" >> .env.local
   ```

#### For Production:

1. **Frontend (Vercel)**: Set in Vercel dashboard under Settings → Environment Variables:
   ```
   NEXT_PUBLIC_WS_URL=wss://your-websocket-server.com
   NODE_ENV=production
   ```

2. **WebSocket Server**: Set on your hosting platform:
   ```
   WS_PORT=8080
   NODE_ENV=production
   ```

### Environment-Specific Configurations

**Development:**
- WebSocket URL: `ws://localhost:8080` (insecure, localhost)
- Logging: Enabled (console output visible)
- Auto-reconnection: Aggressive (3-second intervals)

**Production:**
- WebSocket URL: `wss://your-domain.com` (secure, HTTPS required)
- Logging: Suppressed (no console spam in production)
- Auto-reconnection: Conservative (longer intervals recommended)

### Important Notes

- `NEXT_PUBLIC_WS_URL` is exposed to the browser, so it must use `wss://` in production
- Never commit `.env.local` to version control
- For Vercel deployment, environment variables are set in the dashboard, not in files
- Test WebSocket connections after deployment using browser developer tools

---

## How to Run the Project

### 1. Install dependencies

```
npm install
```

### 2. Start the WebSocket server

```
npm run websocket
```

WebSocket server runs on the port specified in `WS_PORT` environment variable (default: ws://localhost:8080).

### 3. Start the Next.js application

In a new terminal:

```
npm run dev
```

Application runs on:

```
http://localhost:3000
```

---

## Production Build & Deployment

### Build the application

```
npm run build
npm run start
```

### Pre-deployment Checklist

- [ ] **Environment Variables**: All required variables configured for production
- [ ] **WebSocket Server**: Deployed separately with proper domain/URL
- [ ] **Security**: `NEXT_PUBLIC_WS_URL` uses `wss://` protocol
- [ ] **NODE_ENV**: Set to `production` to suppress debug logs
- [ ] **Build**: `npm run build` completes successfully
- [ ] **Linting**: `npm run lint` passes without errors
- [ ] **WebSocket Testing**: Connection works in production environment
- [ ] **CORS**: Properly configured for WebSocket server
- [ ] **HTTPS**: WebSocket server accessible via secure connection
- [ ] **Domain**: WebSocket server domain matches `NEXT_PUBLIC_WS_URL`
- [ ] **Monitoring**: Error logging and monitoring set up (recommended)

### Deploying to Vercel (Recommended)

Vercel is the recommended platform for deploying the Next.js frontend. However, since Vercel doesn't support WebSocket connections natively, you'll need to deploy the WebSocket server separately to a platform that supports persistent connections (like Railway, Render, or Heroku).

#### Step-by-Step Vercel Deployment:

1. **Push your code to GitHub**
   ```
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - **Framework Preset**: Next.js
     - **Root Directory**: `patient-staff-system` (if your repo has multiple projects)
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next` (default)

3. **Configure Environment Variables in Vercel**
   - In your Vercel project dashboard, go to "Settings" → "Environment Variables"
   - Add the following variables:
     ```
     NEXT_PUBLIC_WS_URL=wss://your-websocket-server-domain.com
     NODE_ENV=production
     ```
   - **Important**: Replace `your-websocket-server-domain.com` with your actual WebSocket server URL
   - The `NEXT_PUBLIC_WS_URL` must use `wss://` (secure WebSocket) for production

4. **Deploy the WebSocket Server Separately**
   - Deploy `websocket-server/server.ts` to a platform that supports WebSockets:
     - **Railway**: Excellent for Node.js apps with persistent connections
     - **Render**: Free tier available, good WebSocket support
     - **Heroku**: Traditional choice, but has some limitations
     - **AWS EC2/Lambda**: For more control
   - Set environment variables on your WebSocket server:
     ```
     WS_PORT=8080
     NODE_ENV=production
     ```
   - Ensure your WebSocket server is accessible via HTTPS (wss://)

5. **Deploy**
   - Click "Deploy" in Vercel
   - Wait for the build to complete
   - Your site will be live at `your-project.vercel.app`

#### Environment Variables Reference

| Variable | Frontend/Backend | Description | Development | Production |
|----------|------------------|-------------|-------------|------------|
| `NEXT_PUBLIC_WS_URL` | Frontend | WebSocket server URL | `ws://localhost:8080` | `wss://your-ws-server.com` |
| `WS_PORT` | Backend | WebSocket server port | `8080` | `8080` (or your production port) |
| `NODE_ENV` | Both | Environment mode | `development` | `production` |

#### Troubleshooting Vercel Deployment

- **WebSocket Connection Issues**: Ensure `NEXT_PUBLIC_WS_URL` points to your separate WebSocket server
- **Build Failures**: Check that all dependencies are in `package.json`
- **Environment Variables**: Use `NEXT_PUBLIC_` prefix for client-side variables
- **CORS Issues**: Configure CORS in your WebSocket server if needed

**Note:** For a fully serverless solution, consider using WebSocket providers like Pusher, Socket.io with a cloud service, or Vercel Edge Functions with a WebSocket proxy.

---

## Demo Instructions

1. Ensure `.env.local` is configured
2. Start the WebSocket server: `npm run websocket`
3. In a new terminal, start the Next.js application: `npm run dev`
4. Open two browser tabs:

Patient form:
http://localhost:3000/patient

Staff dashboard:
http://localhost:3000/staff

4. Enter information in the patient form and observe real-time updates on the staff dashboard.

---

## Design Decisions

### WebSockets

WebSockets were chosen to enable real-time synchronization between the patient form and staff dashboard.

### Component Structure

Reusable components were implemented to keep the UI modular and maintainable.

### TypeScript

TypeScript improves code reliability by enforcing type safety.

---

## Possible Future Improvements

* Multiple patient sessions
* Authentication system
* Form validation improvements
* Highlight fields when updated
* Deploy WebSocket server separately
