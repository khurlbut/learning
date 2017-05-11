import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
In this step we add user interaction to the app. We create
event handlers in the FilterableProductTable which invoke
setState() to perform the state mutations.

The event handlers are then passed into the SearchBar
where they are invoked when the SearchBar detects user
input.

In effect, the SearchBar is "passing up" state changes
to the FilterableProductTable. This is known as "inverse
data flow".

User actions are maintianed as 'state'.

The data model is maintained in 'props'.
*/
class ProductCategoryRow extends React.Component {
	render() {
		return <tr><th colSpan="2">{this.props.category}</th></tr>;
	}
}

class ProductRow extends React.Component {
	render() {
		var name = this.props.product.stocked ?
			this.props.product.name :
			<span style={{color: 'red'}}>
				{this.props.product.name}
			</span>;
		return (
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		);
	}
}

class ProductTable extends React.Component {
	render() {
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach((product) => {
			if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
				return;
			}			
			if (product.category !== lastCategory) {
				rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
			}
			rows.push(<ProductRow product={product} key={product.name} />);
			lastCategory = product.category;
		});
		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		/*
		Here we define event handlers to detect user input.
		*/
		this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
		this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
	}

	/*
	These event handlers invoke the state changing callback
	functions which have been passed in from the caller 
	(FilterableProductTable) as properties.
	*/
	handleFilterTextInputChange(e) {
		this.props.onFilterTextInput(e.target.value);
	}

	handleInStockInputChange(e) {
		this.props.onInStockInput(e.target.checked);
	}

	render() {
		return (
			<form>
				<input 
				  	type="text" 
				  	placeholder="Search..." 
				  	value={this.props.filterText} 
				  	onChange={this.handleFilterTextInputChange} />
				<p>
					<input 
						type="checkbox" 
						checked={this.props.inStockOnly} 
						onChange={this.handleInStockInputChange} />
					{' '}
					Only show products in stock
				</p>
			</form>
		);
	}
}

class FilterableProductTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			inStockOnly: false
		}
		/*
		Here we define the state changing event handlers.
		*/
		this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
		this.handleInStockInput = this.handleInStockInput.bind(this);
	}

	/*
	These handlers invoke the setState() method to modify the current
	state of the application.
	*/
	handleFilterTextInput(filterText) {
		this.setState({
			filterText: filterText
		});
	}

	handleInStockInput(inStockOnly) {
		this.setState({
			inStockOnly: inStockOnly
		});
	}

	/*
	Notice that the SearchBar is sending the state mutating callback
	functions to the SearchBar as properties.

	See Properties:
		onFilterTextInput
		onInStockInput
	*/
	render() {
		return (
			<div>
				<SearchBar 
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					onFilterTextInput={this.handleFilterTextInput} 
					onInStockInput={this.handleInStockInput} />
				<ProductTable 
					products={this.props.products} 
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly} />
			</div>
		);
	}
}

var PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(
	<FilterableProductTable products={PRODUCTS} />,
  	document.getElementById('container')
);
