# 🔐 Razorpay Integration Guide - CineBook

## Overview

This document details the complete Razorpay payment integration for the CineBook movie booking application. Razorpay is configured in **test mode** for development and testing.

---

## ✅ What Was Implemented

### Backend Changes

#### 1. **Package Dependency** (`backend/package.json`)

- Added `"razorpay": "^2.7.0"` to dependencies
- Run: `npm install` in backend folder

#### 2. **Environment Variables** (`backend/.env`)

```env
RAZORPAY_KEY_ID=rzp_test_RbJOlkLIJ50Mdi
RAZORPAY_KEY_SECRET=2WrZwQJKNgXiXl933PAfmveE
```

⚠️ **IMPORTANT:** Keep `RAZORPAY_KEY_SECRET` **server-side only**. Never expose to frontend or commit to Git.

#### 3. **New Payment Routes** (`backend/src/routes/payments.js`)

Three new endpoints were added:

##### **POST /api/payments/razorpay/create-order**

- **Purpose:** Create a Razorpay order on the backend
- **Auth:** Required (JWT token)
- **Request Body:**
  ```json
  {
    "bookingId": "65a1b2c3d4e5f6g7h8i9j0k1"
  }
  ```
- **Response:**
  ```json
  {
    "orderId": "order_1234567890abc",
    "amount": 50000,
    "currency": "INR",
    "bookingId": "65a1b2c3d4e5f6g7h8i9j0k1"
  }
  ```

##### **POST /api/payments/razorpay/verify**

- **Purpose:** Verify Razorpay payment signature and confirm booking
- **Auth:** Required (JWT token)
- **Request Body:**
  ```json
  {
    "bookingId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "razorpay_order_id": "order_1234567890abc",
    "razorpay_payment_id": "pay_1234567890abc",
    "razorpay_signature": "signature_hash"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Payment verified successfully",
    "booking": {
      /* booking object */
    }
  }
  ```
- **Security:** Uses HMAC SHA256 signature verification to prevent tampering

##### **POST /api/payments/razorpay/webhook** (Optional)

- **Purpose:** Handle Razorpay webhook events for real-time updates
- **No Auth:** Uses signature-based verification instead
- **Events Handled:**
  - `payment.authorized` → Marks booking as confirmed
  - `payment.captured` → Marks booking as confirmed
  - `payment.failed` → Marks booking as failed

#### 4. **Database Model Update** (`backend/src/models/Booking.js`)

- Added `razorpayOrderId` field to store the Razorpay order ID for reference

---

### Frontend Changes

#### 1. **Environment Configuration** (`frontend/.env.local`)

```env
VITE_API_URL=http://localhost:5034/api
VITE_RAZORPAY_KEY_ID=rzp_test_RbJOlkLIJ50Mdi
```

- Only the **Key ID** (public) is in frontend `.env`
- The **Key Secret** remains on backend only

#### 2. **Checkout Page Implementation** (`frontend/src/pages/CheckoutPage.jsx`)

**Full Razorpay Flow:**

1. User selects "Razorpay (UPI/Wallet)" payment method
2. On checkout, creates a booking first
3. Calls backend `/payments/razorpay/create-order` to create order
4. Loads Razorpay checkout script dynamically
5. Opens Razorpay modal with order details
6. User completes payment in Razorpay modal
7. Success callback verifies signature with backend `/payments/razorpay/verify`
8. Backend confirms booking and returns success
9. User redirected to "My Bookings" page

**Error Handling:**

- Missing env vars: Shows clear error message
- Network failures: Caught and displayed to user
- Payment verification failures: Booking remains unpaid
- Payment cancellation: Booking stays reserved

#### 3. **Example .env File** (`frontend/.env.example`)

- Updated with `VITE_RAZORPAY_KEY_ID` documentation

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 16+
- npm or yarn
- Razorpay test account (free)

### Step 1: Backend Setup

```bash
cd backend
npm install
# .env already contains test keys
npm run dev
```

Backend runs on: `http://localhost:5034`

### Step 2: Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps  # Required due to Stripe/React 19 compatibility
# .env.local already contains test keys
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Step 3: Test Payment Flow

1. Open http://localhost:5173 in browser
2. Browse movies and select seats
3. Click "Checkout"
4. Select **Razorpay** payment method
5. Click **"Pay & Confirm Booking"**
6. Razorpay modal appears
7. Use test card (see test credentials below)
8. Payment successful → Redirected to "My Bookings"

