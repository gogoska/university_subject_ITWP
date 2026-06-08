import React, { useState } from 'react';
import './Lab4.css';

function ToDoForm({ onAdd }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        onAdd(inputValue.trim());
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Название задачи"
            />
            <button type="submit">Add</button>
        </form>
    );
}

function ToDoItems({ tasks, onToggle }) {
    if (tasks.length === 0) {
        return <p className="empty-message">Нет задач для отображения.</p>;
    }

    return (
        <ul className="todo-items">
            {tasks.map(task => (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                    <label>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggle(task.id)}
                        />
                        <span>{task.name}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
}

export function ToDoList() {
    const [tasks, setTasks] = useState([]);        // все задачи
    const [filter, setFilter] = useState('all');   // 'all', 'completed', 'incomplete'
    const [submitted, setSubmitted] = useState(false); // флаг показа списка

    // Добавление задачи
    const addTask = (taskName) => {
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        // При добавлении новой задачи список пока не показываем до нового Submit
        setSubmitted(false);
    };

    // Переключение статуса задачи (чекбокс)
    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Обработчик кнопки Submit
    const handleSubmit = () => {
        setSubmitted(true);
    };

    // Фильтрация задач
    const getFilteredTasks = () => {
        if (filter === 'completed') return tasks.filter(t => t.completed);
        if (filter === 'incomplete') return tasks.filter(t => !t.completed);
        return tasks;
    };

    const filteredTasks = getFilteredTasks();

    return (
        <div className="todo-container">
            <h2>Мой ToDo-лист</h2>
            <ToDoForm onAdd={addTask} />

            <div className="filter-buttons">
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
                    Все
                </button>
                <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
                    Выполненные
                </button>
                <button onClick={() => setFilter('incomplete')} className={filter === 'incomplete' ? 'active' : ''}>
                    Невыполненные
                </button>
            </div>

            <button onClick={handleSubmit} className="submit-btn">
                Submit
            </button>

            {submitted && (
                <ToDoItems tasks={filteredTasks} onToggle={toggleComplete} />
            )}
        </div>
    );
}