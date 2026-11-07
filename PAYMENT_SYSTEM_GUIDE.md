# Payment System Guide

## Overview

The payment system has been implemented with a complete cart-to-payment flow using bank transfer as the payment method.

## User Flow

1. **Product Discovery** → User browses products on category pages
2. **Product Details** → User clicks "Buy Now" to view product details
3. **Add to Cart** → User selects quantity and clicks "Add to Cart"
4. **Checkout** → Customer enters their name, phone number, and delivery address
5. **Payment or Quote Request** → Nigerian customers pay the products subtotal plus ₦15,000 shipping; international customers request a shipping quote through WhatsApp
6. **Payment Confirmation** → After transferring, the customer clicks "I've paid — confirm on WhatsApp" to send their customer and order details for confirmation

## Key Features

### 🛒 **Cart Management**
- Add products with quantity selection
- Persistent cart (saved in localStorage)
- Update quantities, remove items
- Clear entire cart
- Real-time total calculation
- ₦15,000 domestic shipping fee included in the cart total
- International shipping quoted on request

### 💳 **Payment Page**
- Bank transfer payment method
- Copy-to-clipboard for bank details
- Order summary with itemized list
- Required customer name, phone number, and delivery address
- WhatsApp message includes customer details, items, shipping, total, and order reference
- International quote request sent through the same WhatsApp contact
- Order ID generation

### 🏦 **Bank Details**
Bank details are configured in `lib/config.ts` and can be overridden with the `NEXT_PUBLIC_BANK_NAME`, `NEXT_PUBLIC_BANK_ACCOUNT`, and `NEXT_PUBLIC_BANK_OWNER` environment variables.

## File Structure

```
├── components/
│   ├── payment-page.tsx          # Main payment page component
│   ├── product-detail-page.tsx   # Updated with cart functionality
│   └── shop-product-card.tsx     # Product cards with Buy Now links
├── app/
│   ├── payment/page.tsx          # Payment page route
│   ├── cart/page.tsx             # Cart review page (updated)
│   └── layout.tsx                # Updated with CartProvider
├── lib/
│   └── cart-context.tsx          # Cart state management
└── PAYMENT_SYSTEM_GUIDE.md       # This guide
```

## How It Works

### 1. Adding Items to Cart
```typescript
// From product detail page
const { addItem } = useCart()

const handleAddToCart = () => {
  addItem({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category
  }, quantity)
  
  router.push('/payment') // Direct to payment
}
```

### 2. Payment Page Features
- **Order Summary**: Shows all cart items with quantities and prices
- **Domestic Shipping**: Adds ₦15,000 to the products subtotal for deliveries within Nigeria
- **International Shipping**: Requires a WhatsApp quote before payment; no unconfirmed shipping fee is included in a transfer total
- **Customer Details**: Requires full name, phone number, and complete delivery address
- **Bank Details**: Copy-to-clipboard functionality for easy transfer
- **Instructions**: Clear payment instructions with order ID
- **WhatsApp Confirmation**: Opens the configured WhatsApp contact with customer, delivery, order, and payment details

### 3. Cart Persistence
- Cart data is saved to localStorage
- Survives browser refresh and sessions
- Automatically loads on app startup

## Customization Options

### Update Bank Details
Edit the defaults in `lib/config.ts`, or set the corresponding public environment variables.

### Add Payment Methods
You can extend the payment page to include:
- Multiple bank accounts
- Mobile money options
- Cryptocurrency payments
- International payment gateways

### Modify User Flow
Current flow: Product → Add to Cart → Payment
Alternative flows you can implement:
- Product → Add to Cart → Cart Review → Payment
- Product → Quick Buy (skip cart)
- Bulk ordering with cart management

## Testing the System

1. **Add Products to Cart**:
   - Visit any product page (e.g., `/product/101`)
   - Select quantity and click "Add to Cart"
   - Should redirect to payment page

2. **Review Cart** (Optional):
   - Visit `/cart` to see all items
   - Test quantity updates and item removal
   - Click "Proceed to Payment"

3. **Payment Process**:
   - Enter full name, phone number, and delivery address
   - Review products subtotal and ₦15,000 Nigeria shipping fee
   - Copy bank details using copy buttons
   - Make bank transfer payment
   - Click "I've paid — confirm on WhatsApp"
   - WhatsApp opens with pre-filled customer and payment confirmation details
4. **International Orders**:
   - Select delivery outside Nigeria and enter the destination country
   - Request a shipping quote through WhatsApp
   - Wait for the confirmed shipping total before making payment

4. **Cart Persistence**:
   - Add items to cart
   - Refresh browser
   - Cart should maintain items

## WhatsApp Integration

### **Payment Confirmation via WhatsApp**
- **WhatsApp Number**: 08070943256
- **Auto-generated Message**: Includes order details, payment amount, and bank details
- **Message Format**:
  ```
  Hello! I have made payment for my order.

  *Customer Details:*
  Full name: Customer Name
  Phone: +234 800 000 0000
  Delivery address: Customer Address, Nigeria

  *Order Details:*
  Order ID: ORD-1234567890
  • Product Name (Qty: 2) — ₦51,000
  
  Products subtotal: ₦51,000
  Shipping: ₦15,000
  *Total amount paid:* ₦66,000
  
  Please confirm receipt of payment and process my order.
  
  Thank you!
  ```

## Integration Notes

- **Currency**: All prices display in NGN (Nigerian Naira)
- **Order IDs**: Auto-generated using timestamp
- **WhatsApp Integration**: Direct payment confirmation via WhatsApp
- **Inventory**: No inventory tracking (can be added later)
- **User Accounts**: No user authentication required

## Future Enhancements

- Email order confirmations
- SMS notifications
- Payment verification webhooks
- Order tracking system
- User account integration
- Inventory management
- Multiple payment gateways