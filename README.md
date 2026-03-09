# Patient Real-Time Form System

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

## How to Run the Project

### 1. Install dependencies

```
npm install
```

### 2. Start the WebSocket server

```
npm run websocket
```

WebSocket server runs on:

```
ws://localhost:8080
```

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

## Demo Instructions

1. Start the WebSocket server.
2. Start the Next.js application.
3. Open two browser tabs:

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
