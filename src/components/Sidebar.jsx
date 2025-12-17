import React, { useState } from 'react';
import ContactCard from './ContactCard';

const Sidebar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedNumber, setSelectedNumber] = useState(null);

    const contacts = [
        { id: 1, name: 'Admin 1', number: '6281234567890' },
        { id: 2, name: 'Admin 2', number: '6281234567891' },
        { id: 3, name: 'Admin 3', number: '6281234567892' },
    ];

    const handleSelectContact = (id, number) => {
        setSelectedContact(id);
        setSelectedNumber(number);
    };

    const handleChatClick = () => {
        if (selectedNumber) {
            window.open(`https://wa.me/${selectedNumber}`, '_blank');
        }
    };

    return (
        <div className="sidebar">
            <input
                type="text"
                className="search-input"
                placeholder="Cari member atau konten..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="card">
                <h3 className="card-title">Ingin Bergabung? Chat Disini</h3>

                {contacts.map(contact => (
                    <ContactCard
                        key={contact.id}
                        id={contact.id}
                        name={contact.name}
                        number={contact.number}
                        isSelected={selectedContact === contact.id}
                        onSelect={handleSelectContact}
                    />
                ))}

                <button
                    className="info-bar"
                    id="chatButton"
                    disabled={!selectedContact}
                    onClick={handleChatClick}
                >
                    Chat Sekarang!
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
