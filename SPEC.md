# To-Do List Application Specification

## Project Overview
- **Type**: Single-page interactive web application
- **Core Functionality**: A visually engaging to-do list with add, complete, and delete capabilities
- **Target Users**: Anyone needing a simple task management tool

## UI/UX Specification

### Layout Structure
- Centered container (max-width: 480px)
- Header with title and task counter
- Input area with add button
- Scrollable task list area
- Each task: checkbox, text, delete button

### Visual Design

**Color Palette**
- Background: `#0f0f0f` (near black)
- Container: `#1a1a1a` (dark gray)
- Primary accent: `#f59e0b` (amber)
- Secondary: `#fbbf24` (light amber)
- Text primary: `#fafafa` (off-white)
- Text secondary: `#a3a3a3` (muted gray)
- Completed task: `#525252` (gray)
- Danger/Delete: `#ef4444` (red)

**Typography**
- Font: "Outfit", sans-serif (Google Fonts)
- Title: 28px, bold
- Task text: 16px, regular
- Input: 16px
- Counter: 14px, secondary color

**Spacing**
- Container padding: 24px
- Task item padding: 12px 16px
- Gap between tasks: 8px
- Border radius: 12px (container), 8px (tasks/inputs)

**Visual Effects**
- Container: subtle border glow (`#f59e0b20`)
- Input focus: amber border glow
- Task hover: slight background lighten
- Checkbox: custom styled with amber accent
- Smooth transitions (0.2s ease)
- Delete button appears on task hover

### Components

**Header**
- App title "Tasks"
- Task counter showing "X items left"

**Input Area**
- Text input with placeholder "Add a new task..."
- Add button with + icon

**Task Item**
- Custom checkbox (unchecked/checked states)
- Task text (strikethrough when completed)
- Delete button (× icon, appears on hover)

**Empty State**
- Shown when no tasks exist
- Subtle message "No tasks yet. Add one above!"

## Functionality Specification

### Core Features
1. **Add Task**: Enter text in input, press Enter or click Add button
2. **Complete Task**: Click checkbox to toggle completion
3. **Delete Task**: Click delete button to remove task
4. **Task Counter**: Shows number of incomplete tasks
5. **Persistence**: Tasks saved to localStorage

### User Interactions
- Enter key in input adds task
- Clicking checkbox toggles completion
- Clicking delete removes task
- Tasks persist across page refreshes

### Edge Cases
- Empty input: Do not add empty tasks
- Whitespace-only input: Trim and ignore
- Long task text: Wrap naturally

## Acceptance Criteria
- [ ] Page loads with dark theme and amber accents
- [ ] Can add new tasks via input + Enter or Add button
- [ ] Can mark tasks as complete via checkbox
- [ ] Can delete tasks via delete button
- [ ] Task counter updates correctly
- [ ] Tasks persist after page refresh
- [ ] Empty state shows when no tasks
- [ ] Smooth hover/focus animations work