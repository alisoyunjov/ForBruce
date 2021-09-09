import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import { PrivateRoute } from "./components/PrivateRoute";
import Blastn from './pages/Blastn';
import Navbar from './components/Navbar/Navbar';
import About from './components/pages/About';
import Signup from './components/Registration';
import Home from './components/pages/Home';
import Footer from './components/Navbar/Footer';
import OrderInsert from './pages/OrderInsert';
import OrderList from './pages/OrderList';
import OrdersForAdmin from './pages/OrdersForAdmin';
import Tabs from './pages/Tabs';
import FinishedOrders from './pages/FinishedOrders';
import CompanyOrders from './pages/CompanyOrders';
import Vendors from './pages/Vendor';
import { AdminRoute } from "./components/AdminRoute";
import UserHome from './pages/UserHome';
import sentEmail from './pages/sentEmail';
import OrderUpdate from './pages/OrderUpdate';
import Update from './pages/Update';
import Sa2Screen from './pages/Sa2Screen';

class App extends Component {
  render(){  
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>  
            <Route path="/" exact component={Home} />
            <Route path="/Signup" exact component={Signup} />
            <Route path="/sentEmail" exact component={sentEmail}/>
            <PrivateRoute path="/home" exact component={UserHome}/>
            <PrivateRoute path="/blastn" exact component={Blastn}/>
            <PrivateRoute path="/makeOrder" exact component={OrderInsert}/>
            <PrivateRoute path="/viewOrders" exact component={OrderList}/>
            <PrivateRoute path="/allOrders" exact component={CompanyOrders}/>
            <PrivateRoute path="/vendors" exact component={Vendors}/>
            <PrivateRoute path="/order/:id" exact component={Update}/>
            <AdminRoute path="/vendors" exact component={Vendors}/>
            <AdminRoute path="/grant/sa2screen" exact component={Sa2Screen}/>
            <AdminRoute path="/ordersList" exact component={OrdersForAdmin}/>
            <AdminRoute path="/submissions" exact component={Tabs}/>
            <AdminRoute
                    path="/milestone/:id"
                    exact
                    component={Tabs}
                />
            <AdminRoute path="/finishedOrders" exact component={FinishedOrders}/>
            <AdminRoute path="/home" exact component={UserHome}/>
            <AdminRoute
                    path="/orders/update/:id"
                    exact component={OrderUpdate}
                />

          </Switch> 
        </div>
      </Router>
    );
  }  
}

export default App;
