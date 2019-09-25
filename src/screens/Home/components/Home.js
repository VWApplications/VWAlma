import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'common/components/Navbar';
import Parallax from './Parallax';
import Features from './Features';
import News from './News';
import Contact from './Contact';

class Home extends Component {

	__submit(data) {
        const { dispatch } = this.props;
        console.log(data);
	}

    render() {
      	return (
			<div>
				<header>
					<Navbar />
				</header>
				<main>
					<Parallax />
					<Features />
					<News />
					<Contact onSubmit={data => this.__submit(data)} />
				</main>
			</div>
		)
  	}
}

export default connect()(Home);