import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Divider,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import './App.css';

function TodoApp() {
  // Load tasks from localStorage or initialize an empty array
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(storedTasks);

  // Input field for adding tasks and its value state
  const [taskInput, setTaskInput] = useState('');

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task to the list
  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { text: taskInput, done: false }]);
      setTaskInput('');
    }
  };

  // Handle changes in the task input field
  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  // Handle key press events in the task input field (Enter key to add a task)
  const handleTaskInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Remove a task from the list
  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  // Toggle the "done" state of a task
  const toggleTaskDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;

    // Move completed task to the end of the list
    if (newTasks[index].done) {
      const [completedTask] = newTasks.splice(index, 1);
      newTasks.push(completedTask);
    }

    setTasks(newTasks);
  };

  return (
    <Container maxWidth="sm" style={{backgroundColor: ";lightblue"}}>
      <Paper elevation={3} 
            style={{ padding: '16px', marginTop: "60px"}}>
        <Typography variant="h5" gutterBottom>
          Todo List
        </Typography>
        {/* Task input field */}
        <TextField
          label="Add a task"
          fullWidth
          variant="outlined"
          value={taskInput}
          onChange={handleTaskInputChange}
          onKeyPress={handleTaskInputKeyPress} // Listen for Enter key press
        />
        {/* Add Task button */}
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          style={{ marginTop: '16px' }}
        >
          Add Task
        </Button>
        {/* List of tasks */}
        <List style={{ marginTop: '16px' }}>
          {tasks.map((task, index) => (
            <div key={index}>
            {index > 0 && <Divider />} {/* Add a divider between tasks */}
            <ListItem key={index}>
              {/* Checkbox to mark a task as done */}
              <Checkbox
                checked={task.done}
                onChange={() => toggleTaskDone(index)}
              />
              {/* Display task text with or without strikethrough */}
              <ListItemText
                primary={task.text}
                style={{ textDecoration: task.done ? 'line-through' : 'none' }}
              />
              {/* Button to delete a task */}
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeTask(index)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            </div>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default TodoApp;
