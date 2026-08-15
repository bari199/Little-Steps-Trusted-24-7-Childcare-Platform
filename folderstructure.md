Little-Steps-Trusted-24-7-Childcare-Platform/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ ├── cloudinary.js
│ │ │ ├── db.js
│ │ │ └── razorpay.js
│ │ │
│ │ ├── controllers/
│ │ │ ├── adminController.js
│ │ │ ├── authController.js
│ │ │ ├── bookingController.js
│ │ │ ├── caregiverController.js
│ │ │ ├── centerController.js
│ │ │ ├── paymentController.js
│ │ │ ├── providerController.js
│ │ │ ├── subscriptionController.js
│ │ │ └── userController.js
│ │ │
│ │ ├── middleware/
│ │ │ ├── authMiddleware.js
│ │ │ ├── roleMiddleware.js
│ │ │ └── uploadMiddleware.js
│ │ │
│ │ ├── models/
│ │ │ ├── Booking.js
│ │ │ ├── Caregiver.js
│ │ │ ├── Center.js
│ │ │ ├── Payment.js
│ │ │ ├── Provider.js
│ │ │ ├── Subscription.js
│ │ │ └── User.js
│ │ │
│ │ ├── routes/
│ │ │ ├── adminRoutes.js
│ │ │ ├── authRoutes.js
│ │ │ ├── bookingRoutes.js
│ │ │ ├── caregiverRoutes.js
│ │ │ ├── centerRoutes.js
│ │ │ ├── paymentRoutes.js
│ │ │ ├── providerRoutes.js
│ │ │ ├── subscriptionRoutes.js
│ │ │ └── userRoutes.js
│ │ │
│ │ ├── utils/
│ │ │ ├── cloudinaryUplaod.js
│ │ │ ├── generateSlug.js
│ │ │ └── generateToken.js
│ │ │
│ │ ├── app.js
│ │ └── index.js
│ │
│ ├── .env
│ ├── .env.example
│ ├── .gitignore
│ ├── .nodemon.json
│ ├── package-lock.json
│ ├── package.json
│ ├── README.md
│ └── vercel.json
│
│
├── frontend/
│ ├── public/
│ │
│ ├── src/
│ │ ├── assets/
│ │ │
│ │ ├── components/
│ │ │ │
│ │ │ ├── admin/
│ │ │ │ ├── bookings/
│ │ │ │ │ ├── BookingDetailsDialog.jsx
│ │ │ │ │ └── BookingTable.jsx
│ │ │ │ │
│ │ │ │ ├── centers/
│ │ │ │ │ ├── CenterDetailsDialog.jsx
│ │ │ │ │ └── CenterTable.jsx
│ │ │ │ │
│ │ │ │ ├── layout/
│ │ │ │ │ ├── AdminLayout.jsx
│ │ │ │ │ ├── AdminNavbar.jsx
│ │ │ │ │ └── AdminSidebar.jsx
│ │ │ │ │
│ │ │ │ ├── payments/
│ │ │ │ │ ├── PaymentDetailsDialog.jsx
│ │ │ │ │ └── PaymentTable.jsx
│ │ │ │ │
│ │ │ │ ├── provider/
│ │ │ │ │ ├── ProviderDetailsDialog.jsx
│ │ │ │ │ └── ProviderTable.jsx
│ │ │ │ │
│ │ │ │ ├── reports/
│ │ │ │ │ ├── BookingChart.jsx
│ │ │ │ │ ├── OverviewCard.jsx
│ │ │ │ │ ├── RevenueChart.jsx
│ │ │ │ │ └── SubscriptionsChart.jsx
│ │ │ │ │
│ │ │ │ ├── subscriptions/
│ │ │ │ │ ├── SubscriptionDetailsDialog.jsx
│ │ │ │ │ └── SubscriptionTable.jsx
│ │ │ │ │
│ │ │ │ └── users/
│ │ │ │ ├── UserDetailsDialog.jsx
│ │ │ │ └── UserTable.jsx
│ │ │
│ │ │ ├── auth/
│ │ │ │ ├── AuthLayout.jsx
│ │ │ │ ├── GuestRouts.jsx
│ │ │ │ ├── LoginForm.jsx
│ │ │ │ ├── ProtectedRoute.jsx
│ │ │ │ └── RegisterForm.jsx
│ │ │ │
│ │ │ ├── common/
│ │ │ │ ├── Button.jsx
│ │ │ │ ├── Eyebrow.jsx
│ │ │ │ ├── Loading.jsx
│ │ │ │ ├── LogoMark.jsx
│ │ │ │ ├── Navbar.jsx
│ │ │ │ ├── Reveal.jsx
│ │ │ │ ├── SunArc.jsx
│ │ │ │ └── UserMenu.jsx
│ │ │ │
│ │ │ ├── data/
│ │ │ │ └── theme.js
│ │ │ │
│ │ │ ├── home/
│ │ │ │ ├── AboutSection.jsx
│ │ │ │ ├── CTASection.jsx
│ │ │ │ ├── FAQ.jsx
│ │ │ │ ├── FAQItem.jsx
│ │ │ │ ├── FeaturedCenter.jsx
│ │ │ │ ├── Footer.jsx
│ │ │ │ ├── HeroSection.jsx
│ │ │ │ ├── HeroVisual.jsx
│ │ │ │ ├── HowItWorks.jsx
│ │ │ │ ├── LogoMark.jsx
│ │ │ │ ├── ServicesSection.jsx
│ │ │ │ ├── Testimonials.jsx
│ │ │ │ ├── ThemeContext.jsx
│ │ │ │ └── WhyChooseUs.jsx
│ │ │ │
│ │ │ ├── parent/
│ │ │ │ ├── booking/
│ │ │ │ │ ├── BookingActions.jsx
│ │ │ │ │ ├── BookingInfo.jsx
│ │ │ │ │ └── RazorpayButton.jsx
│ │ │ │ │
│ │ │ │ ├── BookingCard.jsx
│ │ │ │ ├── CaregiverCard.jsx
│ │ │ │ ├── CenterCard.jsx
│ │ │ │ ├── ParentLayout.jsx
│ │ │ │ ├── ParentNavbar.jsx
│ │ │ │ ├── ParentSidar.jsx
│ │ │ │ ├── PaymentCard.jsx
│ │ │ │ └── PaymentHistory.jsx
│ │ │ │
│ │ │ ├── provider/
│ │ │ │ ├── booking/
│ │ │ │ │ ├── ProviderBookingActions.jsx
│ │ │ │ │ ├── ProviderBookingInfo.jsx
│ │ │ │ │ ├── ProviderBookingTable.jsx
│ │ │ │ │ └── ProviderCaregiverTable.jsx
│ │ │ │ │
│ │ │ │ ├── ProviderHeader.jsx
│ │ │ │ ├── ProvierLayout.jsx
│ │ │ │ └── ProviderSidebar.jsx
│ │ │ │
│ │ │ └── ui/
│ │ │
│ │ ├── context/
│ │ │ ├── AuthContext.jsx
│ │ │ └── ThemeContext.jsx
│ │ │
│ │ ├── hooks/
│ │ │ └── useAuth.js
│ │ │
│ │ ├── lib/
│ │ │ └── utils.js
│ │ │
│ │ ├── pages/
│ │ │ ├── admin/
│ │ │ │ ├── Booking.jsx
│ │ │ │ ├── CenterDetails.jsx
│ │ │ │ ├── Center.jsx
│ │ │ │ ├── Dashboard.jsx
│ │ │ │ ├── DashboardHome.jsx
│ │ │ │ ├── ParentDetails.jsx
│ │ │ │ ├── Parent.jsx
│ │ │ │ ├── Payment.jsx
│ │ │ │ ├── Provider.jsx
│ │ │ │ ├── Reports.jsx
│ │ │ │ ├── Subscriptions.jsx
│ │ │ │ └── User.jsx
│ │ │ │
│ │ │ ├── auth/
│ │ │ │ ├── Login.jsx
│ │ │ │ └── Register.jsx
│ │ │ │
│ │ │ ├── parent/
│ │ │ │ ├── BookingDetails.jsx
│ │ │ │ ├── BookingForm.jsx
│ │ │ │ ├── CaregiverDetails.jsx
│ │ │ │ ├── Caregivers.jsx
│ │ │ │ ├── CenterDetails.jsx
│ │ │ │ ├── Center.jsx
│ │ │ │ ├── EditProfile.jsx
│ │ │ │ ├── MyBooking.jsx
│ │ │ │ ├── MySubscriptions.jsx
│ │ │ │ ├── ParentDashboard.jsx
│ │ │ │ ├── ParentProfile.jsx
│ │ │ │ ├── Payments.jsx
│ │ │ │ └── Subscriptions.jsx
│ │ │ │
│ │ │ ├── provider/
                BookingDetails.jsx
                Booking.jsx
                Caregiver.jsx
                CaregiverDetails.jsx
                CenterCard.jsx
                CenterDetails.jsx
                CreateCenter.jsx
                Dashboard.jsx
                DashboardHome.jsx
                EditCaregiver.jsx
                EditCenter.jsx
                EditProviderProfile.jsx
                MyCenter.jsx
                Profile.jsx
│ │ │ |── Home.jsx
│ │ │ │
│ │ │ └── NotFound.jsx
│ │ │
│ │ ├── services/
│ │ │ ├── adminService.js
│ │ │ ├── api.js
│ │ │ ├── authService.js
│ │ │ ├── bookingService.js
│ │ │ ├── caregiverService.js
│ │ │ ├── centerService.js
│ │ │ ├── paymentService.js
│ │ │ ├── providerService.js
│ │ │ └── subscriptionService.js
│ │ │
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ │
│ ├── .env
│ ├── .gitignore
│ ├── components.json
│ ├── eslint.config.json
│ ├── index.html
│ ├── jsconfig.jsx
│ ├── package.json
│ ├── README.md
│ └── vite.config.js
│
└── README.md
