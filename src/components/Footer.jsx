import React from 'react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer>
            <div className="footer-nav">
                <a href="#profil">PROFIL</a>
                <span>|</span>
                <a href="#gallery">GALLERY</a>
                <span>|</span>
                <a href="#info">INFO</a>
                <span>|</span>
                <a href="#about">ABOUT</a>
                <span>|</span>
                <a href="#contact">CONTACT US</a>
            </div>
            <button className="footer-button" onClick={scrollToTop}>HOME</button>
        </footer>
    );
};

export default Footer;
