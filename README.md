# Chayil SecureX React Frontend

A comprehensive web application for Chayil SecureX, Africa's trusted partner in Governance, Risk & Compliance (GRC) and Cybersecurity. This React-based frontend provides a modern, responsive interface for clients, administrators, and public users to access cybersecurity services, compliance tools, and management dashboards.

## About Chayil SecureX

Chayil SecureX is a Governance, Risk & Compliance (GRC) and Cybersecurity Advisory firm headquartered at the Accra Digital Centre, Ghana. Positioned at the intersection of global security standards and Africa's emerging digital economy, we specialize in enabling governments, enterprises, and SMEs to build digital trust, comply with international and local regulations, and strengthen cyber resilience.

## Features

### Public Features
- **Home Page**: Company overview and service highlights
- **About Page**: Mission, vision, team profiles, and strategic advisors
- **Services**: Comprehensive GRC and cybersecurity solutions
- **Contact**: Get in touch for consultations and partnerships
- **FAQ**: Common questions and answers
- **Blog**: Industry insights and updates
- **Customer Service**: Support and assistance

### Authentication & Security
- User registration and login
- Two-factor authentication (2FA)
- Password recovery
- Role-based access control (Admin, Client, Analyst)
- Protected routes and session management

### Admin Dashboard
- **Client Management**: Add, view, and manage client accounts
- **Incident Management**: Track and assign security incidents
- **Threat Intelligence**: Monitor threats and vulnerabilities
- **Reports**: Generate and export security reports
- **Team Management**: Manage team members and roles
- **SOC (Security Operations Center)**: Real-time monitoring and log streaming
- **Settings**: System configuration and preferences

### Client Dashboard
- **Security Scorecard**: Monitor security posture
- **Compliance Progress**: Track regulatory compliance
- **Training Modules**: Interactive cybersecurity training
- **Incident Reporting**: Report and track security incidents
- **Reports**: Access security reports and analytics
- **Billing & Account Management**: Manage subscriptions and invoices
- **Communication**: Chat with support and advisors

## Tech Stack

### Frontend Framework
- **React 18.2.0**: Modern React with hooks and concurrent features
- **Vite 7.1.12**: Fast build tool and development server
- **React Router DOM 6.23.0**: Client-side routing

### Styling & UI
- **Tailwind CSS 3.3.3**: Utility-first CSS framework
- **Framer Motion 11.0.0**: Animation library for React
- **Lucide React 0.552.0**: Beautiful icon library
- **React Icons 5.5.0**: Additional icon collections

### State Management
- **Zustand 5.0.8**: Lightweight state management
- **React Context**: Theme and authentication context

### Data Visualization
- **Recharts 2.15.4**: Composable charting library

### Development Tools
- **ESLint**: Code linting
- **PostCSS 8.4.31**: CSS processing
- **Autoprefixer 10.4.16**: CSS vendor prefixing

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chayilfrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with necessary environment variables:
   ```
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_WS_URL=ws://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
chayilfrontend/
├── public/                 # Static assets
│   ├── assets/            # Images and media files
│   └── background*.jpg    # Background images
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── admin/         # Admin-specific components
│   │   ├── client/        # Client-specific components
│   │   ├── shared/        # Shared components
│   │   └── ...
│   ├── context/           # React contexts (Auth, Theme)
│   ├── data/              # Mock data and constants
│   ├── pages/             # Page components
│   ├── services/          # API and WebSocket services
│   ├── stores/            # Zustand state stores
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

## Usage

### Development
- Run `npm run dev` to start the development server
- Open [http://localhost:5173](http://localhost:5173) in your browser
- The app will hot-reload on file changes

### Production
- Run `npm run build` to create a production build
- Serve the `dist` folder using any static server

## API Integration

The frontend communicates with a backend API for:
- User authentication and authorization
- Client and admin data management
- Real-time threat intelligence
- Incident reporting and tracking
- Report generation and export

Ensure the backend API is running and accessible via the configured `VITE_API_BASE_URL`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow React best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add proper TypeScript types (if applicable)
- Write clear, concise commit messages

## Security Considerations

- All sensitive data is handled server-side
- Client-side validation is supplemented by server-side validation
- Authentication tokens are stored securely
- HTTPS is required for production deployments
- Regular security audits and dependency updates

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software owned by Chayil SecureX. All rights reserved.

## Contact

For questions, support, or partnerships:

- **Website**: [www.chayilsecurex.com](https://www.chayilsecurex.com)
- **Email**: info@chayilsecurex.com
- **Phone**: +233 XX XXX XXXX
- **Address**: Accra Digital Centre, Ghana

## Acknowledgments

- **Team**: Charles Fiifi Hagan (CEO), Ebenezer Oduro (COO), Silas Asani Abudu (CTO)
- **Strategic Advisors**: Dr. Noah Darko-Adjei, Ghana Digital Centres Limited
- **Open Source Community**: Thanks to all contributors of the libraries and tools used

---

*Building Africa's digital trust through world-class GRC and cybersecurity solutions.*
