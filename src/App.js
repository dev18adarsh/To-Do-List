import React, { useState, useEffect, useRef, useMemo } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.map(t => t.id ? t : { ...t, id: Date.now() + Math.random() });
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const categories = useMemo(() => {
    const set = new Set();
    tasks.forEach(t => { if (t.category) set.add(t.category); });
    return ['all', ...Array.from(set).sort()];
  }, [tasks]);

  useEffect(() => {
    if (categoryFilter !== 'all' && !tasks.some(t => t.category === categoryFilter)) {
      setCategoryFilter('all');
    }
  }, [tasks, categoryFilter]);

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(deadline);
    return dueDate < today;
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }).filter(task => {
    if (categoryFilter === 'all') return true;
    return task.category === categoryFilter;
  });

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setDragOverIndex(y < rect.height / 2 ? index : index + 1);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (insertAt) => {
    if (dragIndex === null) { setDragOverIndex(null); return; }
    const reordered = [...tasks];
    const [moved] = reordered.splice(dragIndex, 1);
    const adjusted = insertAt > dragIndex ? insertAt - 1 : insertAt;
    reordered.splice(adjusted, 0, moved);
    setTasks(reordered);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleListDrop = () => {
    if (dragIndex === null) return;
    handleDrop(tasks.length);
  };

  const incompleteCount = tasks.filter(t => !t.completed).length;
  const hasCompleted = tasks.some(t => t.completed);

  const addTask = () => {
    const text = inputValue.trim();
    if (!text) return;
    setTasks([...tasks, {
      id: Date.now() + Math.random(),
      text,
      completed: false,
      priority: newTaskPriority,
      deadline: newTaskDeadline || null,
      category: newTaskCategory.trim() || null
    }]);
    setInputValue('');
    setNewTaskPriority('medium');
    setNewTaskDeadline('');
    setNewTaskCategory('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Tasks</h1>
        <span className="counter">{incompleteCount} item{incompleteCount !== 1 ? 's' : ''} left</span>
      </div>

      <div className="input-area">
        <input
          type="text"
          className="input"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <select
          className="priority-select"
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          className="date-input"
          value={newTaskDeadline}
          onChange={(e) => setNewTaskDeadline(e.target.value)}
        />
        <input
          type="text"
          className="category-input"
          placeholder="Category..."
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          list="category-list"
        />
        <datalist id="category-list">
          {categories.filter(c => c !== 'all').map(c => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <button className="add-btn" onClick={addTask}>
          <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </button>
      </div>

      <div className="tabs">
        <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`tab ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
        <button className={`tab ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
      </div>

      {categories.length > 1 && (
        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      )}

      <div
        className="task-list"
        ref={listRef}
        onDragOver={(e) => { e.preventDefault(); dragIndex !== null && setDragOverIndex(tasks.length); }}
        onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOverIndex(null); }}
        onDrop={handleListDrop}
      >
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            {filter === 'all' && categoryFilter === 'all'
              ? 'No tasks yet. Add one above!'
              : `No ${filter === 'all' ? '' : filter + ' '}tasks${categoryFilter === 'all' ? '' : ' in ' + categoryFilter}`}
          </div>
        ) : (
          filteredTasks.map((task) => {
            const taskIndex = tasks.indexOf(task);
            const overdue = !task.completed && isOverdue(task.deadline);
            const isDragging = dragIndex === taskIndex;
            const isDragOverTop = dragOverIndex === taskIndex;
            const isDragOverBottom = dragOverIndex === taskIndex + 1;
            return (
              <div
                key={task.id}
                className={`task ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''} ${isDragging ? 'dragging' : ''} ${isDragOverTop ? 'drag-over-top' : ''} ${isDragOverBottom ? 'drag-over-bottom' : ''}`}
                draggable={false}
                onDragOver={(e) => handleDragOver(e, taskIndex)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const y = e.clientY - rect.top;
                  handleDrop(y < rect.height / 2 ? taskIndex : taskIndex + 1);
                }}
                onDragEnd={handleDragEnd}
              >
                <span
                  className="drag-handle"
                  draggable
                  onDragStart={() => handleDragStart(taskIndex)}
                >
                  <svg viewBox="0 0 24 24"><path d="M8 6h2v2H8V6zm6 0h2v2h-2V6zM8 11h2v2H8v-2zm6 0h2v2h-2v-2zm-6 5h2v2H8v-2zm6 0h2v2h-2v-2z"/></svg>
                </span>
                <div className={`checkbox ${task.completed ? 'checked' : ''}`} onClick={() => toggleTask(task.id)}>
                  <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
                {task.category && (
                  <span className="category-badge">{task.category}</span>
                )}
                <span className="task-text">{task.text}</span>
                {task.deadline && (
                  <span className={`deadline ${overdue ? 'overdue-date' : ''}`}>
                    {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
              </div>
            );
          })
        )}
      </div>

      {hasCompleted && (
        <button className={`clear-completed ${hasCompleted ? 'visible' : ''}`} onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}

export default App;