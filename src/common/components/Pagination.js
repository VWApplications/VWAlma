import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';

class CustomPagination extends Component {

	__handlePagination(page) {
		const { dispatch, listObjectAction } = this.props;
		const queryString = "page=" + page;
		dispatch(listObjectAction(page, queryString))
	}

	render() {
		const { pagination } = this.props;

		return (
			<div className="text-center">
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
			</div>
		);
	}
}

export default connect()(CustomPagination);