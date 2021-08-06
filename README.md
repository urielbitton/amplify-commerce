# amplify-commerce
Created React + <3

Features to add: 
- Decrease stock count of purchased products + increase qtySold of product when creating orders thru clients and     admin
- implement trash cans for products, orders, coupons, etc...
- Change all inputs ProvinceCountries to RegionCountry (enhanced) component
- make dashboard stats dynamic
- guest add to cart and checkout features
- add newarrivals, about + contact pages
- To complete integrated payments use stripe and my last DEV bookmark on how to implement with node server
- track site visits through firebase analytics
- add site updates in updates collection (everytime a new product is sold, order is made, customer created, etc.)
  updates show up in admin dashboard
- find way to remove admin id from chat messages
- send email of invoice to customers when they checkout after successful payment
- implement languages features (copy waltr system)

Bugs tracking:
- multiple notifs will stay as long as last notifs

After Development:
- test app
- test security rules
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