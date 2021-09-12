import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../common/Navbar'
import Dashboard from '../Home/Dashboard'
import './styles/AdminHomecont.css'
import '../../common/styles/ProductTable.css'
import Products from '../Store/Products'
import EditProduct from '../Store/EditProduct'
import { StoreContext } from '../../common/StoreContext'
import Coupons from '../Store/Coupons'
import EditCoupon from '../Store/EditCoupon'
import EditShipping from '../Store/EditShipping'
import Shipping from '../Store/Shipping'
import Orders from '../Orders/Orders'
import EditOrder from '../Orders/EditOrder'
import Transactions from '../Orders/Transactions'
import NotifsCont from '../../common/NotifsCont'
import Analytics from '../Store/Analytics'
import Customers from '../Customers/Customers'
import EditCustomer from '../Customers/EditCustomer'
import Reviews from '../Customers/Reviews'
import ReviewPage from '../Customers/ReviewPage'
import CustomerPage from '../Customers/CustomerPage'
import Marketing from '../Customers/Marketing'
import CreateCampaign from '../Customers/CreateCampaign'
import CampaignPage from '../Customers/CampaignPage'
import CustomerSupport from '../Support/CustomerSupport'
import AdminSupport from '../Support/AdminSupport'
import GeneralSettings from '../Settings/GeneralSettings'
import StoreSettings from '../Settings/StoreSettings'
import AppearanceSettings from '../Settings/AppearanceSettings'
import Users from '../Settings/Users'
import AccountSettings from '../Settings/AccountSettings'
import EditUser from '../Settings/EditUser'
import MissingItem from '../common/MissingItem'
import Subscribers from '../Customers/Subscribers'
import EditSubscriber from '../Customers/EditSubscriber'

