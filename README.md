# Agile Front-End Team Project

## Project Overview

This project is a front-end web application developed by an agile team as part of a group assignment. The goal of the project is to design, build, and deliver a user-facing application using a modern JavaScript framework while working in a collaborative agile environment.

The project was developed over multiple one-week sprints with a focus on teamwork, communication, adaptability, and reflective learning. Rather than focusing only on code complexity, the project emphasizes collaboration, problem-solving, and documenting the development process.

---

## Tech Stack

The project is built using the following technologies:

- **Next.js** – React framework used for building the application and handling routing.
- **TypeScript** – Adds static typing to improve reliability and maintainability.
- **Tailwind CSS** – Utility-first CSS framework used for styling and responsive design.
- **React Hook Form** – Library used for efficient form management and handling user input.
- **Zod** – Schema validation library used for validating form data and ensuring type safety.

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Nirush4/Agency-2
```

### 2. Navigate to the project directory

```bash
cd Agency-2
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the following address in your browser:

```
http://localhost:3000
```

---

## Project Features

Features implemented in the project may include:

- Responsive user interface
- Form handling with validation
- Type-safe development with TypeScript
- Modern UI styling with Tailwind CSS
- Component-based architecture
- Client-side routing with Next.js

---

## Agile Workflow

This project follows an **Agile Scrum workflow** with weekly sprints.

Each sprint includes:

1. Sprint Planning
2. Task assignment using the project board
3. Development and collaboration
4. Testing and quality assurance
5. Sprint Review and feedback

Tasks are managed using a **GitHub Project Board** with columns such as:

- Backlog
- To Do
- In Progress
- Review / Testing
- Done

---

## Team Roles

The team simulates a real-world development environment with defined roles.

### Product Owner

Provides project priorities, feedback, and ensures the project aligns with learning goals.

### Scrum Master

Manages the sprint workflow, facilitates team communication, and monitors progress.

### Developers

Implement features, fix issues, and collaborate with designers and QA to build the application.

### Quality Assurance (QA)

Tests the application, identifies bugs, and ensures that features meet quality standards.

### Designers

Create wireframes, UI designs, and maintain visual and interaction consistency.

---

## Collaboration

Team collaboration was managed through:

- GitHub repository for version control
- Pull Requests for reviewing and merging code
- GitHub Issues for task tracking
- Project board for sprint workflow
- Regular team communication for updates and blockers

Each member contributed through commits, pull requests, and task updates during the sprints.

---

## Learning Outcomes

Through this project the team practiced:

- Agile development methodology
- Working with modern front-end technologies
- Collaboration within defined development roles
- Version control using Git and GitHub
- Problem solving and debugging
- Communication within a development team

---

## Resources

External resources used during development include:

- Official documentation for Next.js
- TypeScript documentation
- Tailwind CSS documentation
- React Hook Form documentation
- Zod documentation
- Developer tutorials and technical articles

---

## Project Structure

Example project structure:

```
agency-2
│
├── app/                     # Next.js App Router pages
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── layout.tsx           # Root layout for the application
│   ├── NotFound.tsx         # Custom 404 page
│   └── page.tsx             # Main landing page
│
├── components/              # Reusable React components
│   ├── layout/              # Layout-related components
│   └── ui/                  # UI components (buttons, inputs, etc.)
│
├── hooks/                   # Custom React hooks
│
├── lib/                     # Utility functions and helpers
│   └── utils/
│
├── public/                  # Static assets (images, icons, etc.)
│
├── service/
│   └── api/                 # API service layer
│       ├── auth/            # Authentication API calls
│       └── users/           # User-related API calls
│
├── styles/                  # Global and shared styles
│
├── types/                   # TypeScript type definitions
│
├── .gitignore               # Git ignored files
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

---

## License

This project was created for educational purposes as part of a coursework assignment.
