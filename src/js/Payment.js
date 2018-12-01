import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Payment extends Component {
  onToken = () => {};

  render() {
    return (
      //     <StripeCheckout
      //     stripeKey="pk_test_tU56gwscooOPPJx1IsrPwrfg"
      //     token={this.onToken}
      //   />

      <StripeCheckout
        amount="500"
        billingAddress
        description="Awesome Product"
        // image="https://yourdomain.tld/images/logo.svg"
        locale="auto"
        // name="YourDomain.tld"
        stripeKey="pk_test_tU56gwscooOPPJx1IsrPwrfg"
        token={this.onToken}
        zipCode
      />
    );
  }
}

export default Payment;
