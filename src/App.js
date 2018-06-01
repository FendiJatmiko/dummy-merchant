import React, { PureComponent} from 'react';
import {
  CartComponent,
  ProductComponent,
  CheckoutButtonComponent,
  cartLocalization,
} from 'react-shopping-cart';
import { Button } from 'semantic-ui-react';
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


class App extends PureComponent{

    getTransactionID = (ID) => {
      return ID.message.create.transaction_id
    }

    handleClick = () => {
	 var req_data = {
	 	order_id: "12345",
		total_amount: 2500000,
		currency: "MYR",
		items : [{
			name: "Iphone",
			category: "gadget",
			price: 2500000,
			quantity: 1,
		}],
		customer: {
			first_name: "foo",
			last_name: "bar",
			email: "foobar@mail.com",
			phone: "0987654123456",
		},
		expiry: {
			start_time: "2018-05-26T18:24:34+07:00",
			unit: "minutes",
			duration: 60,
		}
	 }

      fetch("http://localhost:5000/v1/tx/create", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
		  body: JSON.stringify(req_data)
      }).then( (response) => {
        return response.json();
      }).then( (result) => {
        void this.setState({
            data: this.getTransactionID(result)
        })
      //  console.log('parsed json', this.getTransactionID(result))
      })
      .catch( (ex) => {
        console.log('parsing failed', ex)
      })
      console.log(this.state.data)
    }

    // handleResponse = (response) => {
    //   if(!response.ok) {
    //     return Promise.reject(response.statusText);
    //   }
    //     return response.json();
    // }


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
      handleClick,
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
        hidden={false}
        checkoutURL={"http://localhost:5000/user-journey/" + this.state.data}
        currency="GBP"
        getLocalization={getCheckoutButtonLocalization}
        handleClick={this.handleClick}
      />

    return (
      <div className="container">

        <ProductComponent
          {...product}

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
          }
          checkoutButton={
            checkoutButtonElement
          }
          isCartEmpty={
            false
          }
          // getLocalization={getCartLocalization}
        />
        <Button onClick={handleClick}
        > Get transaction_id
        </Button>
        <p>{this.state.data}</p>
      </div>
    );
  }
}

export default App;
