import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const links = [
    { title: 'Github', link: '/' },
    { title: 'Contacts', link: '/' },
    { title: 'rights', link: '/' },
  ];

  return (
    <div className="footer">
      <Link
        to={'/'}
        className='footer_logo'
      >
        <img
          src="./img/UI_KIT.svg"
          alt="logo"
          className="footer_logo_img"
        />
      </Link>

      <div className="footer_links">
        {links.map(link => (
          <Link
            to={link.link}
            key={link.title}
            className="footer_links_link"
          >
            {link.title}
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="footer_button"
        onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })}
      >
        Back to top
      </button>
    </div>
  );
};
