// src/labs/Lab3/ProductCatalog.jsx
import React, { useState } from 'react';
import './Lab3.css';

// Исходные данные
const initialProducts = [
    { id: 1, name: 'Ноутбук', price: 1200, quantity: 5 },
    { id: 2, name: 'Мышь', price: 25, quantity: 0 },
    { id: 3, name: 'Клавиатура', price: 85, quantity: 2 },
    { id: 4, name: 'Монитор', price: 350, quantity: 7 },
    { id: 5, name: 'Наушники', price: 55, quantity: 0 },
    { id: 6, name: 'Веб-камера', price: 70, quantity: 1 },
    { id: 7, name: 'Коврик для мыши', price: 15, quantity: 10 },
];

export function ProductCatalog() {
    const [products, setProducts] = useState(initialProducts);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

    const sortedProducts = [...products].sort((a, b) => {
        if (sortConfig.key === 'name') {
            const aVal = a.name.toLowerCase();
            const bVal = b.name.toLowerCase();
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        } else {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        }
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
    const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const getRowClass = (quantity) => {
        if (quantity === 0) return 'zero-quantity';
        if (quantity < 3) return 'low-quantity';
        return '';
    };

    return (
        <div className="catalog-container">
            <h3>Каталог товаров</h3>
            <table className="catalog-table">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('id')}>
                            № строки {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th onClick={() => requestSort('name')}>
                            Название {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th onClick={() => requestSort('price')}>
                            Цена {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th onClick={() => requestSort('quantity')}>
                            Количество {sortConfig.key === 'quantity' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((product, idx) => (
                        <tr key={product.id} className={getRowClass(product.quantity)}>
                            <td>{idx + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price} ₽</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="summary">
                <p>Общее количество товаров: <strong>{totalQuantity}</strong></p>
                <p>Общая стоимость: <strong>{totalValue} ₽</strong></p>
            </div>
        </div>
    );
}