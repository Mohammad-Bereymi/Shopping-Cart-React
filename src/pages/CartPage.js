import Layout from "../Layout/Layout";
import { useCart } from "../Providers/CartProvider";
import "./cartPage.css";

const CartPage = () => {
  const { cart } = useCart();
  if (!cart.length) {
    return (
      <Layout>
        <main>
          <h2>cart is empty !</h2>
        </main>
      </Layout>
    );
  }
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
                  <button>Remove</button>
                  <button>{item.quantity}</button>
                  <button>Add</button>
                </div>
              </div>
            ))}
          </section>
          <section className="cartSummary">cart summary</section>
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;
