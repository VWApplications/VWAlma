import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FilterItem, FilterStyled, FilterLink } from '../styles/filter';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: "fa-chevron-down",
            open: false,
            title: this.props.filterTitle
        }
    }

    __changeIcon() {
        if (this.state.open)
            this.setState({ icon: "fa-chevron-down", open: false });
        else
            this.setState({ icon: "fa-chevron-up", open: true });
    }

    __filterClick(value, title) {
        const { filterSubmit, filterTitle } = this.props;
        this.__changeIcon();
        if (value) {
            this.setState({ title: `Ordenado por ${title}` });
            filterSubmit(value);
        } else {
            this.setState({ title: filterTitle });
        }
    }

    render() {
        const { filterList } = this.props;

        return (
            <FilterStyled icon={this.state.icon} title={this.state.title} onClick={() => this.__changeIcon()}>
                <FilterItem>
                    <FilterLink onClick={() => this.__filterClick(undefined, undefined)}>N/A</FilterLink>
                </FilterItem>
                {filterList.map((item, index) => (
                    <FilterItem key={index}>
                        <FilterLink onClick={() => this.__filterClick(item.value, item.title)}>
                            {item.title}
                        </FilterLink>
                    </FilterItem>
                ))}
            </FilterStyled>
        )
    }
}

export default connect()(Filter);