import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { BreadcrumbStyled, BreadLink, Container, Welcome } from '../styles/breadcrumb';

class Breadcrumb extends Component {

    __redirect(url, state) {
        const { dispatch } = this.props;
        dispatch(push(url, state));
    }

    render() {
        const { account, navigation } = this.props;

        return (
            <Container>
                    <BreadcrumbStyled>
                        {navigation.map((item, index) => (
                            <BreadLink key={index} onClick={() => this.__redirect(item.url, item.state)}>{item.title}</BreadLink>
                        ))}
                    </BreadcrumbStyled>

                    <Welcome>{account.user.short_name}</Welcome>
            </Container>
        )
    }
}

const MapStateToProps = state => {
    const { user } = state.account;
    return { account: user };
}

export default connect(MapStateToProps)(Breadcrumb);