import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Main } from '../styles/home';
import Navbar from 'common/components/Navbar';
import Parallax from './Parallax';
import Features from './Features';
import News from './News';
import Contact from './Contact';
import Footer from './Footer';

class Home extends Component {

    render() {
      	return (
			<Container>
				<Header>
					<Navbar home={true} />
				</Header>
				<Main>
					<Parallax />
					<Features />
					<News />
					<Contact />
				</Main>
				<Footer />
			</Container>
		)
  	}
}

export default connect()(Home);