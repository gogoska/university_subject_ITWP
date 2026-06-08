import { useState, useEffect } from 'react';
import './Style.css';

export function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Загрузка задач из localStorage при монтировании компонента
    useEffect(() => {
        const savedTasks = localStorage.getItem('todoList');
        if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Сохранение задач в localStorage при каждом изменении tasks
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (inputValue.trim() === '') return;
        const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false
        };
        setTasks([...tasks, newTask]);
        setInputValue('');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="todo-container">
        <h1>Мои задачи</h1>
        <div className="input-group">
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Что нужно сделать?"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask}>Добавить</button>
        </div>
        <ul className="todo-list">
            {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
                <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                />
                <span>{task.text}</span>
                <button onClick={() => deleteTask(task.id)}>🗑</button>
            </li>
            ))}
        </ul>
        {tasks.length === 0 && <p className="empty">Нет задач. Добавьте первую!</p>}
        </div>
    );
}