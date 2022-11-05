import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Providers/CartProvider";
import "./cartPage.css";

const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();
  if (!cart.length) {
    return (
      <Layout>
        <main>
          <h2>cart is empty !</h2>
        </main>
      </Layout>
    );
  }
  const incrementHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const decrementHandler = (cartItem) => {
    dispatch({ type: "DECREMENT_PRODUCT", payload: cartItem });
  };
  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => (
              <div className="cartItem">
                <div className="itemImg">
                  <img src={item.image} alt={item.name} />
                </div>
                <div>{item.name}</div>
                <div>{item.offPrice * item.quantity}</div>
                <div></div>
                <div className="btnGroup">
                  <button onClick={() => decrementHandler(item)}>-</button>
                  <button>{item.quantity}</button>
                  <button onClick={() => incrementHandler(item)}>+</button>
                </div>
              </div>
            ))}
          </section>
          <CartSummary />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummary = () => {
  const { cart, total } = useCart();
  const orginalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0)
    : 0;
  return (
    <section className="cartSummary">
      <h2 style={{ marginBottom: "30px" }}>Cart Summary</h2>
      <div className="summaryItem">
        <p>original price:</p>
        <p>{orginalTotalPrice}$</p>
      </div>
      <div className="summaryItem">
        <p>cart discount:</p>
        <p>{orginalTotalPrice - total}$</p>
      </div>
      <hr />
      <div className="summaryItem">
        <p>net price</p>
        <p>{total}$</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button
          className="btn primary"
          style={{ marginTop: "20px", width: "100%" }}
        >
          Go to checkout
        </button>
      </Link>
    </section>
  );
};
