import "./App.css";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckOutPage from "./pages/CheckOutPage";
import CartProvider from "./Providers/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AuthProvider from "./Providers/AuthProvider";
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <Switch>
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckOutPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
