import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'common/components/Navbar';

class Home extends Component {
    render() {
      	return (
			<div>
				<Navbar />
			</div>
		)
  	}
}

export default connect()(Home);