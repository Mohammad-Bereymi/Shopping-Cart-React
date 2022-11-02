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
                <div>{item.price * item.quantity}</div>
                <div></div>
                <div>
                  <button onClick={() => decrementHandler(item)}>
                    Decrement
                  </button>
                  <button>{item.quantity}</button>
                  <button onClick={() => incrementHandler(item)}>Add</button>
                </div>
              </div>
            ))}
          </section>
          <section className="cartSummary">
            <h2>Cart Summary</h2>
            <div>{total} $</div>
          </section>
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;
