import React, { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="logo">HOME</div>
            <div className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav id="mainNav" className={isMenuOpen ? 'active' : ''}>
                <a href="#profil" onClick={() => setIsMenuOpen(false)}>PROFIL</a>
                <a href="#gallery" onClick={() => setIsMenuOpen(false)}>GALLERY</a>
                <a href="#info" onClick={() => setIsMenuOpen(false)}>INFO</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>CONTACT US</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            </nav>
        </header>
    );
};

export default Header;
