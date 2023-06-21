import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'    
import Catalog from '../pages/Catalog'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Order from '../pages/Order'
import Category from '../pages/Category'
import Contact from '../pages/Contact'
import PageNews from '../pages/PageNews'
import UpdatePassword from '../pages/UpdatePassword'
import ForgotPassword from '../pages/ForgotPassword'
import Checkout from '../pages/Checkout'
import Search from '../pages/Search'
const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/product/:id' component={Product}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/search' component={Search}/>
            <Route path='/category/:id' component={Category}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/order' component={Order}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/pagenews' component={PageNews}/>
            <Route path='/updatepassword' component={UpdatePassword}/>
            <Route path='/forgotpassword' component={ForgotPassword}/>
        </Switch>
    )
}

export default Routes
