# Employee Management System – COMP3123 Assignment 2

This project is a full-stack Employee Management System built for **COMP 3123 – Full Stack JavaScript Development**.  
The application includes a **Node.js + Express backend**, a **React frontend**, and a fully **Dockerized deployment** using Docker Compose.

---

## 🚀 Project Structure

/backend → Node.js + Express REST API
/frontend → React UI
/docker-compose.yml → Orchestrates frontend, backend, MongoDB

yaml
Copy code

---

## 📦 Technologies Used

### Backend
- Node.js (Express)
- MongoDB with Mongoose
- REST API architecture
- Docker containerization

### Frontend
- React
- Axios
- React Router
- Dark-theme modern UI

### DevOps
- Docker
- Docker Compose (MongoDB + Backend + Frontend)

---

## 🧩 Backend API Features

The backend provides full CRUD operations for employee records.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | API Health Check |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/employees/search?q=` | Search by first name, last name, or email |

MongoDB connection string (inside Docker):
mongodb://mongodb:27017/employee_management

yaml
Copy code

---

## 🎨 Frontend Features (React)

- View all employees  
- Create new employee  
- Edit employee  
- Delete employee  
- Search bar with live filtering  
- Dark theme UI design  
- Simple navigation  
- Axios integrated with backend API  

---

## 🐳 Running with Docker

To build and start all containers:

```bash
docker compose up --build
To stop:

bash
Copy code
docker compose down
Exposed Service URLs
Service	URL
Frontend (React)	http://localhost:3000
Backend API	http://localhost:5000/api
Employee List	http://localhost:5000/api/employees
Search Endpoint	http://localhost:5000/api/employees/search?q=
MongoDB (Docker)	mongodb://localhost:27017

📸 Screenshots (Submitted on D2L)
Backend
Docker containers running

MongoDB data (via mongosh)

Postman REST API tests:

GET all

GET by ID

POST

PUT

DELETE

SEARCH

Frontend
Home screen

Employee Management UI

Create Employee

Edit Employee

Delete Employee

Search results

Login/Signup placeholder

Dark UI theme

🧪 Running Locally (Without Docker)
Backend
bash
Copy code
cd backend
npm install
npm start
Frontend
bash
Copy code
cd frontend
npm install
npm start
You must have MongoDB running locally or via Atlas.

👤 Author
Shayan Pourahmad
George Brown College
COMP 3123 – Full Stack JavaScript Development

✅ Assignment Status
All Assignment 2 requirements completed:

Full backend CRUD implemented

React frontend with search & CRUD

Dockerized full-stack deployment

GitHub repository with README

Screenshots submitted on D2L

yaml
Copy code

---

This README is complete, professional, and meets academic expectations.  
If you want, I can also prepare a **D2L submission note**, **AI Usage Statement**, or a **PDF pack**.
