# education-lending-dashboard
Dhaniti operates in the education-financing ecosystem. For this exercise, assume an internal Dhaniti team receives education-loan applications from students through institutions and other channels. The team needs a lightweight internal tool to view, search, analyze and understand the application pipeline.

# Education Lending Application Intelligence Dashboard

## Problem Understanding

Dhaniti receives education loan applications from students through institutions and partner channels.

The objective of this project is to provide an internal dashboard that enables teams to:

- View application pipeline
- Search applications
- Filter applications
- Analyze trends
- Monitor application statuses
- Generate business insights

This solution helps internal teams understand application flow and identify patterns in the education lending process.

---

## Solution Overview

This application consists of:

### Frontend

A React-based dashboard that provides:

- KPI cards
- Interactive charts
- Search functionality
- Filters
- Application table
- Application details view

### Backend

A Spring Boot REST API that provides:

- Application listing
- Application details
- Create application
- Update application status
- Dashboard statistics

### Database

MySQL database used for storing:

- Applications
- Institutions
- Courses
- Status definitions

---

## Technology Stack

### Frontend

- React.js
- Axios
- Bootstrap / Material UI
- Chart.js / Recharts

### Backend

- Spring Boot
- Spring Data JPA
- REST APIs
- Maven

### Database

- MySQL

### Tools

- Git
- GitHub
- Postman

---

## Dashboard Features

### KPI Metrics

- Total Applications
- Approved Applications
- Under Review Applications
- Rejected Applications
- Total Loan Amount Requested

### Charts

- Application Status Distribution
- Institution Distribution
- Course Distribution
- Loan Amount Distribution

### Application Table

- Search by Application ID
- Search by Student Name
- Filter by Status
- Filter by Course
- Filter by Institution
- Sort by Loan Amount
- Sort by Credit Score

---

## Backend APIs

### Get All Applications

GET /api/applications

### Get Application By Id

GET /api/applications/{id}

### Create Application

POST /api/applications

### Update Application Status

PUT /api/applications/{id}/status

---

## Database Model

### Applications

| Field | Type |
|---------|---------|
| applicationId | VARCHAR |
| studentName | VARCHAR |
| institution | VARCHAR |
| course | VARCHAR |
| status | VARCHAR |
| loanAmount | DECIMAL |
| creditScore | INT |

---

## Data Quality Handling

The supplied dataset contained intentional data quality issues.

### Issue 1 – Missing Values

Handling:
- Missing values displayed as "N/A"
- Excluded from analytical calculations

### Issue 2 – Whitespace Inconsistency

Handling:
- Leading and trailing spaces removed using trim()

### Issue 3 – Invalid Status Values / Typographical Errors

Handling:
- Status values normalized before display and filtering

---

## Business Insights

### Insight 1

(Add your actual insight)

### Insight 2

(Add your actual insight)

### Insight 3

(Add your actual insight)

### Insight 4

(Add your actual insight)

### Insight 5

(Add your actual insight)

---

## How To Run

### Backend

cd backend

mvn clean install

mvn spring-boot:run

Backend URL:

http://localhost:8080

### Frontend

cd frontend

npm install

npm start

Frontend URL:

http://localhost:3000

---

## Assumptions

- One student can have multiple applications.
- Status values are predefined.
- Dataset is synthetic and used only for demonstration.

---

## Known Limitations

- No authentication
- No role-based access control
- No file upload support
- Limited validations

---

## Future Improvements (Additional 3 Days)

- Authentication and Authorization
- Export to Excel/PDF
- Pagination
- Advanced Analytics
- Email Notifications
- Predictive Risk Dashboard

---

## Screenshots

Screenshots are available in the screenshots folder.

## AI Usage

See AI_USAGE.md