---

## 🧪 Test Credentials

### Test Cards

| Card Type      | Number                | Expiry                   | CVV                      |
| -------------- | --------------------- | ------------------------ | ------------------------ |
| **Visa**       | `4111 1111 1111 1111` | Any future (e.g., 12/25) | Any 3 digits (e.g., 123) |
| **Mastercard** | `5555 5555 5555 4444` | Any future date          | Any 3 digits             |
| **Amex**       | `3782 822463 10005`   | Any future date          | Any 4 digits             |

### Test UPI

- UPI ID: `success@razorpay`

### Test Amount

- Any amount works in test mode (e.g., ₹1, ₹100, ₹500, etc.)

---

## 🔒 Security Checklist

- ✅ Backend validates JWT token on payment endpoints
- ✅ Razorpay signature verified using HMAC SHA256
- ✅ Booking owner verified (user can only pay for their own booking)
- ✅ Amount recalculated server-side (prevents client tampering)
- ✅ `RAZORPAY_KEY_SECRET` stored only on backend `.env`
- ✅ No sensitive keys in frontend `.env`
- ✅ Webhook signature verification for async events
- ✅ All payment modifications logged

---

## 📋 API Endpoint Summary

| Method | Endpoint                              | Auth      | Purpose                  |
| ------ | ------------------------------------- | --------- | ------------------------ |
| POST   | `/api/payments/razorpay/create-order` | JWT       | Create Razorpay order    |
| POST   | `/api/payments/razorpay/verify`       | JWT       | Verify & confirm payment |
| POST   | `/api/payments/razorpay/webhook`      | Signature | Handle webhook events    |

---

## 🐛 Troubleshooting

### Issue: "Authentication key was missing during initialization"

**Solution:**

- Check `VITE_RAZORPAY_KEY_ID` is in `frontend/.env.local`
- Restart frontend dev server: `npm run dev`
- Check browser console (F12) for the actual env value

### Issue: Backend returns 400 "Missing required fields"

**Solution:**

- Ensure bookingId is being sent from frontend
- Check network tab in browser DevTools
- Verify booking exists in database

### Issue: Payment verification fails (signature mismatch)

**Solution:**

- Verify `RAZORPAY_KEY_SECRET` in `backend/.env` is correct
- Check server logs for detailed error
- Ensure no accidental whitespace in env vars

### Issue: "Booking not found" error

**Solution:**

- Verify booking is created before Razorpay order
- Check MongoDB connection
- Ensure user is authenticated (valid JWT token)

---

## 📝 Production Deployment Notes

### Before Going Live:

1. **Get Production Keys**

   - Log in to Razorpay Dashboard
   - Switch from Test mode to Live mode
   - Copy Live Key ID and Key Secret

2. **Update Environment Variables**

   ```env
   # Backend
   RAZORPAY_KEY_ID=rzp_live_xxx...  # Production key
   RAZORPAY_KEY_SECRET=xxx...       # Production secret

   # Frontend
   VITE_RAZORPAY_KEY_ID=rzp_live_xxx...
   ```

3. **Enable Webhook** (Optional but recommended)

   - Configure webhook URL in Razorpay Dashboard
   - Point to: `https://yourdomain.com/api/payments/razorpay/webhook`
   - Events: Payment authorized, captured, failed

4. **Update Documentation**

   - Change test credentials to production guidelines
   - Enable actual email confirmations
   - Add refund policy

5. **Test End-to-End**
   - Create a test booking with production keys
   - Verify payment confirmation email
   - Check database records

---

## 📚 Additional Resources

- **Razorpay Docs:** https://razorpay.com/docs/
- **Razorpay Test Mode:** https://razorpay.com/docs/payments/payments/test-mode/
- **Integration Examples:** https://github.com/razorpay/razorpay-node
- **Payment Status Codes:** https://razorpay.com/docs/api/orders/attributes/

---

## 🎯 Next Steps

- [ ] Test full payment flow locally
- [ ] Verify email notifications (when booking confirmed)
- [ ] Set up refund processing logic
- [ ] Add payment history in user dashboard
- [ ] Implement admin payment reports
- [ ] Get production Razorpay keys
- [ ] Deploy to staging environment
- [ ] Deploy to production

---

**Last Updated:** November 3, 2025  
**Status:** ✅ Test Mode Ready for Development
