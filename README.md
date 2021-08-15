# amplify-commerce

V1 Features to add: 
- fix chat "read" bug (should update to read only if not same id AND clicked on chat)
- find way to remove admin id from chat messages
- fix dark mode classes for optimization
- send email of invoice to customers when they checkout after successful payment
- send email to admin everytime: an order is made, user is created, order delayed, etc.
- implement password reset pages + features for clients
- add ?. by every iterated function call so no pages in app crash when undefined.
- implement languages features for site (copy waltr system)
- paginate all long collections to limit firebase fetches
- change colorConverter + sizeConverter switches for a function that will convert the size's value to its name
- implement full searching accross admin (especially settings)
- remove and fix all console warnings (add keys in maps, firebase rules permissions errors, etc.)
- make entire site + admin responsive
- color code updates icons
- add all info conts in admin pages (like infoCustomer when info icon click in table rows)
- fix issue with loader when no user on admin & login pages
- swap shipping methods in checkout for ones in the DB
- implement trash cans for products, orders, coupons, etc...
- let customers in account orders: change shipping, edit order, cancel order, cancel specific products.
- detect with LS if user has used site before, if yes make profile icon redirect to login page, else redirect to create account page
- add newarrivals, about + contact pages
- check if products have enough stock when customer checks out on site + admin
- guest add to cart and checkout features with LS - fix LS bug (if enabled)
- implement firebase admin sdk (to manage users: firebase.google.com/docs/auth/admin/manage-users)
- implement algolia search to search db instead of local searches where applicable
***- Go back and trace entire app to make sure to add all missing features (like searches, sorts, etc)

V2 Features to add
- create custom charts feature in analytics
- implement languages features for admin 
- track site visits through firebase analytics
- To complete integrated payments use stripe and my last DEV bookmark on how to implement with node server
- manage users with firebase admin sdk

Bugs tracking:


After Development:
- test app
- test all security rules
- limit firebase fetches using limit()
- fix localStorage bug

Tips:

- implement stripe payments without server: 
https://medium.com/startup-grind/use-stripe-without-a-back-end-server-in-less-than-5-minutes-d96f9883c51a
- Useful firebase tips: 
https://www.youtube.com/watch?v=iWEgpdVSZyg
- Firebase querying/filtering examples: 
https://softauthor.com/firestore-querying-filtering-data-for-web/#order-limit-firestore-query
- Send emails with SendGrid + nodemailer: 
https://medium.com/swlh/send-email-with-node-js-from-react-website-using-nodemailer-and-sendgrid-2d2e54545a1a