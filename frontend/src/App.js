import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { loadUser } from "./actions/userAction";
import "./App.css";
import Dashboard from "./components/admin/Dashboard";
import NewProduct from "./components/admin/NewProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from './components/admin/ProcessOrder';
import ProductList from './components/admin/ProductList';
import ProductReviews from './components/admin/ProductReviews';
import UpdateProduct from "./components/admin/UpdateProduct";
import UpdateUser from './components/admin/UpdateUser';
import UsersList from './components/admin/UsersList';
import Cart from "./components/cart/Cart";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import Payment from "./components/cart/Payment";
import Shipping from "./components/cart/Shipping";
import Home from "./components/home/Home";
import About from './components/layout/about/About';
import Contact from './components/layout/contact/Contact';
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header.js";
import UserOptions from "./components/layout/header/UserOptions";
import NotFound from "./components/layout/notfound/NotFound";
import MyOrders from './components/order/MyOrders';
import OrderDetails from "./components/order/OrderDetails";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import ProtectedRoute from "./components/route/ProtectedRoute";
import ForgotPassword from "./components/user/ForgotPassword";
import LoginSignUp from "./components/user/LoginSignUp";
import Profile from "./components/user/Profile";
import ResetPassword from "./components/user/ResetPassword";
import UpdatePassword from "./components/user/UpdatePassword";
import UpdateProfile from "./components/user/UpdateProfile";
import store from "./store";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}



          <Switch>

          
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/about" component={About} />
      <Route path="/products/:keyword" component={Products} />

      <Route exact path="/search" component={Search} />



      <ProtectedRoute exact path="/account" component={Profile} />

      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />

      <Route exact path="/password/forgot" component={ForgotPassword} />

      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Route exact path="/login" component={LoginSignUp} />

      <Route exact path="/cart" component={Cart} />

      <ProtectedRoute exact path="/shipping" component={Shipping} />




     

      <ProtectedRoute exact path="/success" component={OrderSuccess} />

      <ProtectedRoute exact path="/orders" component={MyOrders} />


     
     <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

<ProtectedRoute exact path="/order/:id" component={OrderDetails} />
    

     <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

     <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />

     <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />

     <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />

     <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrderList}
        />

     <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />

     <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={UsersList}
        />

     <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />

     <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={ProductReviews}
        />

        <Route component={ window.location.pathname==='/process/payment'? null :NotFound
        }

        />



</Switch>


      <Footer />
    </Router>
  );
}

export default App;