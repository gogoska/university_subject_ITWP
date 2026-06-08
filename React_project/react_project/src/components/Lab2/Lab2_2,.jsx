import React, { useState } from 'react';
import './Lab2.css';

const linksByProfession = {
    разработчик: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Stack Overflow', url: 'https://stackoverflow.com' },
        { label: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
        { label: 'LeetCode', url: 'https://leetcode.com' },
        { label: 'CodePen', url: 'https://codepen.io' },
        { label: 'Dev.to', url: 'https://dev.to' },
        { label: 'React Docs', url: 'https://react.dev' }
    ],
    дизайнер: [
        { label: 'Behance', url: 'https://behance.net' },
        { label: 'Dribbble', url: 'https://dribbble.com' },
        { label: 'Figma', url: 'https://figma.com' },
        { label: 'Adobe Color', url: 'https://color.adobe.com' },
        { label: 'Pinterest', url: 'https://pinterest.com' },
        { label: 'Canva', url: 'https://canva.com' },
        { label: 'Awwwards', url: 'https://awwwards.com' }
    ],
    маркетолог: [
        { label: 'Google Analytics', url: 'https://analytics.google.com' },
        { label: 'Яндекс.Метрика', url: 'https://metrika.yandex.ru' },
        { label: 'SimilarWeb', url: 'https://similarweb.com' },
        { label: 'SEMrush', url: 'https://semrush.com' },
        { label: 'HubSpot', url: 'https://hubspot.com' },
        { label: 'Mailchimp', url: 'https://mailchimp.com' },
        { label: 'Trello', url: 'https://trello.com' }
    ],
    менеджер: [
        { label: 'Trello', url: 'https://trello.com' },
        { label: 'Jira', url: 'https://atlassian.com/software/jira' },
        { label: 'Asana', url: 'https://asana.com' },
        { label: 'Notion', url: 'https://notion.so' },
        { label: 'Slack', url: 'https://slack.com' },
        { label: 'Zoom', url: 'https://zoom.us' },
        { label: 'Monday.com', url: 'https://monday.com' }
    ],
    аналитик: [
        { label: 'Tableau', url: 'https://tableau.com' },
        { label: 'Power BI', url: 'https://powerbi.microsoft.com' },
        { label: 'Google Data Studio', url: 'https://datastudio.google.com' },
        { label: 'Kaggle', url: 'https://kaggle.com' },
        { label: 'Excel', url: 'https://microsoft.com/excel' },
        { label: 'SQL', url: 'https://learnsql.com' },
        { label: 'Python', url: 'https://python.org' }
    ]
};

function ProfessionSelector({ selected, onSelect }) {
    const professions = Object.keys(linksByProfession);
    return (
        <div className="profession-selector">
            <h4>Выберите профессию:</h4>
            {professions.map(prof => (
                <label key={prof} style={{ marginRight: '15px' }}>
                    <input
                        type="radio"
                        name="profession"
                        value={prof}
                        checked={selected === prof}
                        onChange={() => onSelect(prof)}
                    />
                    {prof}
                </label>
            ))}
        </div>
    );
}

function MenuList({ profession }) {
    const links = linksByProfession[profession] || [];
    return (
        <div className="menu-list">
            <h4>Полезные ссылки для {profession}</h4>
            <ul>
                {links.map((item, idx) => (
                    <li key={idx}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function JobMenu() {
    const [profession, setProfession] = useState('разработчик');

    return (
        <div className="job-menu">
            <ProfessionSelector selected={profession} onSelect={setProfession} />
            <MenuList profession={profession} />
        </div>
    );
}