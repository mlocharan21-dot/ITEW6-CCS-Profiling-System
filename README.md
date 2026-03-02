# CCS Comprehensive Profiling System

A React + Vite web application for managing students, faculty, courses, scheduling, and events for a Computer Studies department.

## Features

- **Dashboard** - Overview statistics and quick actions
- **Student Management** - Add, edit, delete, and view student profiles
- **Faculty Management** - Add, edit, delete, and view faculty profiles
- **Instruction Management**
  - Syllabus management
  - Lesson plans
  - Curriculum overview
  - Scheduling (Courses, Sections, Rooms, Laboratories, Faculty Assignment)
- **Events Management** - Curricular and Extra-curricular events
- **Global Search** - Search across students, faculty, courses, and events
- **Filters** - Per-module filtering capabilities
- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- React 19
- Vite
- React Router DOM
- CSS (Custom styling)

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Navigate to the project directory:
   
```
bash
   cd ccs-profiling-system
   
```

2. Install dependencies:
   
```
bash
   npm install
   
```

3. Start the development server:
   
```
bash
   npm run dev
   
```

4. Open your browser and visit:
   
```
   http://localhost:5173
   
```

## Building for Production

To create a production build:

```
bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
ccs-profiling-system/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── DataTable.jsx
│   │   │   ├── FormInput.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   └── index.js
│   ├── context/
│   │   └── AppContext.jsx   # Global state management
│   ├── data/
│   │   └── mockData.js      # Mock data
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── students/        # Student pages
│   │   ├── faculty/         # Faculty pages
│   │   ├── instruction/      # Instruction pages
│   │   │   └── scheduling/  # Scheduling pages
│   │   └── events/          # Events page
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Mock Data

The application uses mock data stored in `src/data/mockData.js`. It includes:
- 20 students
- 10 faculty members
- 15 courses
- 10 sections
- 10 rooms
- 5 laboratories
- 10 events

## Routes

| Path | Description |
|------|-------------|
| `/` | Dashboard |
| `/students` | Student List |
| `/students/:id` | Student Profile |
| `/faculty` | Faculty List |
| `/faculty/:id` | Faculty Profile |
| `/instruction` | Instruction (tabs) |
| `/instruction/syllabus` | Syllabus Management |
| `/instruction/lessons` | Lesson Plans |
| `/instruction/curriculum` | Curriculum |
| `/instruction/scheduling` | Scheduling |
| `/instruction/scheduling/courses` | Course Management |
| `/instruction/scheduling/sections` | Section Management |
| `/instruction/scheduling/rooms` | Room Management |
| `/instruction/scheduling/laboratories` | Laboratory Management |
| `/instruction/scheduling/faculty-assignment` | Faculty Assignment |
| `/events` | Events Management |

## License

ISC
