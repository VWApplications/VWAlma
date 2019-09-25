import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'common/components/Navbar';
import Parallax from './Parallax';
import Features from './Features';

class Home extends Component {
    render() {
      	return (
			<div>
				<header>
					<Navbar />
				</header>
				<main>
					<Parallax />
					<Features />
				</main>
			</div>
		)
  	}
}

export default connect()(Home);