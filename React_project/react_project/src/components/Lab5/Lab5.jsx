import React, { useState } from 'react';
import './Lab5.css';

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        gender: 'male',
    });
    const [contacts, setContacts] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
        if (!formData.email.trim()) {
            newErrors.email = 'Email обязателен';
        } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }
        if (!formData.message.trim()) newErrors.message = 'Сообщение не может быть пустым';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const newContact = {
            id: Date.now(),
            ...formData,
        };
        setContacts([...contacts, newContact]);

        setFormData({
            name: '',
            email: '',
            message: '',
            gender: 'male',
        });
    };

    return (
        <div className="lab5-container">
            <h2>Форма обратной связи</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Имя *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error-input' : ''}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error-input' : ''}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Пол</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                            /> Мужской
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                            /> Женский
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Сообщение *</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? 'error-input' : ''}
                    />
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>

                <button type="submit" className="submit-btn">Отправить</button>
            </form>

            <h3>Список контактов</h3>
            {contacts.length === 0 ? (
                <p>Нет отправленных контактов</p>
            ) : (
                <table className="contacts-table">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Пол</th>
                            <th>Сообщение</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.gender === 'male' ? 'Мужской' : 'Женский'}</td>
                                <td>{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}