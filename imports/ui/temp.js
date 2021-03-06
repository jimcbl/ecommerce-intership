import React, { Component } from "react";
import CartItem from "./Components/CartItem";
import _ from "lodash";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipingpFee: 0,
      total: 0,
      subtotal: 0
    };
  }
  handleCheckOut() {
    if (this.props.user) {
      if (!this.props.user.cart) {
        alert("No product!");
        return;
      }

      Meteor.call(
        "orders.addNew",
        this.props.user.cart,
        this.props.products,
        (err, res) => {
          if (err) {
            alert(err);
          } else {
            alert("Order placed!");
          }
        }
      );
    } else {
      if (!JSON.parse(localStorage.getItem("cart"))) {
        alert("No product!");
        return;
      }
      alert("Please log in!");
    }
  }

  render() {
    const { user, products } = this.props;
    const tempCart = JSON.parse(localStorage.getItem("cart"));
    return (
      <div className="shopping-cart-wrap">
        {user ? (
          <>
            <div className="cart-header">My Bag</div>
            <div className="cart-container">
              <div className="left-wrap">
                  
                <div className="left-header">
                  <p id="product">Product</p>
                  <p>Color</p>
                  <p>Size</p>
                  <p>Quantity</p>
                  <p>Amount</p>
                </div>
                <div className="cart-line" />
                {user.cart ? (
                  // user.cart &&
                  products &&
                  user.cart.map((item, index) => {
                    const product = _.find(products, o => {
                      return o._id.toString() === item.product_id.toString();
                    });
                    return (
                      <CartItem item={item} key={index} product={product} />
                    );
                  })
                ) : (
                  <div className="no-item">No item yet</div>
                )}
              </div>
              <div className="right">
                <div className="header">Total</div>
                <div className="total-wrapper">
                  <div className="total-item">
                    <div className="title">Shipping & Handling:</div>
                    <div className="content">Free</div>
                  </div>
                  <div className="total-item">
                    <div className="title">Total product:</div>
                    <div className="content">
                      {"$" + user &&
                        products &&
                        user.cart &&
                        user.cart.reduce((lst, item) => {
                          const product = _.find(products, o => {
                            return (
                              o._id.toString() === item.product_id.toString()
                            );
                          });
                          return product
                            ? lst + product.price * item.quantity
                            : "";
                        }, 0)}
                    </div>
                  </div>
                  <div className="total-line" />
                  <div className="total-item" id="bold">
                    <div className="title">Subtotal</div>
                    <div className="content">
                      {user.cart
                        ? "$" +
                          (user &&
                            products &&
                            user.cart &&
                            user.cart.reduce((lst, item) => {
                              const product = _.find(products, o => {
                                return (
                                  o._id.toString() ===
                                  item.product_id.toString()
                                );
                              });
                              return product
                                ? lst + product.price * item.quantity
                                : "";
                            }, 0) + this.state.shipingpFee)
                        : "$0"}
                    </div>
                  </div>
                </div>
                <button onClick={this.handleCheckOut.bind(this)}>
                  Check out
                </button>
              </div>
            </div>
          </>
        ) : (
          products &&
          tempCart && (
            <>
              <div className="cart-header">My Bag</div>
              <div className="cart-container">
                <div className="left-wrap">
                  <div className="left-header">
                    <p id="product">Product</p>
                    <p>Color</p>
                    <p>Size</p>
                    <p>Quantity</p>
                    <p>Amount</p>
                  </div>
                  <div className="cart-line" />
                  {tempCart.length ? (
                    tempCart.map((item, index) => {
                      const product = _.find(products, o => {
                        return o._id.toString() === item.product_id.toString();
                      });
                      return (
                        <CartItem item={item} key={index} product={product} />
                      );
                    })
                  ) : (
                    <div className="no-item">No item yet</div>
                  )}
                </div>
                <div className="right">
                  <div className="header">Total</div>
                  <div className="total-wrapper">
                    <div className="total-item">
                      <div className="title">Shipping & Handling:</div>
                      <div className="content">Free</div>
                    </div>
                    <div className="total-item">
                      <div className="title">Total product:</div>
                      <div className="content">
                        {"$" + products &&
                          tempCart &&
                          tempCart.reduce((lst, item) => {
                            const product = _.find(products, o => {
                              return (
                                o._id.toString() === item.product_id.toString()
                              );
                            });
                            return product
                              ? lst + product.price * item.quantity
                              : "";
                          }, 0)}
                      </div>
                    </div>
                    <div className="total-line" />
                    <div className="total-item" id="bold">
                      <div className="title">Subtotal</div>
                      <div className="content">
                        {"$" +
                          parseFloat(
                            products &&
                              tempCart &&
                              tempCart.reduce((lst, item) => {
                                const product = _.find(products, o => {
                                  return (
                                    o._id.toString() ===
                                    item.product_id.toString()
                                  );
                                });
                                return product
                                  ? lst + product.price * item.quantity
                                  : "";
                              }, 0) + this.state.shipingpFee
                          ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button onClick={this.handleCheckOut.bind(this)}>
                    Check out
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </div>
    );
  }
}

export default ShoppingCart;