export default function AdminHomecont() {
 
  const {allProducts, allCoupons, allShipping, allOrders, allCustomers, allReviews,
    allCampaigns, allUsers, allSubscribers} = useContext(StoreContext)

  return (
    <div className="adminhomecont dark-bg-1">
      <Navbar />
      <NotifsCont />
      <div className="maincontent">
        <Switch>
          <Route exact path="/admin/">
            <Dashboard />
          </Route>
          <Route path="/admin/store/products">
            <Products />
          </Route>
          <Route path="/admin/store/add-product">
            <EditProduct /> 
          </Route>
          <Route path="/admin/store/edit-product/:prodID" 
            render={el => {
            return allProducts.find(x => x.id === el.match.params.prodID)?
              <EditProduct el={allProducts.find(x => x.id === el.match.params.prodID)} />:
              <MissingItem itemName="Product" itemUrl="/admin/store/products"/>
            }}
          />
          <Route path="/admin/store/coupons">
            <Coupons />
          </Route>
          <Route path="/admin/store/add-coupon">
            <EditCoupon />
          </Route>
          <Route path="/admin/store/edit-coupon/:coupID" 
            render={el => {
              return allCoupons.find(x => x.id === el.match.params.coupID)?
              <EditCoupon el={allCoupons.find(x => x.id === el.match.params.coupID)} />:
              <MissingItem itemName="Coupon" itemUrl="/admin/store/coupons"/>
            }}
          />
          <Route path="/admin/store/shipping">
            <Shipping />
          </Route>
          <Route path="/admin/store/add-shipping">
            <EditShipping />
          </Route>
          <Route path="/admin/store/edit-shipping/:shipID" 
            render={el => {
              return allShipping.find(x => x.id === el.match.params.shipID)?
              <EditShipping el={allShipping.find(x => x.id === el.match.params.shipID)} />:
              <MissingItem itemName="Shipping Method" itemUrl="/admin/store/shipping"/>
            }}
          />
          <Route path="/admin/store/analytics">
            <Analytics />
          </Route>
          <Route exact path="/admin/orders">
            <Orders />
          </Route>
          <Route path="/admin/orders/add-order">
            <EditOrder />
          </Route>
          <Route path="/admin/orders/edit-order/:ordID" 
            render={el => {
              return allOrders.find(x => x.orderid === el.match.params.ordID)?
              <EditOrder el={allOrders.find(x => x.orderid === el.match.params.ordID)} />:
              <MissingItem itemName="Order" itemUrl="/admin/orders"/>
            }}
          />
          <Route path="/admin/orders/transactions">
            <Transactions />
          </Route>
          <Route exact path="/admin/customers">
            <Customers />
          </Route>
          <Route exact path="/admin/customers/add-customer">
            <EditCustomer />
          </Route>
          <Route path="/admin/customers/edit-customer/:custID" 
            render={el => {
              return allCustomers.find(x => x.id === el.match.params.custID)?
              <EditCustomer el={allCustomers.find(x => x.id === el.match.params.custID)} />:
              <MissingItem itemName="Customer" itemUrl="/admin/customers"/>
            }}
          />
          <Route path="/admin/customer/:custID" 
            render={el => {
              return allCustomers.find(x => x.id === el.match.params.custID)?
              <CustomerPage el={allCustomers.find(x => x.id === el.match.params.custID)} />:
              <MissingItem itemName="Customer" itemUrl="/admin/customers"/>
            }}
          />
          <Route exact path="/admin/customers/reviews">
            <Reviews />
          </Route>
          <Route path="/admin/customers/reviews/:reviewID" 
            render={el => {
              return allReviews.find(x => x.id === el.match.params.reviewID)?
              <ReviewPage el={allReviews.find(x => x.id === el.match.params.reviewID)} />:
              <MissingItem itemName="Review" itemUrl="/admin/customers/reviews"/>
            }}
          />
          <Route exact path="/admin/customers/marketing">
            <Marketing />
          </Route>
          <Route path="/admin/customers/marketing/create-campaign">
            <CreateCampaign />
          </Route>
          <Route path="/admin/customers/marketing/campaign/:campID" 
            render={el => {
              return allCampaigns.find(x => x.id === el.match.params.campID)?
              <CampaignPage el={allCampaigns.find(x => x.id === el.match.params.campID)} />:
              <MissingItem itemName="Campaign" itemUrl="/admin/customers/marketing"/>
            }}
          />
          <Route path="/admin/customers/marketing/edit-campaign/:campID" 
            render={el => {
              return allCampaigns.find(x => x.id === el.match.params.campID)?
              <CreateCampaign el={allCampaigns.find(x => x.id === el.match.params.campID)} />:
              <MissingItem itemName="Campaign" itemUrl="/admin/customers/marketing"/>
            }}
          />
          <Route path="/admin/support/customer-support">
            <CustomerSupport />
          </Route>
          <Route path="/admin/support/admin-support">
            <AdminSupport />
          </Route>
          <Route path="/admin/settings/general">
            <GeneralSettings />
          </Route>
          <Route path="/admin/settings/store">
            <StoreSettings /> 
          </Route>
          <Route path="/admin/settings/appearance">
            <AppearanceSettings />
          </Route>
          <Route path="/admin/settings/account">
            <AccountSettings />
          </Route>
          <Route exact path="/admin/settings/users">
            <Users />
          </Route>
          <Route path="/admin/settings/users/add-user">
            <EditUser />
          </Route>
          <Route path="/admin/settings/users/edit-user/:userID" 
            render={el => {
              return allUsers.find(x => x.userid === el.match.params.userID)?
              <EditUser el={allUsers.find(x => x.userid === el.match.params.userID)} />:
              <MissingItem itemName="User" itemUrl="/admin/settings/users"/>
            }}
          />
          <Route path="/admin/customers/subscribers">
            <Subscribers />
          </Route>
          <Route path="/admin/customers/edit-subscriber/:subID" 
            render={el => {
              return allSubscribers.find(x => x.id === el.match.params.subID)?
              <EditSubscriber el={allSubscribers.find(x => x.id === el.match.params.subID)} />:
              <MissingItem itemName="Subscriber" itemUrl="/admin/customers/subscribers"/>
            }}
          />
          <Route path="/admin/customers/add-subscriber">
            <EditSubscriber />
          </Route>
        </Switch> 
      </div>
    </div> 
  )
}