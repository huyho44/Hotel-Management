# 🏨 Grand Ho Tram - Hotel Management System

A premium, full-stack hotel management solution built with modern web technologies and a robust SQL Server backend. This system enables comprehensive management of hotel operations, from HR and employee roles to complex booking engines and service performance tracking.

## ✨ Features

- **🛡️ Comprehensive HR Management**: 
    - Dedicated roles for **Managers**, **Receptionists**, and **Service Staff**.
    - Automatic role disjointness (an employee cannot hold multiple conflicting roles).
    - Supervision tree tracking and salary validation.
- **📅 Advanced Booking Engine**:
    - Real-time room availability tracking.
    - Automatic overlap detection to prevent double-booking.
    - Detailed guest check-in/out workflows.
- **🏢 Multi-Branch Support**: 
    - Manage various hotel locations with centralized data.
    - Specific permissions: Receptionists can only book for their own branch.
- **🚿 Service & Performance Tracking**:
    - Integrated Laundry and Food & Beverage service management.
    - Staff performance monitoring via service execution logs.
- **📊 Reporting System**:
    - Dynamic reports for business intelligence and operational oversight.
- **🔐 Data Integrity**:
    - Powered by specialized SQL Triggers and Stored Procedures for complex business logic (e.g., minimum age requirements, check-out date validation, etc.).

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Custom Luxury Design System)
- **Icons**: Lucide React
- **Routing**: React Router Dom

### Backend
- **Environment**: Node.js
- **Framework**: Express.js
- **Database**: Microsoft SQL Server (MSSQL)
- **Configuration**: Dotenv

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Microsoft SQL Server
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Hotel-Management
   ```

2. **Install Backend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Database Setup**:
   - Create a new database in SQL Server named `Hotel Management` (or your preferred name).
   - Execute the `hoteldb.sql` script to generate tables, triggers, and stored procedures.

5. **Configuration**:
   - Create a `.env` file in the root directory:
     ```env
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_SERVER=127.0.0.1
     DB_DATABASE=Hotel Management
     DB_PORT=1433
     ```

### Running the Project

1. **Start the Backend**:
   ```bash
   npm start
   ```
   *The server will run on http://localhost:3000*

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   *The client will run on http://localhost:5173*

## 📁 Project Structure

- `frontend/`: React + Vite application.
- `routes/`: API endpoint definitions for different modules.
- `controllers/`: Business logic and database interaction handlers.
- `config/`: Database connection configuration.
- `hoteldb.sql`: Complete database schema, including triggers and procedures.

## ⚖️ License
Distributed under the ISC License.
