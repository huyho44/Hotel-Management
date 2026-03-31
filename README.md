# Hotel Management System

A full-stack hotel management application built with Node.js, Express, and Microsoft SQL Server. This system provides APIs and a web interface for managing hotel operations including humans, employees, managers, receptionists, service staff, and branches.

## Features

- **Human Management**: Create, read, update, and delete human records
- **Employee Management**: Manage employee information including salary and supervisor assignments
- **Role-based Staff Management**: Separate management for Managers, Receptionists, and Service Staff
- **Branch Management**: View and manage hotel branch information
- **Web Interface**: User-friendly HTML interface for all management operations

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/huyho44/Hotel-Management.git
   cd Hotel-Management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your database configuration:
   ```env
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_SERVER=127.0.0.1
   DB_NAME="Hotel Management"
   DB_PORT=1433
   ```

4. Set up the database by running the SQL script:
   ```bash
   # Execute hoteldb.sql in your SQL Server Management Studio or via command line
   ```

## Running the Application

Start the server:
```bash
npm start
```

The server will start at `http://localhost:3000`

## API Endpoints

### Humans
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/humans` | Get all humans |
| GET | `/humans/:id` | Get human by ID |
| POST | `/humans` | Create a new human |
| PUT | `/humans/:id` | Update a human |
| DELETE | `/humans/:id` | Delete a human |

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| POST | `/employees` | Create a new employee |
| PUT | `/employees/:id` | Update an employee |
| DELETE | `/employees/:id` | Delete an employee |

### Managers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/managers` | Get all managers |
| POST | `/managers` | Create a new manager |
| PUT | `/managers/:id` | Update a manager |
| DELETE | `/managers/:id` | Delete a manager |

### Receptionists
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/receptionists` | Get all receptionists |
| POST | `/receptionists` | Create a new receptionist |
| PUT | `/receptionists/:id` | Update a receptionist |
| DELETE | `/receptionists/:id` | Delete a receptionist |

### Service Staff
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/service-staffs` | Get all service staff |
| POST | `/service-staffs` | Create a new service staff |
| PUT | `/service-staffs/:id` | Update a service staff |
| DELETE | `/service-staffs/:id` | Delete a service staff |

### Branches
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/branches` | Get all branches |

## Web Interface

Access the web interface at `http://localhost:3000` after starting the server. The interface includes:

- **Home**: Landing page
- **Human**: Manage human records
- **Employee**: Manage employees with tabs for All Employees, Managers, Receptionists, and Service Staff
- **Branch**: View branch information

## Project Structure

```
Hotel-Management/
├── index.js          # Main Express server and API routes
├── db.js             # Database connection configuration
├── hoteldb.sql       # SQL script for database setup
├── package.json      # Project dependencies
├── .env              # Environment variables (not tracked)
├── .gitignore        # Git ignore rules
└── public/           # Static frontend files
    ├── index.html    # Main page with navigation
    ├── humans.html   # Human management page
    ├── employees.html # Employee management page
    └── branch.html   # Branch management page
```

## Database Schema

The database includes the following main tables:
- `Human` - Base table for all persons
- `Employee` - Employee records (extends Human)
- `Manager` - Manager records (extends Employee)
- `Receptionist` - Receptionist records (extends Employee)
- `Service_Staff` - Service staff records (extends Employee)
- `Branch` - Hotel branch information
- `Room`, `Room_Type` - Room management
- `Booking`, `Customer` - Booking and customer management
- `Work_Shift`, `Register` - Shift scheduling

## License

ISC
