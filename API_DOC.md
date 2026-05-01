# API Documentation — Hotel Management

Base URL: http://localhost:3000

Important: The backend requires a Microsoft SQL Server database with the schema, stored procedures and functions defined in `hoteldb.sql`. Set environment variables in a `.env` file: `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_DATABASE`, `DB_PORT`.

---

## Endpoints

**Humans**

- **GET** `/humans` : Lấy danh sách tất cả `Human`.
  - Response: `200` JSON array of human records.
  - Example:

```bash
curl http://localhost:3000/humans
```

- **GET** `/humans/:id` : Lấy `Human` theo `Citizen_ID`.
  - Path param: `id` (int)
  - Example:

```bash
curl http://localhost:3000/humans/123
```

- **POST** `/humans` : Tạo `Human` mới (gọi proc `InsertHuman`).
  - Body (JSON):
    - `Citizen_ID` (int), `FirstName`, `LastName`, `DateOfBirth` (YYYY-MM-DD), `Email`, `Gender` ("M"|"F").
  - Success: `201` + JSON message.
  - Example:

```bash
curl -X POST http://localhost:3000/humans \
  -H "Content-Type: application/json" \
  -d '{"Citizen_ID":123,"FirstName":"An","LastName":"Nguyen","DateOfBirth":"1990-01-01","Email":"an@example.com","Gender":"M"}'
```

- **PUT** `/humans/:id` : Cập nhật `Human` theo `Citizen_ID` (gọi `UpdateHuman`).
  - Body: bất kỳ trường có thể cập nhật (`FirstName`, `LastName`, `DateOfBirth`, `Email`, `Gender`).

- **DELETE** `/humans/:id` : Xóa `Human` (gọi `DeleteHuman`).

**Employees**

- **GET** `/employees` : Lấy danh sách tất cả nhân viên (join Human + Employee).

```bash
curl http://localhost:3000/employees
```

- **GET** `/employees/:id` : Lấy employee theo `Citizen_ID`.

- **POST** `/employees` : Tạo employee (gọi `InsertFullEmployee`).
  - Body (JSON): `Citizen_ID`, `FirstName`, `LastName`, `DateOfBirth`, `Email`, `Gender`, `Salary`, `Supervisor_ID` (nullable), `Branch_ID`.

- **PUT** `/employees/:id` : Cập nhật (gọi `UpdateFullEmployee`).

- **DELETE** `/employees/:id` : Xóa nhân viên (gọi `DeleteEmployee`).

**Managers**

- **GET** `/managers`
- **POST** `/managers` (body giống Employee; gọi `InsertManager`)
- **PUT** `/managers/:id` (gọi `UpdateManager`)
- **DELETE** `/managers/:id` (gọi `DeleteManager`)

**Receptionists**

- **GET** `/receptionists`
- **POST** `/receptionists` (gọi `InsertReceptionist`)
- **PUT** `/receptionists/:id` (gọi `UpdateReceptionist`)
- **DELETE** `/receptionists/:id` (gọi `DeleteReceptionist`)

**Service Staffs**

- **GET** `/service-staffs`
- **POST** `/service-staffs` (gọi `InsertServiceStaff`)
- **PUT** `/service-staffs/:id` (gọi `UpdateServiceStaff`)
- **DELETE** `/service-staffs/:id` (gọi `DeleteServiceStaff`)

**Branches**

- **GET** `/branches` : Lấy tất cả chi nhánh.

**Reports**

- **GET** `/api/service-staff-performance` : Lấy performance của service staff (gọi stored procedure `Service_Staff_Performance`).
  - Query params (required): `branchId` (int), `fromDate` (YYYY-MM-DD), `endDate` (YYYY-MM-DD)
  - Optional: `minKpi` (decimal)
  - Example:

```bash
curl "http://localhost:3000/api/service-staff-performance?branchId=1&fromDate=2024-01-01&endDate=2024-01-31&minKpi=10"
```

- **GET** `/reports/customer-spending` : Gọi function `fnCustomerTotalSpending` via controller.
  - Query: `customerId` (int, required), optional `fromDate`, `toDate`.

- **GET** `/reports/branch-revenue` : Gọi function `fnBranchRevenue`.
  - Query: `branchId` (int, required), `startDate` and `endDate` (required).

**Static pages**

- Express phục vụ thư mục `public/` như static files. Ví dụ truy cập `/`, `/branch.html`, `/employees.html`, `/reports.html`, `/service-staff-performance.html`.

---

## Notes / Run steps

1. Tạo `.env` trong thư mục gốc với DB creds.
2. Khởi động backend:

```powershell
npm install
npm start
```

3. (Frontend dev) vào `/frontend`:

```powershell
cd frontend
npm install
npm run dev
```

4. Database: import `hoteldb.sql` vào SQL Server. Nhiều endpoint phụ thuộc vào stored procedures và triggers trong file đó.

---

## Có thể làm tiếp

- Tạo Postman collection hoặc OpenAPI spec.
- Thêm ví dụ response JSON thực tế vào từng endpoint.
- Chuẩn hóa lỗi trả về từ controller (hiện trả lỗi thô từ SQL).

---

_This document generated automatically from code inspection._
