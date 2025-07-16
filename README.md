# 🚗 SmartPark - Intelligent Parking Management System

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.0.1-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Radix_UI-Latest-161618?style=for-the-badge&logo=radix-ui" alt="Radix UI" />
</div>

<div align="center">
  <h3>🌟 Modern • Responsive • Intelligent • Secure</h3>
  <p>A cutting-edge parking management system that revolutionizes how users find, reserve, and manage parking spaces with real-time availability and seamless user experience.</p>
</div>

---

## ✨ Features

### 🎯 **Core Functionality**
- **Real-time Parking Availability** - Live tracking of parking spaces with instant updates
- **Smart Reservations** - Advanced booking system with time constraints and validation
- **Secure Payment Processing** - Multiple payment methods with encrypted transactions
- **Quick Check-in/Check-out** - Manual and QR code-based parking session management
- **Comprehensive Dashboard** - User analytics, activity tracking, and quick actions

### 🎨 **Modern UI/UX**
- **Stunning Design** - Professional interface with smooth animations and hover effects
- **Dark/Light Mode** - Seamless theme switching with system preference detection
- **Responsive Layout** - Mobile-first design that works perfectly on all devices
- **Intuitive Navigation** - Clean, accessible navigation with mobile menu support
- **Loading States** - Beautiful loading animations and skeleton screens

### 🔧 **Technical Excellence**
- **TypeScript Integration** - Full type safety across the entire application
- **API Integration** - Robust connection to AWS Lambda backend with error handling
- **Component Architecture** - Modular, reusable components built with Radix UI
- **Performance Optimized** - Fast loading times and smooth interactions
- **Accessibility Compliant** - WCAG guidelines followed for inclusive design

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SmartPark
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3002](http://localhost:3002) to see the application.

---

## 📱 Application Pages

### 🏠 **Home Page**
- Hero section with animated branding
- Feature showcase with interactive cards
- Call-to-action buttons for quick access
- Modern gradient backgrounds

### 🚗 **Availability Page** (`/availability`)
- Real-time parking space grid with status indicators
- Statistics dashboard (Available/Occupied/Total spaces)
- Refresh functionality with loading states
- Color-coded space types (Regular, Electric, Handicap, Compact)
- Fallback demo data for development

### 📅 **Reservation Page** (`/reserve`)
- Smart reservation form with validation
- Date/time picker with business logic constraints
- Reservation summary with duration calculation
- Success/error handling with user feedback
- Pre-population from availability page

### 💳 **Payment Page** (`/payment`)
- Secure payment form with card number formatting
- Multiple payment method support
- Payment breakdown with tax calculation
- Security indicators and SSL badges
- PCI compliance features

### 📊 **Dashboard Page** (`/dashboard`)
- User statistics with gradient cards
- Recent activity timeline
- Quick action buttons
- Performance metrics and insights

### 🚪 **Check-in Page** (`/checkin`)
- Manual check-in with reservation ID
- QR code scanning capability (coming soon)
- Session management and validation
- Real-time status updates

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 15.0.1** - React framework with App Router
- **React 18** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### **Styling & UI**
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management system

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Class Variance Authority** - Component variant management

### **Backend Integration**
- **AWS Lambda** - Serverless backend functions
- **REST API** - RESTful API communication
- **Error Handling** - Comprehensive error management

---

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── availability/      # Parking availability
│   ├── checkin/          # Check-in functionality
│   ├── dashboard/        # User dashboard
│   ├── payment/          # Payment processing
│   ├── reserve/          # Reservation system
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── loading.tsx       # Global loading component
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/               # UI component library
│   ├── navigation.tsx    # Navigation component
│   └── mode-toggle.tsx   # Theme toggle
├── lib/                  # Utility libraries
│   ├── api.ts           # API integration layer
│   └── utils.ts         # Utility functions
└── types/               # TypeScript definitions
    └── index.ts         # Type definitions
```

---

## 🔌 API Integration

### **Endpoints**
- `GET /available-spaces` - Fetch available parking spaces
- `POST /reserve` - Create parking reservation
- `POST /pay` - Process payment
- `POST /checkin` - Check into parking space
- `POST /checkout` - Check out of parking space

### **Error Handling**
- Graceful degradation with fallback data
- User-friendly error messages
- Retry mechanisms for failed requests
- Loading states during API calls

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Professional blue tones
- **Secondary**: Complementary accent colors
- **Success**: Green for available spaces
- **Warning**: Yellow for maintenance
- **Error**: Red for occupied/unavailable

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, hierarchical sizing
- **Body Text**: Readable, accessible contrast

### **Components**
- **Cards**: Elevated surfaces with hover effects
- **Buttons**: Multiple variants and sizes
- **Forms**: Validated inputs with error states
- **Badges**: Status indicators and labels

---

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
npm start
```

### **Deployment Platforms**
- **Vercel** (Recommended) - Seamless Next.js deployment
- **Netlify** - Static site deployment
- **AWS Amplify** - Full-stack deployment
- **Docker** - Containerized deployment

### **Environment Variables**
```env
NEXT_PUBLIC_API_URL=your-api-endpoint
NEXT_PUBLIC_ENVIRONMENT=production
```

---

## 🧪 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### **Development Features**
- Hot reload for instant feedback
- TypeScript error checking
- ESLint integration
- Automatic code formatting

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Standards**
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write comprehensive comments for complex logic
- Ensure responsive design compatibility
- Test on multiple devices and browsers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library
- **Vercel** - For hosting and deployment platform

---

<div align="center">
  <p>Built with ❤️ for the future of parking management</p>
  <p>
    <a href="#-smartpark---intelligent-parking-management-system">Back to Top</a>
  </p>
</div>