import { NavLink } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="activeLink" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" activeClassName="activeLink">
              Cart
            </NavLink>
          </li>
        </ul>
        <h3>Mehran Shopping</h3>
      </nav>
    </header>
  );
};

export default Navigation;
