import React, { useRef } from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Routes from '../routes/Routes'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const Layout = () => {
    const tawkMessengerRef = useRef();
    const onLoad = () => {
        console.log('onLoad works!');
    };
    return (
        <BrowserRouter>
            <Route render={props => (
                <div>
                    <Header {...props}/>
                        <div className="main">
                            <Routes/>
            <TawkMessengerReact
                propertyId="577e1fa8715e087f69eae4f6"
                widgetId="default"
                onLoad={onLoad}
                ref={tawkMessengerRef}
            />
                        </div>
                    <Footer/>
                </div>
            )}/>
            
        </BrowserRouter>
    )
}

export default Layout


