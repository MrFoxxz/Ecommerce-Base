import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MainLayout = props => {
    return (
        <div>
            <Header />
            <div className="main">
                {props.children}
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;