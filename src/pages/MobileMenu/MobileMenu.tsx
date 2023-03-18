import React from "react";
import { Link } from "react-router-dom";

type Props = {
  setMenuIsOpen: (value: boolean) => void,
}

export const MobileMenu: React.FC<Props> = ({ setMenuIsOpen }) => {
  const links = [
    {to: '/home', label: 'Home', id: 1},
    {to: '/phones', label: 'phones', id: 2},
    {to: '/tablets', label: 'tablets', id: 3},
    {to: '/accessories', label: 'accessories', id: 4},
    {to: '/favorites', label: 'favorite', id: 5},
    {to: '/cart', label: 'Cart', id: 6},
  ]

  return (
    <div className="mobile">
      <div className="mobile_header">
        <button
          className="mobile_header_logo"
          onClick={() => setMenuIsOpen(false)}
        >
          <img className="mobile_header_logo_img" src="./img/UI_KIT.svg" alt="Logo" />
        </button>
          <button
            className="mobile_header_button"
            onClick={() => setMenuIsOpen(false)}
          >
            <span className="mobile_header_button_img">
              X
            </span>
          </button>
      </div>

      <div className="mobile_links">
        {links.map(link => (
          <div key={link.id} className='mobile_links_conteiner'>
            <Link
              to={link.to}
              className='mobile_links_conteiner_link'
              onClick={() => setMenuIsOpen(false)}
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}