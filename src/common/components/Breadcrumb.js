import React, { Component } from 'react';

class Breadcrumb extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12 navegation">
                    <ul className="breadcrumb pull-left">
                        <li><button type="button" className="btn btn-link">Perfil</button></li>
                    </ul>

                    <p className="pull-right">
                        Bem Vindo Victor Deon <i className="fa fa-child"></i>
                    </p>
                </div>
            </div>
        )
    }
}

export default Breadcrumb;