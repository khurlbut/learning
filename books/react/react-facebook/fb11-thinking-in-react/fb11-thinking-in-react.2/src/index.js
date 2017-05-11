import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
In this step we add state to the static model we built 
in the previous step. Note that in this stage we only 
pass the data "downstream".  User actions are ignored.
We will add user interaction in the next step.

The state is initialized in the constructor of
FilterableProductTable and is passed down to the 
SearchBar and the ProductTable.

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

/*
I needed to change the structure of the forEach loop.
If you look at step 1 (static model) you will notice that
it does not use an arrow function.

When I used the original forEach 'this' was undefined inside
the loop. It is not exactly clear to my why, but I'm more
comfortable with the arrow function anyway.

I think I read someplace that one of the benefits of arrow
functions is that they handle the crazy "this/that" thing
from original JS in a more intuitive way...that could be
what I saw here.
*/
class ProductTable extends React.Component {
	render() {
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach((product) => {
			
			/*
			Use the STATE of the filterText and inStockOnly props to filter the products for display.
			*/
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
	/*
	Pull the STATE values from the PROPS for display
	*/
	render() {
		return (
			<form>
				<input 
				  	type="text" 
				  	placeholder="Search..." 
				  	value={this.props.filterText} />
				<p>
					<input 
						type="checkbox" 
						checked={this.props.inStockOnly} />
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

		//Here is where we initialize the STATE.

		this.state = {
			filterText: '',
			inStockOnly: false
		}

	}

		/*
		...and we pass the STATE down to the child
		components as properties.
		*/

	render() {
		return (
			<div>
				<SearchBar 
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly} />
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
