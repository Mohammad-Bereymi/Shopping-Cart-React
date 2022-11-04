import { NavLink } from "react-router-dom";
import "./navigation.css";
import { useCart } from "../../Providers/CartProvider";
import { useAuth } from "../../Providers/AuthProvider";
const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <h3>Mehran Shopping</h3>
          <li>
            <NavLink to="/" activeClassName="activeLink" exact>
              Home
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className="cartLink">
            <NavLink to="/cart" activeClassName="activeLink">
              Cart
            </NavLink>
            <span>{cart.length}</span>
          </li>
          <li>
            <NavLink
              to={userData ? "/profile" : "/login"}
              activeClassName="activeLink"
            >
              {userData ? "profile" : "login/signup"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
