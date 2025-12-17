import React from 'react';

const MemberGrid = () => {
    const members = [
        { id: 1, name: 'CYBER 01', color: '#ff0055' }, // Neon Red/Pink
        { id: 2, name: 'CYBER 02', color: '#00ffff' }, // Cyan
        { id: 3, name: 'CYBER 03', color: '#39ff14' }, // Neon Green
        { id: 4, name: 'CYBER 04', color: '#ffff00' }, // Neon Yellow
        { id: 5, name: 'CYBER 05', color: '#bc13fe' }, // Neon Purple
        { id: 6, name: 'CYBER 06', color: '#ff5e00' }, // Neon Orange
        { id: 7, name: 'CYBER 07', color: '#0044ff' }, // Electric Blue
        { id: 8, name: 'CYBER 08', color: '#ff0099' }, // Hot Pink
        { id: 9, name: 'CYBER 09', color: '#00ff99' }, // Spring Green
        { id: 10, name: 'CYBER 10', color: '#ccff00' }, // Lime
    ];

    return (
        <div className="member-section">
            <h2 className="section-title">Member Highlight</h2>
            <div className="member-grid">
                {members.map(member => (
                    <div className="member-card-wrapper" key={member.id}>
                        <div
                            className="member-card"
                            style={{
                                '--neon-color': member.color,
                                borderColor: member.color
                            }}
                        >
                            <div className="member-content">
                                <div className="member-avatar" style={{boxShadow: `0 0 15px ${member.color}`}}></div>
                                <div className="member-name">{member.name}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberGrid;
