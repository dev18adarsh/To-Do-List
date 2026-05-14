# To-Do List

A modern, visually engaging to-do list application built with React. Features a sleek dark theme with amber accents, priority levels, deadline tracking, categories, search, drag-and-drop reordering, inline editing, and smooth animations.

## Features

### Core Functionality
- **Add Tasks** — Enter task text and press Enter or click the add button
- **Complete Tasks** — Click the checkbox to mark tasks as done
- **Delete Tasks** — Remove tasks with the delete button (appears on hover)
- **Inline Editing** — Double-click any task text to edit it in place; save with Enter/blur, cancel with Escape
- **Task Counter** — Shows remaining incomplete tasks
- **Local Storage** — All data persists across browser sessions

### Priority System
- Three priority levels: High, Medium, Low
- Color-coded badges:
  - 🔴 High — Red badge
  - 🟡 Medium — Amber badge
  - 🟢 Low — Green badge

### Deadline Tracking
- Set due dates using the date picker
- Deadline displayed as a compact badge (e.g., "May 14")
- **Overdue Highlighting**:
  - Red left border on overdue tasks
  - Red-tinted background
  - Pulsing animation on overdue deadline badge

### Categories / Tags
- Assign a category (e.g., Work, Personal, Shopping) when adding a task
- Autocomplete suggestions from previously used categories
- Category filter tabs to show only tasks in a selected category
- Purple category badges displayed on each task

### Search
- Real-time search input filters tasks as you type
- Case-insensitive matching against task text
- Clear button to reset search

### Drag & Drop Reordering
- Drag handle appears on hover
- Drop indicator shows exact insertion position
- Tasks can be reordered freely within the list

### Filtering
- **Status tabs** — All, Active, Completed
- **Category tabs** — All plus every unique category derived from tasks
- Filters compose together (status + category + search)

### Visual Design
- Dark theme (`#0f0f0f` background)
- Amber accent colors (`#f59e0b`)
- Smooth animations and transitions
- Custom-styled checkboxes with checkmark pop animation
- Responsive layout with proper alignment

## Tech Stack

- **React** — UI framework
- **CSS** — Custom styling with CSS variables
- **Local Storage** — Data persistence
- **Google Fonts** — Outfit font family

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`.

## Project Structure

```
ToDoList/
├── src/
│   ├── App.js      # Main React component
│   ├── App.css     # Styles
│   └── index.js    # Entry point
├── public/
│   └── index.html  # HTML template
├── package.json    # Dependencies
├── README.md       # This file
└── SPEC.md         # Project specification
```

## Development History

| Commit | Description |
|--------|-------------|
| e518aca | Made Improvements |
| 09cedc0 | Added Drag and Drop functionality |
| d9deddd | Added Categories/Tags |
| 1103988 | Inline editing allowed |
| 9df24fc | Rectified Frontend Bug |
| 34660f0 | Added Priority levels Functionality |
| 32edfec | Project Completed |
| 77657a4 | Project progressing into React |
| ebddffb | Updated package.json |
| 25d6bce | Prototype made |
| 4be78f5 | Updated changes |
| ac2ca6b | Added enhanced animation |
| 56c2a14 | MVP of the Project |
| 7426315 | First commit |

## License

MIT