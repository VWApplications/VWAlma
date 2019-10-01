import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'common/components/Navbar';
import Parallax from './Parallax';
import Features from './Features';
import News from './News';
import Contact from './Contact';
import Footer from './Footer';

class Home extends Component {

    render() {
      	return (
			<div>
				<header>
					<Navbar home={true} />
				</header>
				<main>
					<Parallax />
					<Features />
					<News />
					<Contact />
				</main>
				<Footer />
			</div>
		)
  	}
}

export default connect()(Home);