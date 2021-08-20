# amplify-commerce

V1 Features to add: 
- add Order View page (model https://i.imgur.com/yW3FVDm.png)
- make entire site + admin responsive
- swap shipping methods in checkout for ones in the DB
- let customers in account orders: change shipping, edit order, cancel order, cancel specific products.
- add newarrivals, about + contact pages
- implement stripe checkout (https://www.youtube.com/watch?v=1r-F3FIONl8)
- check if products have enough stock when customer checks out on site + admin
- send email of invoice (use sendgrid/mailjs - arrange into html design instead of using pdf) to customers when they checkout after successful payment
- send email to admin everytime: an order is made, user is created, order delayed, etc.
- implement password reset pages + features for clients
- add ?. by every iterated function call so no pages in app crash when undefined.
- implement languages features for site (copy waltr system)
- paginate all long collections to limit firebase fetches
- change colorConverter + sizeConverter switches for a function that will convert the size's value to its name
- implement full searching accross admin (especially settings, using algolia)
- remove and fix all console warnings (add keys in maps, firebase rules permissions errors, etc.)
- color code updates icons
- guest add to cart and checkout features with LS - fix LS bug (if enabled)
***- Go back and trace entire app to make sure to add all missing features (like searches, sorts, etc)

Bugs:
- fix issue with loader when no user on admin & login pages

V2 Features to add
- implement trash cans for products, orders, coupons, etc...
- add all info conts in admin pages (like infoCustomer when info icon click in table rows)
- detect with LS if user has used site before, if yes make profile icon redirect to login page, else redirect to create account page
- ask on SO how to keep product updates concurrent
- create custom charts feature in analytics
- implement languages features for admin 
- track site visits through firebase analytics
- To complete integrated payments use stripe and my last DEV bookmark on how to implement with node server
- implement firebase admin sdk (to manage users: firebase.google.com/docs/auth/admin/manage-users)
- deleting a user needs to delete their storage folder 
- allow editing/deleting of individual chat messages (also group by date inside chat window, etc.)

Bugs tracking:
- login after a long time may bug out and needs button click again

After Development:
- test app (send to ppl to test)
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
- useful npm packages: https://javascript.plainenglish.io/45-npm-packages-to-solve-16-react-problems-a9ab18946224