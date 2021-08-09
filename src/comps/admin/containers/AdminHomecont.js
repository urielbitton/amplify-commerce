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

export default function AdminHomecont() {
 
  const {allProducts, allCoupons, allShipping, allOrders, allCustomers, allReviews,
    allCampaigns, allUsers} = useContext(StoreContext)

  return (
    <div className="adminhomecont">
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
            render={el => <EditProduct el={allProducts.find(x => x.id === el.match.params.prodID)} />}
          />
          <Route path="/admin/store/coupons">
            <Coupons />
          </Route>
          <Route path="/admin/store/add-coupon">
            <EditCoupon />
          </Route>
          <Route path="/admin/store/edit-coupon/:coupID" 
            render={el => <EditCoupon el={allCoupons.find(x => x.id === el.match.params.coupID)} />}
          />
          <Route path="/admin/store/shipping">
            <Shipping />
          </Route>
          <Route path="/admin/store/add-shipping">
            <EditShipping />
          </Route>
          <Route path="/admin/store/edit-shipping/:shipID" 
            render={el => <EditShipping el={allShipping.find(x => x.id === el.match.params.shipID)} />}
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
            render={el => <EditOrder el={allOrders.find(x => x.orderid === el.match.params.ordID)} />}
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
            render={el => <EditCustomer el={allCustomers.find(x => x.id === el.match.params.custID)} />}
          />
          <Route path="/admin/customer/:custID" 
            render={el => <CustomerPage el={allCustomers.find(x => x.id === el.match.params.custID)} />}
          />
          <Route exact path="/admin/customers/reviews">
            <Reviews />
          </Route>
          <Route path="/admin/customers/reviews/:reviewID" 
            render={el => <ReviewPage el={allReviews.find(x => x.id === el.match.params.reviewID)} />}
          />
          <Route exact path="/admin/customers/marketing">
            <Marketing />
          </Route>
          <Route path="/admin/customers/marketing/create-campaign">
            <CreateCampaign />
          </Route>
          <Route path="/admin/customers/marketing/campaign/:campID" 
            render={el => <CampaignPage el={allCampaigns.find(x => x.id === el.match.params.campID)} />}
          />
          <Route path="/admin/customers/marketing/edit-campaign/:campID" 
            render={el => <CreateCampaign el={allCampaigns.find(x => x.id === el.match.params.campID)} />}
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
            render={el => <EditUser el={allUsers.find(x => x.userid === el.match.params.userID)} />}
          />
        </Switch> 
      </div>
    </div> 
  )
}