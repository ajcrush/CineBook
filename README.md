# CineBook - Movie Booking System

A full-stack movie booking application built with React, Express.js, and MongoDB. This system allows users to browse movies, book seats, manage bookings, and provides an admin dashboard for managing movies, showtimes, bookings, and users.

---

## 📁 Project Structure

```
Movie fe+be/
├── frontend/          # React-based client application
├── backend/           # Express.js server with MongoDB
└── README.md          # This file
```

---

## 🎬 Frontend Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env.local` file in the `frontend` directory (if needed for API configuration):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Dark Mode Support** - Theme toggle

### Features

- 🎭 Browse and search movies
- 🪑 Interactive seat selection
- 🛒 Shopping cart with checkout
- 📝 Booking management
- 🌙 Dark mode support
- 👤 User authentication
- 🔐 Admin dashboard (role-based access)

### Key Directories

```
frontend/src/
├── components/        # Reusable React components
├── pages/            # Page components
├── services/         # API service calls
├── stores/           # Zustand state stores
├── assets/           # Images and static files
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

---

## 🚀 Backend Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/cinebook
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **CORS** - Cross-origin requests
- **Express Validator** - Input validation

### API Endpoints

#### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

#### Movies

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies` - Create movie (admin only)
- `PUT /api/movies/:id` - Update movie (admin only)
- `DELETE /api/movies/:id` - Delete movie (admin only)

#### Showtimes

- `GET /api/movies/:movieId/showtimes` - Get showtimes for a movie
- `POST /api/movies/:movieId/showtimes` - Add showtime (admin only)

#### Bookings

- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings` - Get user bookings (protected)
- `GET /api/bookings/:id` - Get booking details (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)

#### Payments

- `POST /api/payments/create-intent` - Create Stripe payment intent

#### Admin

- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:id/role` - Update user role (admin only)
- `GET /api/admin/bookings` - Get all bookings (admin only)
- `GET /api/admin/reports` - Get reports (admin only)

### Database Models

#### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (user/admin),
  status: String (active/banned),
  bookings: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

#### Movie

```javascript
{
  title: String,
  description: String,
  genre: String,
  rating: Number,
  posterUrl: String,
  duration: Number,
  releaseDate: Date,
  createdAt: Date
}
```

#### Showtime

```javascript
{
  movieId: ObjectId,
  screenNumber: Number,
  showDate: Date,
  showTime: String,
  ticketPrice: Number,
  totalSeats: Number,
  bookedSeats: [String],
  lockedSeats: [{seat, lockedUntil}],
  createdAt: Date
}
```

#### Booking

```javascript
{
  userId: ObjectId,
  movieId: ObjectId,
  showtimeId: ObjectId,
  selectedSeats: [String],
  totalPrice: Number,
  status: String (pending/confirmed/cancelled),
  paymentId: String,
  bookingDate: Date,
  cancelledAt: Date
}
```

### Key Directories

```
backend/src/
├── models/           # Mongoose schemas
├── routes/           # API route handlers
├── middleware/       # Custom middleware (auth, etc.)
└── index.js          # Server entry point
```

---

## 🔐 Authentication & Authorization

### User Roles

1. **User** - Can browse movies, make bookings, manage own bookings
2. **Admin** - Full access to manage movies, showtimes, bookings, users, and view reports

### JWT Token

- Tokens are returned on successful login/registration
- Include token in `Authorization: Bearer <token>` header for protected routes
- Token expires after 7 days (configurable)

### Making an Admin User

To create or convert a user to admin, update their role in MongoDB:

```bash
cd backend
node update-user-role.js  # (use MongoDB compass or similar tools)
```

---

## 🚀 Running the Application

### Option 1: Run Both Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:5173 (or next available port)
```

### Option 2: Production Build

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
# Serve the dist folder using a static server
```

---

## 📊 Admin Dashboard Features

Access admin dashboard at `/admin` (admin users only)

- **Movie Manager** - Add, edit, delete movies and manage genres
- **Showtime Manager** - Create and manage movie showtimes
- **Booking Manager** - View and manage all bookings
- **User Manager** - Manage users, assign admin roles, ban users
- **Reports Manager** - View booking statistics and revenue reports

---

## 🎨 UI Features

- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Interactive Seat Selector** - Visual seat selection with real-time updates
- **Toast Notifications** - User feedback for actions
- **Loading States** - Skeleton loaders and spinners
- **Modal Dialogs** - Confirmations and forms

---

## 🔧 Troubleshooting

### Backend Issues

- **MongoDB Connection Error**: Ensure MongoDB is running and MONGO_URI is correct
- **Port Already in Use**: Change PORT in .env or kill process on that port
- **Module not found**: Run `npm install` in backend directory

### Frontend Issues

- **CORS Errors**: Ensure backend CORS is configured correctly
- **API Not Found**: Verify backend is running on correct port
- **Build Errors**: Clear `node_modules` and `dist`, then reinstall dependencies

### Admin Not Redirecting

- Verify user has `role: "admin"` in database
- Clear browser cache/localStorage
- Ensure LoginPage correctly redirects based on user role

---

## 📝 Environment Configuration

### Backend .env

```env
MONGO_URI=mongodb://localhost:27017/cinebook
PORT=5000
JWT_SECRET=your_secure_secret_key
STRIPE_SECRET_KEY=sk_test_your_key
NODE_ENV=development
```

### Frontend .env.local (optional)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🛠️ Development Tips

### Adding New Pages

1. Create component in `frontend/src/pages/`
2. Import in `App.jsx`
3. Add route in Routes section

### Adding New API Endpoints

1. Create route file in `backend/src/routes/`
2. Import and use in `backend/src/index.js`
3. Add corresponding API service in `frontend/src/services/api.js`

### Database Queries

- Use MongoDB Compass for visual database management
- Or use `mongo` CLI to connect to MongoDB

---

## 📦 Dependencies

### Frontend

- react: ^18.2.0
- react-router-dom: ^6.x
- zustand: ^4.x
- axios: ^1.x
- tailwindcss: ^3.x

### Backend

- express: ^4.18.2
- mongoose: ^7.6.0
- jsonwebtoken: ^9.0.2
- bcryptjs: ^2.4.3
- stripe: ^13.0.0

---

## 📄 License

This project is open source and available under the ISC License.

---

## 👤 Contact & Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Happy Coding! 🎉**
