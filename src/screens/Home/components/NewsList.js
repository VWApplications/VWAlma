import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'common/components/Navbar';

class NewsList extends Component {
    render() {
        const { location } = this.props;

        return (
            <div>
                <Navbar home={location.state.home} />
                <h1>Olaa mundo!!!</h1>
            </div>
        )
    }
}

export default connect()(NewsList);