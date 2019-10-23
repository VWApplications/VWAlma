import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { errorAlert } from 'common/alerts';
import { hasPermission, isAuthenticated } from 'common/utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { requiredPermission, user, location } = rest;

    if (!isAuthenticated()) {
        errorAlert("Permissão negada!", "Você precisa tá logado para realizar essa ação.");
        return <Redirect to="/login" />;
    }

    if (!hasPermission(requiredPermission, user.permission)) {
        errorAlert("Permissão negada!", "Você não pode realizar essa ação.");
        return <Redirect to="/profile" />;
    }

    if (location.key)
        return <Route {...rest} render={props => <Component {...props} />} />;

    errorAlert("Permissão negada!", "Por favor, não utilize a url como navegação.");
    return <Redirect to="/profile" />;
}

const mapStateToProps = state => {
    const { user } = state.account;
    return { user };
}

export default connect(mapStateToProps)(PrivateRoute);