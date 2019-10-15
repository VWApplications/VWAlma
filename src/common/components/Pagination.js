import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { stringify } from 'query-string';
import { Container } from '../styles/pagination';
import { connect } from 'react-redux';

class CustomPagination extends Component {

	__handlePagination(page) {
		const { dispatch, listObjectAction, filters=null } = this.props;
		let queryString = stringify({page});
		if (filters) queryString = stringify({...filters, page});
		dispatch(listObjectAction(page, queryString));
	}

	render() {
		const { pagination } = this.props;

		return (
			<Container>
				<Pagination
					itemsCountPerPage={pagination.itemsCountPerPage}
					totalItemsCount={pagination.totalItemsCount}
					pageRangeDisplayed={pagination.pageRangeDisplayed}
					activePage={pagination.activePage}
					itemClass="page-item"
					innerClass="pagination"
					linkClass="page-link"
					firstPageText="Primeira"
					prevPageText="<<"
					nextPageText=">>"
					lastPageText="Ultima"
					activeLinkClass="text-white"
					onChange={(page) => this.__handlePagination(page)}
				/>
			</Container>
		);
	}
}

export default connect()(CustomPagination);