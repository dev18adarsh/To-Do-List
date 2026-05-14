import React, { useState, useEffect } from 'react';

const priorityOrder = { high: 0, medium: 1, low: 2 };

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(deadline);
    return dueDate < today;
  };

  const getSortedTasks = (taskList) => {
    return [...taskList].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const filteredTasks = getSortedTasks(tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }));

  const incompleteCount = tasks.filter(t => !t.completed).length;
  const hasCompleted = tasks.some(t => t.completed);

  const addTask = () => {
    const text = inputValue.trim();
    if (!text) return;
    setTasks([...tasks, {
      text,
      completed: false,
      priority: newTaskPriority,
      deadline: newTaskDeadline || null
    }]);
    setInputValue('');
    setNewTaskPriority('medium');
    setNewTaskDeadline('');
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    const taskIndex = tasks.findIndex((t, i) => {
      const filtered = filteredTasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
      });
      return i === tasks.indexOf(filtered[index]);
    });

    if (taskIndex !== -1) {
      newTasks[taskIndex].completed = !newTasks[taskIndex].completed;
      setTasks(newTasks);
    }
  };

  const deleteTask = (index) => {
    const filtered = filteredTasks.filter((_, i) => i !== index);
    const remainingTasks = tasks.filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });

    const taskToRemove = filteredTasks[index];
    setTasks(tasks.filter(t => t !== taskToRemove));
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
        <button className="add-btn" onClick={addTask}>
          <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </button>
      </div>

      <div className="tabs">
        <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`tab ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
        <button className={`tab ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            {filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks`}
          </div>
        ) : (
          filteredTasks.map((task, index) => {
            const overdue = !task.completed && isOverdue(task.deadline);
            return (
              <div key={index} className={`task ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}>
                <div className={`checkbox ${task.completed ? 'checked' : ''}`} onClick={() => toggleTask(index)}>
                  <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
                <span className="task-text">{task.text}</span>
                {task.deadline && (
                  <span className={`deadline ${overdue ? 'overdue-date' : ''}`}>
                    {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
                <button className="delete-btn" onClick={() => deleteTask(index)}>
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