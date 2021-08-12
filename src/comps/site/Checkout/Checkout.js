import React, { useContext, useEffect, useState } from "react";
import PageBanner from "../common/PageBanner";
import { StoreContext } from "../../common/StoreContext";
import "./styles/Checkout.css";
import { Link, useHistory } from "react-router-dom";
import { AppInput } from "../../common/AppInputs";
import CheckoutItem from "./CheckoutItem";
import AppButton from "../common/AppButton";
import { PayPalButton } from "react-paypal-button-v2";
import CreateOrder from "./CreateOrder";
import { db } from "../../common/Fire";
import AddressBox from "../client/AddressBox";
import ProvinceCountry from "../../common/ProvinceCountry";
import AppAccordion from "../common/AppAccordion";

export default function Checkout() {
  const {showCart, setShowCart, billingState, setBillingState, shippingState, setShippingState,
    myUser, cartSubtotal, currencyFormat, percentFormat, shippingMethods, paymentMethods, 
    provinceChoices, taxRate, allProducts } = useContext(StoreContext);
  const [chosenShipping, setChosenShipping] = useState({name: "regular", cost: 3.99});
  const [paymentDetails, setPaymentDetails] = useState({method: "stripe", email: "", cardnumber: ""});
  const [successPaid, setSuccessPaid] = useState(false);
  const [failPaid, setFailPaid] = useState(false);
  const [paySwitch, setPaySwitch] = useState(0);
  const [defaultForm, setDefaultForm] = useState(false);
  const [altShipAddress, setAltShipAddress] = useState(false);
  const orderTotal = cartSubtotal + cartSubtotal * taxRate + chosenShipping.cost
  const clientid = "ASTQpkv9Y3mQ5-YBd20q0jMb9-SJr_TvUl_nhXu5h3C7xl0wumYgdqpSYIL6Vd__56oB7Slag0n2HA_r"
  const history = useHistory();
  const primaryAddress = myUser?.addresses?.find((x) => x.primary)

  const inputFieldsArr = [
    { title: "First Name *", name: "fname", halfwidth: true },
    { title: "Last Name *", name: "lname", halfwidth: true },
    { title: "Company Name", name: "company" },
    { title: "Street Address *", name: "address" },
    { title: "Apartment/Unit", name: "aptunit" },
    { title: "City *", name: "city" },
    { title: "Postal Code/ZIP *", name: "postcode" },
    { title: "Phone Number *", name: "phone" },
    { title: "Email Address *", name: "email" }
  ];
  const billingInputs = inputFieldsArr?.map(({ title, name, halfwidth }) => {
    return (
      <AppInput
        title={title}
        name={name}
        onChange={(e) => handleChange(e, 'bill')}
        className={halfwidth ? "halfwidth" : ""}
      />
    );
  });
  const shippingInputs = inputFieldsArr?.map(({ title, name, halfwidth }) => {
    return (
      <AppInput
        title={title}
        name={name}
        onChange={(e) => handleChange(e, 'ship')}
        className={halfwidth ? "halfwidth" : ""}
      />
    );
  });
  const caritemrows = myUser?.cart?.map((el) => {
    return <CheckoutItem el={el} key={el.id} />;
  });
  const shipoptions = shippingMethods?.map(
    ({ name, price, value, defaultvalue }, i) => {
      return (
        <AppInput
          type="radio"
          title={
            <>
              {name} <span>{`(${currencyFormat.format(price)})`}</span>
            </>
          }
          name="shippingmethod"
          onChange={() => setChosenShipping({ name: value, cost: price })}
          value={chosenShipping}
          defaultChecked={defaultvalue}
          key={i}
        />
      );
    }
  );
  const paymentInputs = paymentMethods.map(
    ({ name, value, img, defaultValue }, i) => {
      return (
        <div className="paymentitem" key={i}>
          <AppInput
            type="radio"
            title={name}
            name="paymentmethod"
            onChange={(e) => {
              setPaymentDetails({
                method: "paypal",
                email: "urielas1@gmail.com",
                cardnumber: ""
              });
              setPaySwitch(i);
            }}
            value={value}
            defaultChecked={defaultValue}
          />
          <img src={img} alt={name} />
        </div>
      );
    }
  );
  const addressboxrow = myUser?.addresses
    ?.filter((x) => x.primary)
    .map((el) => {
      return <AddressBox el={el} showAddCont={false} />;
    });

  function handleChange(event, choice) {
    const { name, value } = event.target;
    if(choice === 'bill') {
      setBillingState((prev) => ({
        ...prev,
        [name]: value
      }));
    }
    else {
      setShippingState((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }  
  function allowOrder() {
    if(billingState.fname &&  billingState.lname && billingState.address && billingState.city && 
      (provinceChoices.length?billingState.provstate:true) && billingState.country && billingState.postcode
      && billingState.phone && billingState.email) {
      return true
    }
    else return false
  }
  function placeOrder() {
    if (allowOrder()) {
      //display stripe to pay with cc
      startOrder()
    }
    else 
      window.alert("Please fill in all billing details to proceed.");
  }
  function startOrder() {
    const orderid = db.collection("orders").doc().id;
    const orderNum = `${db.collection('orders').doc().id.slice(0,3)}-${db.collection('orders').doc().id.slice(0,7)}`
    const customer = {
      id: myUser.userid,
      name: myUser.fullname,
      email: myUser.email,
      phone: myUser.phone,
      profimg: myUser.profimg,
      city: myUser.city,
      country: myUser.country,
      provstate: myUser.provstate
    };
    CreateOrder(
      orderid,
      orderNum,
      customer,
      cartSubtotal,
      orderTotal,
      chosenShipping,
      paymentDetails,
      taxRate,
      billingState,
      shippingState,
      myUser,
      allProducts
    );
    setBillingState({});
    history.push("/order-confirm");
  }

  useEffect(() => {
    showCart && setShowCart(false);
  }, []);
  useEffect(() => {
    setDefaultForm(myUser?.addresses?.length > 0);
    setBillingState(
      myUser?.addresses?.length
        ?primaryAddress
          ?primaryAddress
          :myUser?.addresses[0]
        :billingState
    )
  }, [myUser]);
  useEffect(() => {
    if(!defaultForm) {
      setBillingState({})
    }
    else {
      setBillingState(
        myUser?.addresses?.length
          ?primaryAddress
            ?primaryAddress
            :myUser?.addresses[0]
          :billingState
      )
    }
  },[defaultForm])

  return (
    <div className="checkoutpage">
      <PageBanner title="Checkout" />
      <div className="grid xgrid">
        {!myUser && (
          <div className="registercont">
            <h6>
              Returning Customer?<Link to="/login">Login Here</Link>
            </h6>
          </div>
        )}
          <div className="checkoutcont">
            <div className="formcont">
              <AppAccordion
                title="Billing Details"
                openDefault
                maxHeight={!defaultForm ? 1100 : 500}
              >
                <form className="checkoutform" onSubmit={(e) => e.preventDefault()} autoComplete>
                  {!defaultForm ? (
                    <>
                      <div style={{ gridColumn: "1/-1" }}>
                        <AppButton
                          title="Use Saved Address"
                          className="defaultformbtn"
                          style={{display: myUser?.addresses?.length?"flex":"none"}}
                          onClick={() => setDefaultForm(prev => !prev)}
                        />
                      </div>
                      {billingInputs.slice(0, 6)}
                      <ProvinceCountry setState={setBillingState} />
                      {billingInputs.slice(6)}
                    </>
                  ) : (
                    <>
                      <div style={{ gridColumn: "1/-1" }}>
                        <AppButton
                          title="Use Default Form"
                          className="defaultformbtn"
                          onClick={() => setDefaultForm(prev => !prev)}
                        />
                      </div>
                      <h4 style={{ gridColumn: "1/-1", fontWeight: "500" }}>
                        My Address
                      </h4>
                      {addressboxrow}
                    </>
                  )}
                  {!myUser?.addresses?.length && (
                    <div>
                      <AppInput
                        title="Create an Account?"
                        type="checkbox"
                        className="checkinput"
                      />
                    </div>
                  )}
                </form>
              </AppAccordion>
              <AppAccordion title="Shipping Details" maxHeight={1100}>
                <div>
                  <AppInput
                    title="Different Shipping Adress"
                    type="checkbox"
                    className="checkinput"
                    onChange={(e) => setAltShipAddress(e.target.checked)}
                    value={altShipAddress}
                  />
                </div>
                {altShipAddress && (
                  <div className="shippingformcont">
                    {shippingInputs.slice(0, 6)}
                    <ProvinceCountry setState={setShippingState} />
                    {shippingInputs.slice(6)}
                  </div>
                )}
                <label className="apptextarea">
                  <h6>Order Notes</h6>
                  <textarea placeholder="Delivery instructions, notes about order..." />
                </label>
              </AppAccordion>
            </div>
            <div className="ordercont">
              <h3 className="titles">Order Details</h3>
              <div className="checkoutrowscont">{caritemrows}</div>
              <div className="cartsubtotal checkoutitem">
                <h5>Order Subtotal</h5>
                <h4>{currencyFormat.format(cartSubtotal)}</h4>
              </div>
              <div className="shipping checkoutitem checkboxitem">
                <h6>
                  <span>Shipping</span>
                </h6>
                <div className="shipoptions">{shipoptions}</div>
              </div>
              <div className="cartsubtotal checkoutitem">
                <h5>Taxes ({percentFormat.format(taxRate)})</h5>
                <span>{currencyFormat.format(cartSubtotal * taxRate)}</span>
              </div>
              <div className="carttotal checkoutitem">
                <h3>Order Total</h3>
                <h3>{currencyFormat.format(orderTotal)}</h3>
              </div>
              <div className="checkoutitem checkboxitem paymentsrow">
                {paymentInputs}
                <div className={`paypalcont ${paySwitch === 1 ? "show" : ""}`}>
                  <PayPalButton
                    amount={0.01}
                    onSuccess={(details, data) => {
                      startOrder();
                      setSuccessPaid(true);
                    }}
                    onError={() => {
                      setFailPaid(true);
                      window.alert(
                        "The transaction was not successful, please try again later."
                      );
                    }}
                    options={{ clientId: clientid }}
                  />
                </div>
              </div>
              <div className="checkoutitem paycont">
                {paySwitch === 0 && (
                  <AppButton
                    title="Place Order"
                    onClick={() => placeOrder()}
                    className={`placeorderbtn ${allowOrder() ? "enabled" : ""}`}
                  />
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
