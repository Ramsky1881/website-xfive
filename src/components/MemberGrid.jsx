import React from 'react';

const MemberGrid = () => {
    const members = [
        { id: 1, name: 'MEMBER 01', color: '#ff4444' },
        { id: 2, name: 'MEMBER 02', color: '#4444ff' },
        { id: 3, name: 'MEMBER 03', color: '#44ff44' },
        { id: 4, name: 'MEMBER 04', color: '#ffff44' },
        { id: 5, name: 'MEMBER 05', color: '#ff44ff' },
    ];

    return (
        <>
            <h2 className="section-title">Member Highlight</h2>
            <div className="member-grid">
                {members.map(member => (
                    <div className="member-card" key={member.id}>
                        <div className="member-avatar" style={{borderColor: member.color}}></div>
                        <div className="member-name">{member.name}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MemberGrid;
