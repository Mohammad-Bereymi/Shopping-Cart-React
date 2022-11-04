import { NavLink } from "react-router-dom";
import "./navigation.css";
import { useCart } from "../../Providers/CartProvider";
const Navigation = () => {
  const { cart } = useCart();
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
            <NavLink to="/login" activeClassName="activeLink">
              login/singup
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
