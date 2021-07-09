export const menuLinks = [
  {
    name: 'dashboard',
    icon: 'far fa-tachometer-alt-fast',
    url: '/admin/'
  },
  {
    name: 'store',
    icon: 'far fa-store',
    url: '/admin/store/',
    sublinks: [
      {name: 'products', icon: 'far fa-tshirt', url: '/admin/store/products'},
      {name: 'coupons', icon: 'far fa-money-bill', url: '/admin/store/coupons'},
      {name: 'shipping', icon: 'far fa-truck', url: '/admin/store/shipping'},
      {name: 'analytics', icon: 'far fa-chart-bar', url: '/admin/store/analytics'},
    ]
  },
  {
    name: 'orders',
    icon: 'far fa-shopping-bag',
    url: '/admin/orders/',
    sublinks: [
      {name: 'orders', icon: 'far fa-shopping-bag', url: '/admin/orders/', exact:true},
      {name: 'transactions', icon: 'far fa-wallet', url: '/admin/orders/transactions'},
    ]
  },
  {
    name: 'customers',
    icon: 'far fa-user-tag',
    url: '/admin/customers/',
    sublinks: [
      {name: 'customers', icon: 'far fa-user-friends', url: '/admin/customers/', exact: true},
      {name: 'reviews', icon: 'far fa-star-half-alt', url: '/admin/customers/reviews'},
      {name: 'marketing', icon: 'fad fa-mail-bulk', url: '/admin/customers/marketing'},
      {name: 'users', icon: 'far fa-users-cog', url: '/admin/customers/users'},
    ]
  },
  {
    name: 'support',
    icon: 'far fa-question-circle',
    url: '/admin/support/',
    sublinks: [
      {name: 'customer support', icon: 'far fa-user-headset', url: '/admin/support/customer-support'},
      {name: 'admin support', icon: 'far fa-question-circle', url: '/admin/support/admin-support'},
    ]
  },
  {
    name: 'settings',
    icon: 'far fa-cog',
    url: '/admin/settings/',
    sublinks: [
      {name: 'general', icon: 'far fa-sliders-h', url: '/admin/settings/general'},
      {name: 'appearance', icon: 'far fa-palette', url: '/admin/settings/appearance'},
      {name: 'store', icon: 'far fa-store-alt', url: '/admin/settings/store'},
      {name: 'account', icon: 'far fa-user-circle', url: '/admin/settings/account'},
      {name: 'users', icon: 'far fa-user-friends', url: '/admin/settings/users'}
    ]
  },
] 