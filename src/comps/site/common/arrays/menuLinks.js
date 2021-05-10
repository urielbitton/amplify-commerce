export default [
  {
    name: 'home',
    url: '/',
    exact: true
  },
  {
    name: 'shop',
    url: '/shop',
    sublinks: [
      {name: 'women',url:'/shop/women'},
      {name: 'men',url:'/shop/men'},
      {name: 'kids',url:'/shop/kids'},
      {name: 'deals',url:'/shop/deals'}
    ]
  },
  {
    name: 'new arrivals',
    url:'/new-arrivals',
    sublinks: [
      {name: 'Collections', url: '/shop/new-arrivals/collections'},
      {name: 'Clothing', url: '/shop/new-arrivals/clothing'},
      {name: 'Accessories', url: '/shop/new-arrivals/accessories'}
    ]
  },
  {
    name: 'about',
    url: '/about'
  },
  {
    name: 'contact',
    url: '/contact'
  }
]