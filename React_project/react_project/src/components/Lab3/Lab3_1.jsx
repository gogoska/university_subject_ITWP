// src/labs/Lab3/EmailForm.jsx
import React, { useState } from 'react';
import './Lab3.css';

export function EmailForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const validateEmail = (email) => {
        const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setMessage({ text: 'Поле email обязательно для заполнения', type: 'error' });
            return;
        }
        if (!validateEmail(email)) {
            setMessage({ text: 'Введите корректный email (пример: name@domain.com)', type: 'error' });
            return;
        }
        setMessage({ text: 'Письмо успешно отправлено!', type: 'success' });
    };

    return (
        <div className="email-form-container">
            <h3>Подписка на новости</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ivan@example.com"
                        className="email-input"
                    />
                </div>
                <button type="submit" className="submit-btn">Отправить</button>
            </form>
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}