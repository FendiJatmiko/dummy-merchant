import React, { PureComponent } from 'react';
import {
  CartComponent,
  ProductComponent,
  CheckoutButtonComponent,
  cartLocalization,
} from 'react-shopping-cart';

import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css/animate.min.css';
import 'font-awesome/css/font-awesome.min.css';

const { getDefaultLocalization } = cartLocalization;

// You may take localization object from wherever you want, that's just an example
// For more information, see localization section
const iPadCaseLocalization = {
  color: 'Color',
  iPadCase: 'iPad case',
  red: 'Red',
  green: 'Green',
  yellow: 'Yellow',
  GBP: '£',
  EUR: '€',
  USD: '$',
};

class App extends PureComponent {
  //   constructor(props){
  //     super(props);
  //   this.state = {
  //     transaction_id: []
  //   }
  // }
  
  componentDidMount(){
    this.handleClick();
  }
  
    handleClick = () => {
      fetch("http://localhost:5001/v1/user-journey", {
        method: "POST",
        headers: { "Content-Type" : "application/json" }
      })
      .then(function(response) {
        if (response.status >= 400){
          throw new Error("Something went wrong from the server");
        }
        return response.json();
      })
      .then(data => {
        if (data === "success" ) {
          this.refs.msg.show("Some Success Text or component", {
            time: 2000,
            type: "success"
          });
        }
        this.setState({transaction_id: data})
        // transaction_id: data
        console.log(data)
      })
      .catch(function(err) {
        console.log(err);
      });
      console.log("this is the transaction_id", this.transaction_id);
    }
  
  
  state = {
    products: {},
    product: {
      name: 'iPadCase',
      id: 'ipad-case',
      path: '/shop/ipad-case/',
      properties: {
        color: ['red', 'green', {
          additionalCost: {
            GBP: 1,
            EUR: 2,
            USD: 3.50,
          },
          value: 'yellow',
        }],
      },
      propertiesToShowInCart: ['color'],
      prices: { GBP: 70, EUR: 80, USD: 90 },
      currency: 'GBP',
      imageSrc: '1-483x321.jpeg',
    },
    getProductLocalization:
      getDefaultLocalization(
        'product',
        'en',
        {
          ...iPadCaseLocalization,
        }
      ),
    getCheckoutButtonLocalization:
      getDefaultLocalization(
        'checkoutButton',
        'en',
        iPadCaseLocalization,
      ),
    getCartLocalization:
      getDefaultLocalization(
        'cart',
        'en',
        iPadCaseLocalization
      )
  };

  addProduct = (key, product, currency) =>
    void this.setState(
      (
        {
          products:
            {
              [key]: cartProduct = { quantity: 0 },
              ...restOfProducts
            }
        }
      ) => ({
        products: {
          ...restOfProducts,
          [key]: {
            ...product,
            quantity:
              product.quantity +
              cartProduct.quantity,
          }
        }
      })
    );

  generateProductKey = (id, properties) =>
    `${id}/${Object.entries(properties).join('_')}`;

  updateProduct = (key, updatedProduct) => void console.log(':)');

  removeProduct = key => void console.log(':C');
  
  
  handleNext = (ev) => {
    if (ev.keyCode === 13) {
        console.log('Enter!');
    }
}

  render() {

    const {
      addProduct,
      generateProductKey,
      updateProduct,
      removeProduct,
      state,
    } = this;

    const {
      getProductLocalization,
      getCheckoutButtonLocalization,
      getCartLocalization,
      products,
      product,
    } = state;
    
    const checkoutButtonElement =
      <CheckoutButtonComponent
        grandTotal={500}
        // onClick={this.handleClick}
        hidden={false}
        checkoutURL="http://localhost:3000/user-journey"
        currency="GBP"
        getLocalization={getCheckoutButtonLocalization}
      />;
    return (
      <div className="container">
        <ProductComponent
          {...product}
          checkoutButton={checkoutButtonElement}
          onAddProduct={
            addProduct
            // Help product to get into the cart
          }
          generateProductKey={
            generateProductKey
                    // create product key as you wish
          }
          getLocalization={getProductLocalization}
        />


        <CartComponent
          products={
            products
            // Provide your own product's Object(Look at Products)
          }
          onUpdateProduct={
            updateProduct
            // Update something
          }
          getLocalization={
            getCartLocalization
          }
          currency="GBP"
          onRemoveProduct={
            removeProduct
            // Remove something
          }
          checkoutButton={
            checkoutButtonElement
          }
          isCartEmpty={
            false
          }
          getLocalization={getCartLocalization}
        />
      </div>
    );
  }
}

export default App;