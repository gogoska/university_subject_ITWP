// src/labs/Lab2/Clock.jsx
import React, { Component } from 'react';
import './Lab2.css';

export class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
        this.timer = null;
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ time: new Date() });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer);
    }

    // Преобразует смещение часового пояса из строки "+3:00" в минуты
    parseTimezoneOffset(timezoneStr) {
        if (!timezoneStr) return null; // null = локальный пояс
        const sign = timezoneStr[0] === '-' ? -1 : 1;
        const parts = timezoneStr.slice(1).split(':');
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        return sign * (hours * 60 + minutes);
    }

    getFormattedTime() {
        const { format = '24', timezone } = this.props;
        let now = new Date();

        if (timezone) {
            const localOffset = -now.getTimezoneOffset();
            const targetOffset = this.parseTimezoneOffset(timezone);
            const diffMinutes = targetOffset - localOffset;
            now = new Date(now.getTime() + diffMinutes * 60 * 1000);
        }

        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        if (format === '12') {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${hours}:${minutes}:${seconds} ${ampm}`;
        }
        return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    }

    render() {
        const { format = '24' } = this.props;
        const clockClass = format === '12' ? 'clock clock-12' : 'clock';
        return <div className={clockClass}>{this.getFormattedTime()}</div>;
    }
}