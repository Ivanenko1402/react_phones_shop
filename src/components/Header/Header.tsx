import classNames from "classnames"
import { useState, useContext } from "react"
import { Link, NavLink, useSearchParams } from "react-router-dom"
import { PhoneContext } from "../../utils/PhoneContext"
import { getSearchWith } from "../../utils/searchHelper"

type Props = {
  setMenuIsOpen: (value: boolean) => void,
}

export const Header: React.FC<Props> = ({ setMenuIsOpen }) => {
  const [targetPage, setTargetPage] = useState('/home');
  const { bagPhones, favPhones } = useContext(PhoneContext)
  const [searchParams, setSearchParams] = useSearchParams();

  const inputValue = searchParams.get('query') || '';

  const boolean = targetPage === '/phones'
    || targetPage === '/tablets'
    || targetPage === '/accessories';

  const links = [
    {to: '/', label: 'home', id: 1},
    {to: '/phones', label: 'phones', id: 2},
    {to: '/tablets', label: 'tablets', id: 3},
    {to: '/accessories', label: 'accessories', id: 4},
  ];

  return (
    <div className='header'>
      <div className="header_content">
        <Link
          to={'/'}
          className='header_logo'
        >
          <img
            src="./img/UI_KIT.svg"
            alt="logo"
            className="header_logo_img"
          />
        </Link>
        <div className="header_conteiner">
          <div
            className="header_conteiner_links"
          >
            {links.map(link => (
              <NavLink
                to={link.to}
                key={link.id}
                onClick={() => setTargetPage(link.to)}
                className={({ isActive }) => classNames(
                  'header_conteiner_links_link', {
                    'header_conteiner_links_link-active': isActive,
                  },
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="header_conteiner_buttons">
            <button
              className="header_conteiner_buttons_menu"
              onClick={() => setMenuIsOpen(true)}
            />
            {boolean && (
              <input
                type="search"
                placeholder=""
                value={inputValue}
                onChange={e => setSearchParams(
                  getSearchWith(searchParams, {
                    query: !e.target.value ? null : e.target.value,
                  })
                )}
                className="header_conteiner_buttons_button header_conteiner_buttons_input"
              />
            )}
            <NavLink
              to={'/favorites'}
              className="header_conteiner_buttons_button header_conteiner_buttons_favorite"
              onClick={() => setTargetPage('/favorites')}
            >
              {favPhones.length > 0 && (<div className="header_conteiner_buttons_button-red">
                {favPhones.length}
              </div>)}
            </NavLink>
            <NavLink
              to={'/cart'}
              className="header_conteiner_buttons_button header_conteiner_buttons_cart"
            >
              {bagPhones.length > 0 && (<div className="header_conteiner_buttons_button-red">
                {bagPhones.length}
              </div>)}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}