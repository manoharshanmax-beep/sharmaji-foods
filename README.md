# Sharmaji Foods

The family catering site uses HTML5, CSS and vanilla JavaScript. A serverless Worker serves the pages, calculates final estimates and saves advance booking requests in the bookings table. A booking request requires follow-up by the kitchen.

## Open the website
Extract the ZIP and double-click index.html in the Sharmaji-Foods folder. Keep the public folder next to it for photos, styles and scripts. Browse the menu, change language and try the cart directly. Place Order opens a prepared WhatsApp order to +91 9626750414. Tap Send in WhatsApp. Checkout retains the draft if you return from WhatsApp. Server-backed bookings use the server below. After changing frontend source, run node scripts/export-html.mjs to refresh the double-click pages.

## Run locally
Use Node.js 24. Run `npm run dev` and open http://localhost:5173. The local preview uses SQLite. Run `npm run build && npm test` to verify the site.

## Edit business details
Update `public/config.js` for rupee prices, delivery fees, lead time, phone, WhatsApp, email, pickup address, delivery areas and approved reviews. Use the country code on phone numbers. Each order requires at least 15 chapatis at ₹25 each. One sabji variety is complimentary and each additional variety costs ₹100 per order. Dahi packets are ₹10 and raita portions ₹25. The existing delivery estimate is ₹40. Set samplePrices to false after entering the family's rates. An empty service-area list allows the kitchen to confirm coverage for each request. Reviews accept a customer name and text in English, Tamil and Hindi. Rebuild and redeploy after edits.

## Receive requests
Owner access to the site's database viewer provides the bookings table. Each record contains the customer's contact information, event details, quantities, address, instructions, quoted prices and notification state. The date and time are in India Standard Time. Database records are private.

A configured WhatsApp number enables the receipt's WhatsApp button. The customer sends the prepared message from WhatsApp. To also send the kitchen an automatic SMS on each new request, configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM and OWNER_SMS_NUMBER as private runtime variables. Use an SMS-enabled sender authorized for the destination. Keep credentials out of public/config.js. Test with the owner's consent before customer launch. Accepted means the SMS provider accepted the request. Failed or unconfigured notifications leave the booking available in the database.

## Automatic WhatsApp notifications
For server-backed checkout set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM (approved sender) and TWILIO_WHATSAPP_CONTENT_SID (approved order notification template). The template takes {{1}} for the reference and {{2}} for the single-line order summary. Delivery goes to the business WhatsApp number in public/config.js. An accepted API request suppresses the automatic chat handoff. With these values unset, or if the API rejects the request, checkout opens the customer’s WhatsApp draft instead.
