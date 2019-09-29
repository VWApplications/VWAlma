import React from 'react';
import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';
import Sidebar from './Sidebar';
import { Space } from '../styles/breadcrumb';

export const Main = ({ children, navigation, menu }) => (
    <main>
        <Navbar />
        <Breadcrumb navigation={navigation} />

        <div className="row">
            <Space />
            <div className="col-sm-2" style={{"paddingLeft": 0}}>
                <Sidebar menu={menu} />
            </div>

            <div className="col-sm-10">
                <div className="container-fluid">
                    {children}
                </div>
            </div>
        </div>
    </main>
)

export default Main;