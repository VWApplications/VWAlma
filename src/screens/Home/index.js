import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
      	return (
			<div>
				Ola mundo!
			</div>
		)
  	}
}

export default connect()(Home);