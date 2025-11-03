# Period Tracker App – Backend & Frontend Architecture (Pinky Promise Interview Assignment)

## 1️⃣ Overview
A minimal **Period Tracker** application built with the **MEAN stack** (MongoDB, Express.js, Angular, Node.js).  
The app allows users to **log their periods** and **predict their next period date** based on cycle length.  
Focus is on **architecture and design clarity**, with one working API implemented end-to-end.

---

## 2️⃣ Tech Stack
| Layer | Technology
|-------|-------------|
| Backend | **Node.js (Express.js)**
| Database | **MongoDB (Mongoose ODM)**
| Frontend | **Angular (Standalone Components)**
| Logging | **Winston**
| Testing (Backend) | **Jest + Supertest + MongoMemoryServer**

---

## 3️⃣ Folder Structure (Backend)
```
backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   ├── features/
│   │   └── period/
│   │       ├── period.model.js
│   │       ├── period.controller.js
│   │       ├── period.services.js
│   │       └── period.routes.js
│   ├── utils/logger.js
│   └── server.js
│
├── test/
│   ├── config/jest.config.js
│   └── period/period.test.js
│
├── .env.dev
├── .env.prod
├── .env.stage
├── package.json
└── ...
```
✅ **Feature-based structure** allows clean separation of concerns and easier scalability.

---

## 4️⃣ Database Design

### `periods` Collection
| Field | Type | Description |
|--------|------|-------------|
| `_id` | ObjectId | Unique identifier |
| `startDate` | Date | User’s period start date |
| `cycleLength` | Number | Days between two periods |
| `createdAt` | Date | Auto-generated timestamp |

---

## 5️⃣ Implemented API

### **POST /api/periods/log**

#### Description:
Logs a new period.

#### Request:
```json
POST /api/periods/log
Content-Type: application/json

{
  "startDate": "2025-11-01",
  "cycleLength": 28
}
```

#### Response:
```json
{
  "message": "Period logged successfully",
  "data": {
    "_id": "6724afcc43c90d89387db7e3",
    "startDate": "2025-11-01T00:00:00.000Z",
    "cycleLength": 28,
    "createdAt": "2025-11-01T18:20:00.000Z"
  }
}
```

#### Error responses:
- **400** – Invalid or missing fields  
- **500** – Internal server error (e.g., DB connection)

---

## 6️⃣ Frontend Overview

### Folder Structure
```
frontend/
│
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── period.service.ts
│   │   ├── features/
│   │   │   └── period/
│   │   │       ├── period.ts
│   │   │       ├── period.html
│   │   ├── app.config.ts
│   │   ├── app.html
│   │   └── app.ts
│   ├── environments/
│   │   └── environment.ts
│   └── main.ts
└── ...
```

### Functionality
- Simple form to input `startDate` and `cycleLength`
- Submits data via `PeriodService` → backend `/api/periods/log`

---

## 7️⃣ Logging & Environment Management
- **Different .env files** for `development`, `staging`, `production`
- **Winston** handles logs:
  - Console output in dev mode
  - Extendable to file/remote logging in production
- **dotenv** dynamically loads env file based on `NODE_ENV`

---

## 8️⃣ Future Improvements / Next Steps

### Backend
1. **Add user authentication** (JWT or OAuth)
2. **Add `/api/periods/predict`** → return future cycle trends  
3. **Add `/api/periods/history`** → show previous logged periods  
4. **Cache layer (Redis)** → for frequent user queries
5. **Background job** → notify users before next period

### Frontend
1. **User dashboard** with calendar view  
2. **Add notifications/reminders**  
3. **Add unit tests** using Jasmine/Karma

### Scalability & Deployment
- Use **Docker** for containerized deployments  
- Deploy backend on **AWS ECS or EC2**, frontend on **S3 + CloudFront**  
- Use **MongoDB Atlas** for managed database
- Use **NGINX** or **API Gateway** to manage CORS and routing

---

## 9️⃣ Potential Challenges
| Challenge | Mitigation |
|------------|-------------|
| Data privacy (sensitive info) | Use encryption at rest and in transit (HTTPS + MongoDB encryption) |
| Predictive accuracy | Enhance algorithm with more user logs & AI models |
| Scaling DB writes | Use sharding & indexing on `userId`, `startDate` |
| Cross-origin requests | Proper CORS configuration in Express |
