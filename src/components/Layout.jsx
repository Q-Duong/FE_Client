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
                propertyId="6494723894cf5d49dc5f4486"
                widgetId="1h3htsbu1"
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


