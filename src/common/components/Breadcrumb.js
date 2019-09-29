import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { BreadcrumbStyled, BreadLink, Container, Welcome } from '../styles/breadcrumb';

class Breadcrumb extends Component {

    __redirect(url) {
        const { dispatch } = this.props;
        dispatch(push(url))
    }

    render() {
        const { user, navigation } = this.props;

        return (
            <Container>
                    <BreadcrumbStyled className="breadcrumb pull-left">
                        {navigation.map(item => (
                            <BreadLink onClick={() => this.__redirect(item.url)}>{item.title}</BreadLink>
                        ))}
                    </BreadcrumbStyled>

                    <Welcome>{user.short_name}</Welcome>
            </Container>
        )
    }
}

const MapStateToProps = state => {
    const { user } = state.account;
    return { user };
}

export default connect(MapStateToProps)(Breadcrumb);