import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'    
import Catalog from '../pages/Catalog'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Order from '../pages/Order'
import Contact from '../pages/Contact'
import UpdatePassword from '../pages/UpdatePassword'
import ForgotPassword from '../pages/ForgotPassword'
import Checkout from '../pages/Checkout'
import NewsDetail from '../pages/NewsDetail'
import News from '../pages/News'
import About from '../pages/About'
import TechnovaService from '../pages/TechnovaService'
import Solution from '../pages/Solution'
import UpdateUser from '../pages/UpdateUser'
const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/product/:id' component={Product}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/order' component={Order}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/news/:id' component={NewsDetail}/>
            <Route path='/news' component={News}/>
            <Route path='/about-company/:id' component={About}/>
            <Route path='/technova-service/:id' component={TechnovaService}/>
            <Route path='/solution/:id' component={Solution}/>
            <Route path='/update-password' component={UpdatePassword}/>
            <Route path='/forgot-password' component={ForgotPassword}/>
            <Route path='/update-info' component={UpdateUser}/>
        </Switch>
    )
}

export default Routes
