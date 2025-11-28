-- ========================
-- 1. HUMAN-RELATED TABLES
-- ========================
CREATE TABLE Human (
    Citizen_ID INT PRIMARY KEY,
    Last_Name VARCHAR(100) NOT NULL,
    First_Name VARCHAR(100) NOT NULL,
    Birth_Date DATE,
    Email VARCHAR(100) UNIQUE,
    Gender CHAR(1) CHECK (Gender IN ('M', 'F')),
    CONSTRAINT check_email CHECK (Email LIKE '%@%'),
    CONSTRAINT check_ID  CHECK (Citizen_ID > 0)
);

CREATE TABLE Human_Phone_Number (
    Phone_Number VARCHAR(15),
    Citizen_ID INT,
    PRIMARY KEY (Phone_Number, Citizen_ID),
    FOREIGN KEY (Citizen_ID) REFERENCES Human(Citizen_ID)
        ON DELETE CASCADE
);

CREATE TABLE Human_Address (
    Address VARCHAR(255),
    Citizen_ID INT,
    PRIMARY KEY (Citizen_ID, Address),
    FOREIGN KEY (Citizen_ID) REFERENCES Human(Citizen_ID)
        ON DELETE CASCADE        
);

-- =====================
-- 2. BRANCH & EMPLOYEE
-- =====================

CREATE TABLE Branch (
    Branch_ID INT PRIMARY KEY,
    Branch_Name VARCHAR(100),
    Branch_Address VARCHAR(255),
    TotalEmployees INT DEFAULT 0
);

CREATE TABLE Employee (
    Citizen_ID INT PRIMARY KEY,
    Salary DECIMAL(10,2),
    Supervisor_ID INT,
    Branch_ID INT,
    FOREIGN KEY (Citizen_ID) REFERENCES Human(Citizen_ID),
    FOREIGN KEY (Supervisor_ID) REFERENCES Employee(Citizen_ID),
    FOREIGN KEY (Branch_ID) REFERENCES Branch(Branch_ID)
);

CREATE TABLE Manager (
    Citizen_ID INT PRIMARY KEY,
    Branch_ID INT,
    FOREIGN KEY (Citizen_ID) REFERENCES Employee(Citizen_ID),
    FOREIGN KEY (Branch_ID) REFERENCES Branch(Branch_ID)
);

CREATE TABLE Receptionist (
    Citizen_ID INT PRIMARY KEY,
    FOREIGN KEY (Citizen_ID) REFERENCES Employee(Citizen_ID)
);

CREATE TABLE Service_Staff (
    Citizen_ID INT PRIMARY KEY,
    FOREIGN KEY (Citizen_ID) REFERENCES Employee(Citizen_ID)
);

-- =========================
-- 3. ROOM & ROOM TYPE TABLES
-- =========================
CREATE TABLE Room_Type (
    Room_Type_ID INT PRIMARY KEY,
    Room_Name VARCHAR(100),
    Description VARCHAR(255),
    Max_Occupancy INT CHECK (Max_Occupancy >= 1),
    Price_Level VARCHAR(20) CHECK (Price_Level IN ('Low', 'Medium', 'High'))
);

CREATE TABLE Room (
    Room_No INT,
    Branch_ID INT,
    Status VARCHAR(20) CHECK (Status IN ('Available', 'Occupied', 'Cleaning')),
    Room_Type_ID INT,
    PRIMARY KEY (Room_No, Branch_ID),
    FOREIGN KEY (Room_Type_ID) REFERENCES Room_Type(Room_Type_ID),
    FOREIGN KEY (Branch_ID) REFERENCES Branch(Branch_ID)
);

CREATE TABLE Furniture (
    Furniture_ID INT PRIMARY KEY,
    Name VARCHAR(100),
    Category VARCHAR(100)
);

CREATE TABLE Has(
    Furniture_ID INT,
    Room_No INT,
    Branch_ID INT,

    PRIMARY KEY (Furniture_ID, Room_No, Branch_ID),
    FOREIGN KEY (Room_No, Branch_ID) REFERENCES Room(Room_No, Branch_ID),
    FOREIGN KEY (Furniture_ID) REFERENCES Furniture(Furniture_ID)
);

-- =======================
-- 4. CUSTOMER & ACCOUNT
-- =======================
CREATE TABLE Customer (
    Citizen_ID INT PRIMARY KEY,
    FOREIGN KEY (Citizen_ID) REFERENCES Human(Citizen_ID)
);

CREATE TABLE Member_Account (
    User_ID INT,
    Customer_Citizen_ID INT,
    Account_Tier VARCHAR(50),
    Creation_Date DATE,
    Password VARCHAR(100),
    User_Name VARCHAR(100),
    FOREIGN KEY (Customer_Citizen_ID) REFERENCES Customer(Citizen_ID),

    PRIMARY KEY(User_ID, Customer_Citizen_ID)
);

-- ===================
-- 5. RECEIPT & BOOKING
-- ===================
CREATE TABLE Receipt (
    Receipt_ID INT PRIMARY KEY,
    Issue_Time DATETIME DEFAULT GETDATE(),
    Manager_ID INT,
    Receptionist_Citizen_ID INT,
    FOREIGN KEY (Receptionist_Citizen_ID) REFERENCES Receptionist(Citizen_ID),
    FOREIGN KEY (Manager_ID) REFERENCES Manager(Citizen_ID)
);

CREATE TABLE Booking (
    Booking_ID INT PRIMARY KEY,
    Booking_Time DATETIME DEFAULT GETDATE(),
    Check_in_Time DATETIME,
    Check_out_Time DATETIME,
    CheckIn DATE,
    CheckOut DATE,
    Customer_Citizen_ID INT,
    Receptionist_Citizen_ID INT,
    Receipt_ID INT,
    
    
    FOREIGN KEY (Customer_Citizen_ID) REFERENCES Customer(Citizen_ID),
    FOREIGN KEY (Receptionist_Citizen_ID) REFERENCES Receptionist(Citizen_ID),
    FOREIGN KEY (Receipt_ID) REFERENCES Receipt(Receipt_ID),

    CONSTRAINT CheckValidDate CHECK (CheckOut >= CheckIn)
);

CREATE TABLE Consist(
    Booking_ID INT,
    Room_No INT,
    Branch_ID INT,

    PRIMARY KEY (Booking_ID, Room_No, Branch_ID),
    FOREIGN KEY (Room_No, Branch_ID) REFERENCES Room(Room_No, Branch_ID),
    FOREIGN KEY (Booking_ID) REFERENCES Booking(Booking_ID)
);

-- ========================
-- 6. SERVICE TYPE & SERVICE
-- ========================
CREATE TABLE Service_Type (
    Service_Type_ID INT PRIMARY KEY,
    Category_Name VARCHAR(100)
);

CREATE TABLE Additional_Service (
    Service_ID INT PRIMARY KEY,
    Price DECIMAL(10,2),
    Description VARCHAR(255),
    Service_Name VARCHAR(100),
    Service_Type_ID INT,
    FOREIGN KEY (Service_Type_ID) REFERENCES Service_Type(Service_Type_ID)
);

CREATE TABLE Laundry (
    Service_Type_ID INT PRIMARY KEY,
    Default_Price DECIMAL(10,2),
    Price_per_next_kg DECIMAL(10,2),
    Weight DECIMAL(5,2),
    FOREIGN KEY (Service_Type_ID) REFERENCES Service_Type(Service_Type_ID)
);

CREATE TABLE Food_Beverage (
    Service_Type_ID INT PRIMARY KEY,
    Price DECIMAL(10,2),
    Serving VARCHAR(100),
    FOREIGN KEY (Service_Type_ID) REFERENCES Service_Type(Service_Type_ID)
);

CREATE TABLE Perform(
    Service_Type_ID INT,
    Citizen_ID INT,
    Time DATETIME DEFAULT GETDATE(), 

    FOREIGN KEY(Service_Type_ID) REFERENCES Service_Type(Service_Type_ID),
    FOREIGN KEY(Citizen_ID) REFERENCES Service_Staff(Citizen_ID),

    Primary KEY(Service_Type_ID,Citizen_ID,Time)
);

CREATE TABLE Require(
    Booking_ID INT,
    Service_Type_ID INT,
    Number_of_times INT,
    
    FOREIGN KEY(Service_Type_ID) REFERENCES Service_Type(Service_Type_ID),
    FOREIGN KEY(Booking_ID) REFERENCES Booking(Booking_ID),

    PRIMARY KEY (Booking_ID, Service_Type_ID) 

);

-- ========================
-- 7. WORK SHIFT & REGISTER
-- ========================
CREATE TABLE Work_Shift (
    Shift_ID INT PRIMARY KEY,
    Shift_Name VARCHAR(50),
    Start_Time TIME,
    End_Time TIME
);

CREATE TABLE Register (
    Employee_Citizen_ID INT,
    Shift_ID INT,
    Work_Date DATE,

    PRIMARY KEY (Employee_Citizen_ID, Shift_ID,Work_Date),
    FOREIGN KEY (Employee_Citizen_ID) REFERENCES Employee(Citizen_ID),
    FOREIGN KEY (Shift_ID) REFERENCES Work_Shift(Shift_ID)
);

GO
-- ========================-- ======================== SEMANTIC CONSTRAINTS
CREATE OR ALTER TRIGGER CheckEmployeeAge
ON Employee
AFTER INSERT
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
        JOIN Human h ON i.Citizen_ID = h.Citizen_ID
        WHERE DATEDIFF(YEAR, h.Birth_Date, GETDATE()) < 18
    )
    BEGIN
        RAISERROR (N'Error: Employee must be at least 18 years old.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;

GO

CREATE OR ALTER TRIGGER OverlapChecking
ON Consist
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted NewReceipt
        JOIN Booking NewBooking
        ON NewReceipt.Booking_ID = NewBooking.Booking_ID

        JOIN Consist OldReceipt
        ON NewReceipt.Room_No= OldReceipt.Room_No
        AND NewReceipt.Branch_ID= OldReceipt.Branch_ID
        AND NewReceipt.Booking_ID <> OldReceipt.Booking_ID

        JOIN Booking OldBooking
        ON OldReceipt.Booking_ID = OldBooking.Booking_ID

        Where NewBooking.CheckIn < OldBooking.CheckOut
        AND NewBooking.CheckOut > OldBooking.CheckIn
     
    )
    BEGIN
        RAISERROR (N'The Room is not available right now.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;

GO

CREATE OR ALTER TRIGGER SalaryCheck
ON Employee
AFTER INSERT, UPDATE
AS
BEGIN

    IF EXISTS (
        SELECT 1
        FROM inserted E  
        JOIN Employee M  
          ON E.Supervisor_ID = M.Citizen_ID 
        WHERE 
              E.Branch_ID = M.Branch_ID     
          AND E.Salary > M.Salary           
    )
    BEGIN
        RAISERROR (N'Error: The Employee salary is not higher than the Manager at the same branch.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;

GO

CREATE OR ALTER TRIGGER DisjointRole_Manager
ON Manager
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted i JOIN Receptionist r ON i.Citizen_ID = r.Citizen_ID)
    BEGIN
        RAISERROR (N'Error: This Employee is currently a Receptionist.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM inserted i JOIN Service_Staff s ON i.Citizen_ID = s.Citizen_ID)
    BEGIN
        RAISERROR (N'Error: This Employee is currently a Service Staff.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
END;

GO

CREATE OR ALTER TRIGGER DisjointRole_Receptionist
ON Receptionist
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted i JOIN Manager r ON i.Citizen_ID = r.Citizen_ID)
    BEGIN
        RAISERROR (N'Error: This Employee is currently a Manager.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM inserted i JOIN Service_Staff s ON i.Citizen_ID = s.Citizen_ID)
    BEGIN
        RAISERROR (N'Error: This Employee is currently a Service Staff.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
END;

GO

CREATE OR ALTER TRIGGER DisjointRole_Service_Staff
ON Service_Staff
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted i JOIN Manager r ON i.Citizen_ID = r.Citizen_ID)
    BEGIN
        RAISERROR (N'Error: This Employee is currently a Manager.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM inserted i JOIN Receptionist s ON i.Citizen_ID = s.Citizen_ID)
    BEGIN
        RAISERROR (N'Error: This Employee is currently a Receptionist.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
END;

GO

CREATE OR ALTER TRIGGER CheckServiceTime_WorkShift
ON Perform
AFTER INSERT, UPDATE
AS
BEGIN

    IF EXISTS (
        SELECT 1
        FROM inserted i
        WHERE NOT EXISTS (
            SELECT 1
            FROM Register r
            JOIN Work_Shift s ON r.Shift_ID = s.Shift_ID
            WHERE 
                r.Employee_Citizen_ID = i.Citizen_ID
            
                AND r.Work_Date = CAST(i.Time AS DATE)
                
                AND CAST(i.Time AS TIME) >= s.Start_Time
                AND CAST(i.Time AS TIME) <= s.End_Time
        )
    )
    BEGIN
        RAISERROR (N'Error: This Employee has not registered the work shift.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END; 

GO

CREATE OR ALTER TRIGGER CheckBranch_Receptionist_Room
ON Consist
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
        JOIN Booking b ON i.Booking_ID = b.Booking_ID
        
        JOIN Employee e ON b.Receptionist_Citizen_ID = e.Citizen_ID
        
        WHERE i.Branch_ID <> e.Branch_ID
          AND b.Receptionist_Citizen_ID IS NOT NULL
    )
    BEGIN
        RAISERROR (N'Error: Receptionists are only allowed to create a booking in the branch where they work for.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;
--========================================================================================
--========================================================================================
--========================================================================================
----------------------------------------- PROCEDURES -------------------------------------
--========================================================================================
--========================================================================================
--========================================================================================
GO
-- INSERT PROCEDURES --
----------------------------------------------------------------------------------- INSERT HUMAN
CREATE OR ALTER PROCEDURE InsertHuman
    @Citizen_ID INT,
    @Last_Name VARCHAR(100),
    @First_Name VARCHAR(100),
    @Birth_Date DATE,
    @Email VARCHAR(100),
    @Gender CHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    -- Constraints 
    IF (@Gender NOT IN ('M', 'F'))
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50001, 'Gender must be either M (Male) or F (Female).', 1;
        END;

    IF (@Email NOT LIKE '%@%')
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50002, 'Invalid email format.', 1;
        END;

    IF (@Citizen_ID <= 0)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50003, 'Citizen_ID must be greater than 0.', 1;
        END;

    -- Check duplicate Human
    IF EXISTS (SELECT 1 FROM Human WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50004, 'Human with this Citizen_ID already exists.', 1;
        END;

    INSERT INTO Human (Citizen_ID, Last_Name, First_Name, Birth_Date, Email, Gender)
    VALUES (@Citizen_ID, @Last_Name, @First_Name, @Birth_Date, @Email, @Gender);

    COMMIT TRANSACTION;
END;
GO
----------------------------------------------------------------------------------- INSERT EMPLOYEE
CREATE OR ALTER PROCEDURE InsertEmployee
    @Citizen_ID INT,
    @Salary DECIMAL(10,2),
    @Supervisor_ID INT = NULL,
    @Branch_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

        -- Check Salary
        IF @Salary IS NOT NULL AND @Salary < 0
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50001, 'Salary must be non-negative.', 1;
        END;

        -- Branch exists check
        IF NOT EXISTS (SELECT 1 FROM Branch WHERE Branch_ID = @Branch_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50002, 'This Branch does not exist.', 1;
        END;

        -- Supervisor_ID check
        IF @Supervisor_ID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Employee WHERE Citizen_ID = @Supervisor_ID)
            BEGIN
                ROLLBACK TRANSACTION;
                THROW 50003, 'The supposed Supervisor does not exist or is not an Employee.', 1;
            END;
        END;

        -- check duplicate Employee
        IF EXISTS (SELECT 1 FROM Employee WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50004, 'Employee already exists.', 1;
        END;

        -- Insert Employee
        INSERT INTO Employee (Citizen_ID, Salary, Supervisor_ID, Branch_ID)
        VALUES (@Citizen_ID, @Salary, @Supervisor_ID, @Branch_ID);

    COMMIT TRANSACTION;
END;
----------------------------------------------------------------------------------- INSERT FULL EMPLOYEE
GO
CREATE OR ALTER PROCEDURE InsertFullEmployee
(
    @Citizen_ID INT,
    @Last_Name VARCHAR(100),
    @First_Name VARCHAR(100),
    @Birth_Date DATE,
    @Email VARCHAR(100),
    @Gender CHAR(1),
    @Salary DECIMAL(10,2),
    @Supervisor_ID INT = NULL,
    @Branch_ID INT
)
AS
BEGIN
    SET NOCOUNT ON;
        BEGIN TRANSACTION;

        -- CASE 1: Human exists, just add Employee role
        IF EXISTS (SELECT 1 FROM Human WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            EXEC InsertEmployee
                @Citizen_ID = @Citizen_ID,
                @Salary = @Salary,
                @Supervisor_ID = @Supervisor_ID,
                @Branch_ID = @Branch_ID;
        END

        -- CASE 2: New Human, add both
        ELSE
        BEGIN
            EXEC InsertHuman
                @Citizen_ID = @Citizen_ID,
                @Last_Name = @Last_Name,
                @First_Name = @First_Name,
                @Birth_Date = @Birth_Date,
                @Email = @Email,
                @Gender = @Gender;

            EXEC InsertEmployee
                @Citizen_ID = @Citizen_ID,
                @Salary = @Salary,
                @Supervisor_ID = @Supervisor_ID,
                @Branch_ID = @Branch_ID;
        END

        COMMIT TRANSACTION;
        PRINT 'Employee successfully inserted.';
END;

GO
----------------------------------------------------------------------------------- INSERT MANAGER
CREATE OR ALTER PROCEDURE InsertManager
(
    @Citizen_ID INT,
    @Last_Name VARCHAR(100),
    @First_Name VARCHAR(100),
    @Birth_Date DATE,
    @Email VARCHAR(100),
    @Gender CHAR(1),
    @Salary DECIMAL(10,2),
    @Supervisor_ID INT = NULL,
    @Branch_ID INT
)
AS
BEGIN
    SET NOCOUNT ON;
        BEGIN TRANSACTION;

        IF EXISTS (SELECT 1 FROM Manager WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50004, 'Manager already exists.', 1;
        END;

        -- Check if Employee exists 
        IF NOT EXISTS (SELECT 1 FROM Employee WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            EXEC InsertFullEmployee
                @Citizen_ID = @Citizen_ID,
                @Last_Name = @Last_Name,   
                @First_Name = @First_Name, 
                @Birth_Date = @Birth_Date, 
                @Email = @Email,          
                @Gender = @Gender,         
                @Salary = @Salary,         
                @Supervisor_ID = @Supervisor_ID, 
                @Branch_ID = @Branch_ID;
        END;

        -- Insert Manager
        INSERT INTO Manager (Citizen_ID, Branch_ID)
        VALUES (@Citizen_ID, @Branch_ID);

        COMMIT TRANSACTION;
        PRINT 'Manager successfully inserted.';
END;

GO

----------------------------------------------------------------------------------- INSERT RECEPTIONIST
CREATE OR ALTER PROCEDURE InsertReceptionist
(
    @Citizen_ID INT,
    @Last_Name VARCHAR(100),
    @First_Name VARCHAR(100),
    @Birth_Date DATE,
    @Email VARCHAR(100),
    @Gender CHAR(1),
    @Salary DECIMAL(10,2),
    @Supervisor_ID INT = NULL,
    @Branch_ID INT
)
AS
BEGIN
    SET NOCOUNT ON;
        BEGIN TRANSACTION;

        IF EXISTS (SELECT 1 FROM Receptionist WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50004, 'Receptionist already exists.', 1;
        END;
    
        -- Check if Employee exists
        IF NOT EXISTS (SELECT 1 FROM Employee WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            EXEC InsertFullEmployee
                @Citizen_ID = @Citizen_ID,
                @Last_Name = @Last_Name,   
                @First_Name = @First_Name, 
                @Birth_Date = @Birth_Date, 
                @Email = @Email,           
                @Gender = @Gender,         
                @Salary = @Salary,         
                @Supervisor_ID = @Supervisor_ID, 
                @Branch_ID = @Branch_ID;
        END;

        -- Insert Receptionist
        INSERT INTO Receptionist (Citizen_ID)
        VALUES (@Citizen_ID);

        COMMIT TRANSACTION;
        PRINT 'Receptionist successfully inserted.';
END;

GO
----------------------------------------------------------------------------------- INSERT SERVICE STAFF
CREATE OR ALTER PROCEDURE InsertServiceStaff
(
    @Citizen_ID INT,
    @Last_Name VARCHAR(100),
    @First_Name VARCHAR(100),
    @Birth_Date DATE,
    @Email VARCHAR(100),
    @Gender CHAR(1),
    @Salary DECIMAL(10,2),
    @Supervisor_ID INT = NULL,
    @Branch_ID INT
)
AS
BEGIN
    SET NOCOUNT ON;
        BEGIN TRANSACTION;

        IF EXISTS (SELECT 1 FROM Service_Staff WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50004, 'Service Staff already exists.', 1;
        END;

        -- Check if Employee exists
        IF NOT EXISTS (SELECT 1 FROM Employee WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            EXEC InsertFullEmployee
                @Citizen_ID = @Citizen_ID,
                @Last_Name = @Last_Name,   
                @First_Name = @First_Name, 
                @Birth_Date = @Birth_Date, 
                @Email = @Email,           
                @Gender = @Gender,         
                @Salary = @Salary,         
                @Supervisor_ID = @Supervisor_ID, 
                @Branch_ID = @Branch_ID;
        END;

        -- Insert Service Staff
        INSERT INTO Service_Staff (Citizen_ID)
        VALUES (@Citizen_ID);

        COMMIT TRANSACTION;
        PRINT 'Service Staff successfully inserted.';
    
END;

GO

-- UPDATE PROCEDURES --
-----------------------------------------------------------------------------------  UPDATE HUMAN
CREATE OR ALTER PROCEDURE UpdateHuman
(
    @Citizen_ID INT,
    @Last_Name VARCHAR(100) = NULL,
    @First_Name VARCHAR(100) = NULL,
    @Birth_Date DATE = NULL,
    @Email VARCHAR(100) = NULL,
    @Gender CHAR(1) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    IF NOT EXISTS (SELECT 1 FROM Human WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50001, 'Human does not exist.', 1;
        END;

    IF @Email IS NOT NULL AND @Email NOT LIKE '%@%'
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50002, 'Invalid email format.', 1;
        END;

    IF @Gender IS NOT NULL AND @Gender NOT IN ('M', 'F')
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50003, 'Gender must be M or F.', 1;
        END;

    IF @Birth_Date IS NOT NULL AND DATEDIFF(YEAR, @Birth_Date, GETDATE()) < 18
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50004, 'Person must be at least 18 years old.', 1;
        END;

    UPDATE Human
    SET
        Last_Name   = COALESCE(@Last_Name, Last_Name),
        First_Name  = COALESCE(@First_Name, First_Name),
        Birth_Date  = COALESCE(@Birth_Date, Birth_Date),
        Email       = COALESCE(@Email, Email),
        Gender      = COALESCE(@Gender, Gender)
    WHERE Citizen_ID = @Citizen_ID;

    COMMIT TRANSACTION;
END;
GO
-----------------------------------------------------------------------------------  UPDATE EMPLOYEE
CREATE OR ALTER PROCEDURE UpdateEmployee
(
    @Citizen_ID INT,
    @Salary DECIMAL(10,2) = NULL,
    @Supervisor_ID INT = NULL,
    @Branch_ID INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    IF NOT EXISTS (SELECT 1 FROM Employee WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50001, 'Employee does not exist.', 1;
        END;

    IF @Salary IS NOT NULL AND @Salary < 0
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50002, 'Salary must be non-negative.', 1;
        END;

    IF @Supervisor_ID IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM Employee WHERE Citizen_ID = @Supervisor_ID
    )
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50003, 'Supervisor does not exist.', 1;
        END;

    IF @Branch_ID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM Branch WHERE Branch_ID = @Branch_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50004, 'Branch does not exist.', 1;
        END;

    UPDATE Employee
    SET
        Salary        = COALESCE(@Salary, Salary),
        Supervisor_ID = @Supervisor_ID,
        Branch_ID     = COALESCE(@Branch_ID, Branch_ID)
    WHERE Citizen_ID = @Citizen_ID;

    COMMIT TRANSACTION;
END;
GO

-----------------------------------------------------------------------------------  UPDATE FULL EMPLOYEE
CREATE OR ALTER PROCEDURE UpdateFullEmployee
(
    @Citizen_ID INT,
    @Last_Name VARCHAR(100) = NULL,
    @First_Name VARCHAR(100) = NULL,
    @Birth_Date DATE = NULL,
    @Email VARCHAR(100) = NULL,
    @Gender CHAR(1) = NULL,
    @Salary DECIMAL(10,2) = NULL,
    @Supervisor_ID INT = NULL,
    @Branch_ID INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
        BEGIN TRANSACTION;

        -- Update Human
        EXEC UpdateHuman
           @Citizen_ID = @Citizen_ID,
           @Last_Name = @Last_Name,
           @First_Name = @First_Name,
           @Birth_Date = @Birth_Date,
           @Email = @Email,
           @Gender = @Gender;

        EXEC UpdateEmployee
           @Citizen_ID = @Citizen_ID,
           @Salary = @Salary,
           @Supervisor_ID = @Supervisor_ID,
           @Branch_ID = @Branch_ID;

        COMMIT TRANSACTION;

        PRINT 'Full Employee successfully updated.';
END;


GO
----------------------------------------------------------------------------------- UPDATE MANAGER
CREATE OR ALTER PROCEDURE UpdateManager
(
    @Citizen_ID INT,
    @Last_Name VARCHAR(100) = NULL,
    @First_Name VARCHAR(100) = NULL,
    @Birth_Date DATE = NULL,
    @Email VARCHAR(100) = NULL,
    @Gender CHAR(1) = NULL,
    @Salary DECIMAL(10,2) = NULL,
    @Supervisor_ID INT = NULL,
    @Branch_ID INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
        BEGIN TRANSACTION;

        -- Check Manager exists
        IF NOT EXISTS (SELECT 1 FROM Manager WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50001, 'Manager does not exist.', 1;
        END;

        -- Update Human
        EXEC UpdateHuman
           @Citizen_ID = @Citizen_ID,
           @Last_Name = @Last_Name,
           @First_Name = @First_Name,
           @Birth_Date = @Birth_Date,
           @Email = @Email,
           @Gender = @Gender;

        -- Update Employee
        IF @Branch_ID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Branch WHERE Branch_ID = @Branch_ID)
            BEGIN
                ROLLBACK TRANSACTION;
                THROW 50002, 'Branch does not exist.', 1;
            END;

            EXEC UpdateEmployee
               @Citizen_ID = @Citizen_ID,
               @Salary = @Salary,
               @Supervisor_ID = @Supervisor_ID,
               @Branch_ID = @Branch_ID;

            UPDATE Manager
            SET Branch_ID = COALESCE(@Branch_ID, Branch_ID)
            WHERE Citizen_ID = @Citizen_ID;
        END;

        COMMIT TRANSACTION;

        PRINT 'Manager successfully updated.';
END;
GO
----------------------------------------------------------------------------------- UPDATE RECEPTIONIST
CREATE OR ALTER PROCEDURE UpdateReceptionist
(
    @Citizen_ID INT,
    @Last_Name VARCHAR(100) = NULL,
    @First_Name VARCHAR(100) = NULL,
    @Birth_Date DATE = NULL,
    @Email VARCHAR(100) = NULL,
    @Gender CHAR(1) = NULL,
    @Salary DECIMAL(10,2) = NULL,
    @Supervisor_ID INT = NULL,
    @Branch_ID INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
        BEGIN TRANSACTION;

        -- Check Receptionist exists
        IF NOT EXISTS (SELECT 1 FROM Receptionist WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50003, 'Receptionist does not exist.', 1;
        END;

        -- Update Human
        EXEC UpdateHuman
           @Citizen_ID = @Citizen_ID,
           @Last_Name = @Last_Name,
           @First_Name = @First_Name,
           @Birth_Date = @Birth_Date,
           @Email = @Email,
           @Gender = @Gender;

        -- Update Employee
        IF @Branch_ID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Branch WHERE Branch_ID = @Branch_ID)
            BEGIN
                ROLLBACK TRANSACTION;
                THROW 50004, 'Branch does not exist.', 1;
            END;

            EXEC UpdateEmployee
               @Citizen_ID = @Citizen_ID,
               @Salary = @Salary,
               @Supervisor_ID = @Supervisor_ID,
               @Branch_ID = @Branch_ID;
        END;

        COMMIT TRANSACTION;
        PRINT 'Receptionist successfully updated.';
END;
GO
----------------------------------------------------------------------------------- UPDATE SERVICE STAFF
CREATE OR ALTER PROCEDURE UpdateServiceStaff
(
    @Citizen_ID INT,
    @Last_Name VARCHAR(100) = NULL,
    @First_Name VARCHAR(100) = NULL,
    @Birth_Date DATE = NULL,
    @Email VARCHAR(100) = NULL,
    @Gender CHAR(1) = NULL,
    @Salary DECIMAL(10,2) = NULL,
    @Supervisor_ID INT = NULL,
    @Branch_ID INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
        BEGIN TRANSACTION;

        -- Check Service_Staff exists
        IF NOT EXISTS (SELECT 1 FROM Service_Staff WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50005, 'Service Staff does not exist.', 1;
        END;

        -- Update Human
        EXEC UpdateHuman
           @Citizen_ID = @Citizen_ID,
           @Last_Name = @Last_Name,
           @First_Name = @First_Name,
           @Birth_Date = @Birth_Date,
           @Email = @Email,
           @Gender = @Gender;

        -- Update Employee
        IF @Branch_ID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Branch WHERE Branch_ID = @Branch_ID)
            BEGIN
                ROLLBACK TRANSACTION;
                THROW 50006, 'Branch does not exist.', 1;
            END;

            EXEC UpdateEmployee
               @Citizen_ID = @Citizen_ID,
               @Salary = @Salary,
               @Supervisor_ID = @Supervisor_ID,
               @Branch_ID = @Branch_ID;
        END;

        COMMIT TRANSACTION;
        PRINT 'Service Staff successfully updated.';
END;

GO

-- DELETE PROCEDURES --
----------------------------------------------------------------------------------- DELETE HUMAN
CREATE OR ALTER PROCEDURE DeleteHuman
    @Citizen_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Cannot delete customer
        IF EXISTS (SELECT 1 FROM Customer WHERE Citizen_ID = @Citizen_ID)
        BEGIN
           ROLLBACK TRANSACTION;
            THROW 50010, 'Cannot delete: Human is a registered Customer.', 1;
        END;

        -- If human is Employee → delete employee first (which handles all roles)
        IF EXISTS (SELECT 1 FROM Employee WHERE Citizen_ID = @Citizen_ID)
        BEGIN
            EXEC DeleteEmployee @Citizen_ID;
        END;

        -- Delete Human and related personal info
        DELETE FROM Human_Address WHERE Citizen_ID = @Citizen_ID;
        DELETE FROM Human_Phone_Number WHERE Citizen_ID = @Citizen_ID;
        DELETE FROM Human WHERE Citizen_ID = @Citizen_ID;

        COMMIT TRANSACTION;
        PRINT 'Human deleted successfully.';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW; -- Re-throw so JS can catch
    END CATCH;
END;
GO

----------------------------------------------------------------------------------- DELETE EMPLOYEE

CREATE OR ALTER PROCEDURE DeleteEmployee
    @Citizen_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM Employee WHERE Citizen_ID = @Citizen_ID)
        BEGIN
           ROLLBACK TRANSACTION;
            THROW 50020, 'Employee does not exist.', 1;
        END;

        -- Has future shifts
        IF EXISTS (
            SELECT 1 FROM Register
            WHERE Employee_Citizen_ID = @Citizen_ID
              AND Work_Date >= CAST(GETDATE() AS DATE)
        )
           
         BEGIN
           ROLLBACK TRANSACTION;
            THROW 50021, 'Cannot delete: Employee has current or future shifts.', 1;
        END;

        -- Forward delete by role
        IF EXISTS (SELECT 1 FROM Manager WHERE Citizen_ID = @Citizen_ID)
            EXEC DeleteManager @Citizen_ID;

        ELSE IF EXISTS (SELECT 1 FROM Receptionist WHERE Citizen_ID = @Citizen_ID)
            EXEC DeleteReceptionist @Citizen_ID;

        ELSE IF EXISTS (SELECT 1 FROM Service_Staff WHERE Citizen_ID = @Citizen_ID)
            EXEC DeleteServiceStaff @Citizen_ID;

        -- Delete past shift logs
        DELETE FROM Register
        WHERE Employee_Citizen_ID = @Citizen_ID
          AND Work_Date < CAST(GETDATE() AS DATE);

        -- Delete employee and human
        DELETE FROM Employee WHERE Citizen_ID = @Citizen_ID;
        DELETE FROM Human_Address WHERE Citizen_ID = @Citizen_ID;
        DELETE FROM Human_Phone_Number WHERE Citizen_ID = @Citizen_ID;
        DELETE FROM Human WHERE Citizen_ID = @Citizen_ID;

        COMMIT TRANSACTION;
        PRINT 'Employee deleted successfully.';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------------------------------------------- DELETE MANAGER

CREATE OR ALTER PROCEDURE DeleteManager
    @Citizen_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM Manager WHERE Citizen_ID = @Citizen_ID)
                BEGIN
    ROLLBACK TRANSACTION;
        THROW 50030, 'Manager does not exist.', 1;
        RETURN;
    END;

        IF EXISTS (SELECT 1 FROM Employee WHERE Supervisor_ID = @Citizen_ID)
    BEGIN

        ROLLBACK TRANSACTION;
        THROW 50031, 'Cannot delete Manager: supervisor of employees.', 1;
        RETURN;
    END;


        UPDATE Receipt SET Manager_ID = NULL WHERE Manager_ID = @Citizen_ID;

        DELETE FROM Manager WHERE Citizen_ID = @Citizen_ID;

        COMMIT TRANSACTION;
        PRINT 'Manager deleted successfully.';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------------------------------------------- DELETE RECEPTIONIST
CREATE OR ALTER PROCEDURE DeleteReceptionist
    @Citizen_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM Receptionist WHERE Citizen_ID = @Citizen_ID)

                BEGIN
        
        ROLLBACK TRANSACTION;
                    THROW 50040, 'Receptionist does not exist.', 1;
        RETURN;
    END;

        -- Unfinished bookings
        IF EXISTS (
            SELECT 1 FROM Booking
            WHERE Receptionist_Citizen_ID = @Citizen_ID
              AND (Check_out_Time IS NULL OR Check_out_Time >= GETDATE())
        )
        
BEGIN
        ROLLBACK TRANSACTION;
        THROW 50041, 'Cannot delete: Receptionist has unfinished bookings.', 1;
        RETURN;
    END;

        UPDATE Booking
        SET Receptionist_Citizen_ID = NULL
        WHERE Receptionist_Citizen_ID = @Citizen_ID
          AND Check_out_Time < GETDATE();

        UPDATE Receipt
        SET Receptionist_Citizen_ID = NULL
        WHERE Receptionist_Citizen_ID = @Citizen_ID;

        DELETE FROM Receptionist WHERE Citizen_ID = @Citizen_ID;

        COMMIT TRANSACTION;
        PRINT 'Receptionist deleted successfully.';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------------------------------------------- DELETE SERVICE STAFF
CREATE OR ALTER PROCEDURE DeleteServiceStaff
    @Citizen_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM Service_Staff WHERE Citizen_ID = @Citizen_ID)
            BEGIN
        ROLLBACK TRANSACTION;
        THROW 50050, 'Service staff does not exist.', 1;
        RETURN;
    END;

        IF EXISTS (
            SELECT 1 FROM Perform
            WHERE Citizen_ID = @Citizen_ID
              AND Time >= GETDATE()
        )
            
   BEGIN
        ROLLBACK TRANSACTION;
        THROW 50051, 'Cannot delete: Service staff has future performs.', 1;
        RETURN;
    END;

        DELETE FROM Perform
        WHERE Citizen_ID = @Citizen_ID
          AND Time < GETDATE();

        DELETE FROM Service_Staff WHERE Citizen_ID = @Citizen_ID;

        COMMIT TRANSACTION;
        PRINT 'Service staff and past performs deleted successfully.';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH;

END;
GO
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-- DERIVED ATTRIBUTE CALCULATIONS --
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
GO

CREATE OR ALTER TRIGGER UpdateBranchEmployeeCount
ON Employee
AFTER INSERT, DELETE, UPDATE
AS
BEGIN
    ;WITH ChangedBranches AS (
        SELECT Branch_ID FROM inserted WHERE Branch_ID IS NOT NULL
        UNION
        SELECT Branch_ID FROM deleted WHERE Branch_ID IS NOT NULL
    )

    UPDATE Branch
    SET Branch.TotalEmployees =
        (
            SELECT COUNT(*)
            FROM Employee e
            WHERE e.Branch_ID = Branch.Branch_ID
        )
    FROM Branch 
    JOIN ChangedBranches cb ON Branch.Branch_ID = cb.Branch_ID;
END;

GO
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-- BUSINESS CONSTRAINTS --
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
CREATE OR ALTER TRIGGER CheckManagerSupervisor
ON Employee
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted i
        WHERE i.Supervisor_ID IS NOT NULL
          AND EXISTS (
                SELECT 1
                FROM Manager m1
                WHERE m1.Citizen_ID = i.Citizen_ID 
            )
          AND NOT EXISTS (
                SELECT 1
                FROM Manager m2
                WHERE m2.Citizen_ID = i.Supervisor_ID
            )
    )
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50010, 'A Manager can only be supervised by another Manager.', 1;
    END
END;
GO
-----------------------------------------------------------------------------------
CREATE OR ALTER TRIGGER CheckBranchUpdate
ON Employee
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    -- Only check rows where Branch_ID actually changed
    IF EXISTS (
        SELECT 1
        FROM inserted i
        JOIN deleted d ON i.Citizen_ID = d.Citizen_ID
        WHERE i.Branch_ID <> d.Branch_ID
    )
    BEGIN
        -- Check if this employee supervises anyone
        IF EXISTS (
            SELECT 1
            FROM Employee e
            JOIN inserted i ON e.Supervisor_ID = i.Citizen_ID
            JOIN deleted d ON i.Citizen_ID = d.Citizen_ID
            WHERE i.Branch_ID <> d.Branch_ID
        )
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50011, 'Cannot change branch: this employee supervises other employees.', 1;
        END

        -- Check if supervisor will be in a different branch
        IF EXISTS (
            SELECT 1
            FROM inserted i
            JOIN Employee sup ON i.Supervisor_ID = sup.Citizen_ID
            JOIN deleted d ON i.Citizen_ID = d.Citizen_ID
            WHERE i.Branch_ID <> d.Branch_ID
              AND sup.Branch_ID <> i.Branch_ID
        )
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50012, 'Cannot change branch: supervisor would be in a different branch.', 1;
        END
    END
END;
GO
-----------------------------------------------------------------------------------
CREATE OR ALTER TRIGGER CheckSupervisor
ON Employee
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM Inserted e
        JOIN Employee s ON e.Supervisor_ID = s.Citizen_ID
        WHERE e.Supervisor_ID IS NOT NULL
          AND e.Branch_ID <> s.Branch_ID
    )
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50013, 'Supervisor must be in the same branch as the employee.', 1;
    END;

END;
GO
-----------------------------------------------------------------------------------
CREATE OR ALTER TRIGGER PreventIDUpdate_Human
ON Human
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Citizen_ID)
    BEGIN
        IF EXISTS (
            SELECT 1
            FROM inserted i
            JOIN deleted d ON i.Citizen_ID = d.Citizen_ID
            WHERE i.Citizen_ID <> d.Citizen_ID
        )
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50014, 'Cannot edit Citizen_ID in Human.', 1;
        END
    END
END;
-----------------------------------------------------------------------------------
GO
CREATE OR ALTER TRIGGER PreventIDUpdate_Employee
ON Employee
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Citizen_ID)
    BEGIN
        IF EXISTS (
            SELECT 1
            FROM inserted i
            JOIN deleted d ON i.Citizen_ID = d.Citizen_ID
            WHERE i.Citizen_ID <> d.Citizen_ID
        )
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50015, 'Cannot edit Citizen_ID in Employee.', 1;
        END
    END
END;


---------------------------------------------------------------------------------------
-- SAMPLE DATA
---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------
------------------------------------------------------------
-- 1. BRANCH
------------------------------------------------------------
INSERT INTO Branch (Branch_ID, Branch_Name, Branch_Address, TotalEmployees) VALUES
(1, 'Downtown Branch', '1 Main St, City', 3),
(2, 'Airport Branch',  '2 Sky Road, City', 3),
(3, 'Beach Branch',    '3 Ocean Ave, City', 3),
(4, 'Mountain Branch', '4 Hill St, City', 3),
(5, 'Suburb Branch',   '5 Green Blvd, City', 3);

------------------------------------------------------------
-- 2. ROOM TYPE
------------------------------------------------------------
INSERT INTO Room_Type (Room_Type_ID, Room_Name, Description, Max_Occupancy, Price_Level) VALUES
(1, 'Standard Single', '1 bed, city view',             1, 'Low'),
(2, 'Standard Double', '2 beds, city view',            2, 'Medium'),
(3, 'Deluxe',          'Large room with balcony',      3, 'High'),
(4, 'Suite',           'Separate living room & bed',   4, 'High'),
(5, 'Family',          'Family room with 3 beds',      5, 'Medium');

------------------------------------------------------------
-- 3. ROOM
------------------------------------------------------------
INSERT INTO Room (Room_No, Branch_ID, Status, Room_Type_ID) VALUES
(101, 1, 'Available', 1),
(102, 1, 'Available', 2),
(201, 2, 'Available', 2),
(301, 3, 'Available', 3),
(401, 4, 'Available', 4),
(501, 5, 'Available', 5);

------------------------------------------------------------
-- 4. FURNITURE
------------------------------------------------------------
INSERT INTO Furniture (Furniture_ID, Name, Category) VALUES
(1, 'Queen Bed',   'Furniture'),
(2, 'Writing Desk','Furniture'),
(3, 'Armchair',    'Furniture'),
(4, 'LED TV',      'Appliance'),
(5, 'Wardrobe',    'Furniture');

------------------------------------------------------------
-- 5. HAS 
------------------------------------------------------------
INSERT INTO Has (Furniture_ID, Room_No, Branch_ID) VALUES
(1, 101, 1),
(2, 101, 1),
(3, 102, 1),
(4, 201, 2),
(5, 301, 3);

------------------------------------------------------------
-- 6. SERVICE TYPE 
------------------------------------------------------------
INSERT INTO Service_Type (Service_Type_ID, Category_Name) VALUES
(1,  'Laundry - Wash & Fold'),
(2,  'Laundry - Express'),
(3,  'Dry Cleaning'),
(4,  'Laundry - Towels'),
(5,  'Laundry - Bedding'),
(6,  'Breakfast Buffet'),
(7,  'Room Service Meal'),
(8,  'Mini Bar Refill'),
(9,  'Coffee & Snacks'),
(10, 'Fine Dining');

------------------------------------------------------------
-- 7. LAUNDRY 
------------------------------------------------------------
INSERT INTO Laundry (Service_Type_ID, Default_Price, Price_per_next_kg, Weight) VALUES
(1,  5.00,  2.00, 1.00),
(2,  8.00,  3.00, 1.00),
(3, 10.00,  4.00, 1.00),
(4,  6.00,  2.50, 1.00),
(5, 12.00,  5.00, 1.00);

------------------------------------------------------------
-- 8. FOOD_BEVERAGE 
------------------------------------------------------------
INSERT INTO Food_Beverage (Service_Type_ID, Price, Serving) VALUES
(6,  10.00, 'Buffet breakfast'),
(7,  25.00, 'Full meal'),
(8,  15.00, 'Mini bar items'),
(9,   5.00, 'Coffee and snacks'),
(10, 40.00, 'Fine dining menu');

------------------------------------------------------------
-- 9. ADDITIONAL_SERVICE 
------------------------------------------------------------
INSERT INTO Additional_Service (Service_ID, Price, Description, Service_Name, Service_Type_ID) VALUES
(100, 15.00, 'Extra pillow and blanket',  'Extra Bedding',      5),
(101, 20.00, 'Express laundry within 3h', 'Express Laundry',    2),
(102, 10.00, 'Breakfast in bed',          'Breakfast in Bed',   6),
(103, 30.00, 'Mini bar full refill',      'Mini Bar Refill',    8),
(104, 80.00, 'Full spa massage package',  'Spa Package',       10);

------------------------------------------------------------
-- 10. WORK_SHIFT 
------------------------------------------------------------
INSERT INTO Work_Shift (Shift_ID, Shift_Name, Start_Time, End_Time) VALUES
(1, 'Morning',   '08:00:00', '12:00:00'),
(2, 'Afternoon', '12:00:00', '16:00:00'),
(3, 'Evening',   '16:00:00', '20:00:00'),
(4, 'Night',     '20:00:00', '23:00:00'),
(5, 'Early',     '06:00:00', '08:00:00');

------------------------------------------------------------
-- 11. HUMAN 
------------------------------------------------------------
INSERT INTO Human (Citizen_ID, Last_Name, First_Name, Birth_Date, Email, Gender) VALUES
(100001001, 'Nguyen', 'An',      '1988-01-10', 'an.nguyen1@example.com',      'M'),
(100001002, 'Tran',   'Binh',    '1985-03-15', 'binh.tran2@example.com',      'M'),
(100001003, 'Le',     'Chau',    '1987-07-20', 'chau.le3@example.com',        'F'),
(100001004, 'Pham',   'Dung',    '1989-11-05', 'dung.pham4@example.com',      'M'),
(100001005, 'Hoang',  'Em',      '1990-09-09', 'em.hoang5@example.com',       'F'),

(100001006, 'Vu',     'Hoa',     '1995-02-02', 'hoa.vu6@example.com',         'F'),
(100001007, 'Do',     'Khanh',   '1994-06-30', 'khanh.do7@example.com',       'M'),
(100001008, 'Bui',    'Linh',    '1993-04-18', 'linh.bui8@example.com',       'F'),
(100001009, 'Dang',   'Minh',    '1992-12-25', 'minh.dang9@example.com',      'M'),
(100001010, 'Ngo',    'Nam',     '1991-10-01', 'nam.ngo10@example.com',       'M'),

(100001011, 'Ly',     'Oanh',    '1996-05-05', 'oanh.ly11@example.com',       'F'),
(100001012, 'Truong', 'Phuong',  '1997-08-08', 'phuong.truong12@example.com', 'F'),
(100001013, 'Mai',    'Quang',   '1995-09-09', 'quang.mai13@example.com',     'M'),
(100001014, 'Phan',   'Son',     '1994-01-20', 'son.phan14@example.com',      'M'),
(100001015, 'Huynh',  'Trang',   '1993-03-03', 'trang.huynh15@example.com',   'F'),

(100001016, 'Nguyen', 'Uyen',    '2000-04-04', 'uyen.nguyen16@example.com',   'F'),
(100001017, 'Tran',   'Viet',    '2001-06-06', 'viet.tran17@example.com',     'M'),
(100001018, 'Le',     'Xuan',    '2002-07-07', 'xuan.le18@example.com',       'M'),
(100001019, 'Pham',   'Yen',     '2003-08-08', 'yen.pham19@example.com',      'F'),
(100001020, 'Ho',     'Zung',    '2004-09-09', 'zung.ho20@example.com',       'M');

------------------------------------------------------------
-- 12. HUMAN_PHONE_NUMBER 
------------------------------------------------------------
INSERT INTO Human_Phone_Number (Phone_Number, Citizen_ID) VALUES
('0900000001', 100001001),
('0900000002', 100001002),
('0900000003', 100001003),
('0900000004', 100001004),
('0900000005', 100001005),
('0900000006', 100001006),
('0900000007', 100001007),
('0900000008', 100001008),
('0900000009', 100001009),
('0900000010', 100001010);

------------------------------------------------------------
-- 13. HUMAN_ADDRESS 
------------------------------------------------------------
INSERT INTO Human_Address (Address, Citizen_ID) VALUES
('10 Street A, City', 100001001),
('20 Street B, City', 100001002),
('30 Street C, City', 100001003),
('40 Street D, City', 100001004),
('50 Street E, City', 100001005),
('60 Street F, City', 100001006),
('70 Street G, City', 100001007),
('80 Street H, City', 100001008),
('90 Street I, City', 100001009),
('100 Street J, City', 100001010);

------------------------------------------------------------
-- 14. EMPLOYEE 
------------------------------------------------------------
-- Managers
INSERT INTO Employee (Citizen_ID, Salary, Supervisor_ID, Branch_ID) VALUES
(100001001, 5000.00, NULL,       1),
(100001002, 5200.00, NULL,       2),
(100001003, 5300.00, NULL,       3),
(100001004, 5400.00, NULL,       4),
(100001005, 5500.00, NULL,       5);

-- Receptionists 
INSERT INTO Employee (Citizen_ID, Salary, Supervisor_ID, Branch_ID) VALUES
(100001006, 3000.00, 100001001,  1),
(100001007, 3100.00, 100001002,  2),
(100001008, 3200.00, 100001003,  3),
(100001009, 3300.00, 100001004,  4),
(100001010, 3400.00, 100001005,  5);

-- Service Staff 
INSERT INTO Employee (Citizen_ID, Salary, Supervisor_ID, Branch_ID) VALUES
(100001011, 2500.00, 100001001,  1),
(100001012, 2600.00, 100001002,  2),
(100001013, 2700.00, 100001003,  3),
(100001014, 2800.00, 100001004,  4),
(100001015, 2900.00, 100001005,  5);

------------------------------------------------------------
-- 15. MANAGER 
------------------------------------------------------------
INSERT INTO Manager (Citizen_ID, Branch_ID) VALUES
(100001001, 1),
(100001002, 2),
(100001003, 3),
(100001004, 4),
(100001005, 5);

------------------------------------------------------------
-- 16. RECEPTIONIST 
------------------------------------------------------------
INSERT INTO Receptionist (Citizen_ID) VALUES
(100001006),
(100001007),
(100001008),
(100001009),
(100001010);

------------------------------------------------------------
-- 17. SERVICE_STAFF 
------------------------------------------------------------
INSERT INTO Service_Staff (Citizen_ID) VALUES
(100001011),
(100001012),
(100001013),
(100001014),
(100001015);

------------------------------------------------------------
-- 18. CUSTOMER 
------------------------------------------------------------
INSERT INTO Customer (Citizen_ID) VALUES
(100001016),
(100001017),
(100001018),
(100001019),
(100001020);

------------------------------------------------------------
-- 19. MEMBER_ACCOUNT 
------------------------------------------------------------
INSERT INTO Member_Account (User_ID, Customer_Citizen_ID, Account_Tier, Creation_Date, Password, User_Name) VALUES
(1, 100001016, 'Silver', '2025-01-01', 'pass1', 'uyen16'),
(2, 100001017, 'Gold',   '2025-01-02', 'pass2', 'viet17'),
(3, 100001018, 'Silver', '2025-01-03', 'pass3', 'xuan18'),
(4, 100001019, 'Platinum','2025-01-04','pass4', 'yen19'),
(5, 100001020, 'Gold',   '2025-01-05', 'pass5', 'zung20');

------------------------------------------------------------
-- 20. REGISTER 
------------------------------------------------------------
INSERT INTO Register (Employee_Citizen_ID, Shift_ID, Work_Date) VALUES
(100001011, 1, '2025-01-10'),  -- Morning
(100001012, 2, '2025-01-11'),  -- Afternoon
(100001013, 3, '2025-01-12'),  -- Evening
(100001014, 1, '2025-01-13'),  -- Morning
(100001015, 2, '2025-01-14');  -- Afternoon

------------------------------------------------------------
-- 21. RECEIPT 
------------------------------------------------------------
INSERT INTO Receipt (Receipt_ID, Issue_Time, Manager_ID, Receptionist_Citizen_ID) VALUES
(1, '2025-01-05 10:00:00', 100001001, 100001006), -- Branch 1
(2, '2025-02-05 11:00:00', 100001002, 100001007), -- Branch 2
(3, '2025-03-05 12:00:00', 100001003, 100001008), -- Branch 3
(4, '2025-04-05 13:00:00', 100001004, 100001009), -- Branch 4
(5, '2025-05-05 14:00:00', 100001005, 100001010); -- Branch 5

------------------------------------------------------------
-- 22. BOOKING
------------------------------------------------------------
INSERT INTO Booking
(Booking_ID, Booking_Time, Check_in_Time, Check_out_Time, CheckIn,   CheckOut,   Customer_Citizen_ID, Receptionist_Citizen_ID, Receipt_ID)
VALUES
(1, '2025-01-05 10:05:00', '2025-01-10 14:00:00', '2025-01-12 11:00:00', '2025-01-10', '2025-01-12', 100001016, 100001006, 1),
(2, '2025-02-05 10:05:00', '2025-02-11 14:00:00', '2025-02-13 11:00:00', '2025-02-11', '2025-02-13', 100001017, 100001007, 2),
(3, '2025-03-05 10:05:00', '2025-03-15 14:00:00', '2025-03-17 11:00:00', '2025-03-15', '2025-03-17', 100001018, 100001008, 3),
(4, '2025-04-05 10:05:00', '2025-04-20 14:00:00', '2025-04-22 11:00:00', '2025-04-20', '2025-04-22', 100001019, 100001009, 4),
(5, '2025-05-05 10:05:00', '2025-05-25 14:00:00', '2025-05-27 11:00:00', '2025-05-25', '2025-05-27', 100001020, 100001010, 5);

------------------------------------------------------------
-- 23. CONSIST 
------------------------------------------------------------
INSERT INTO Consist (Booking_ID, Room_No, Branch_ID) VALUES
(1, 101, 1),  -- Booking 1, Branch 1
(2, 201, 2),  -- Booking 2, Branch 2
(3, 301, 3),  -- Booking 3, Branch 3
(4, 401, 4),  -- Booking 4, Branch 4
(5, 501, 5);  -- Booking 5, Branch 5

------------------------------------------------------------
-- 24. PERFORM 
------------------------------------------------------------
INSERT INTO Perform (Service_Type_ID, Citizen_ID, Time) VALUES
(1, 100001011, '2025-01-10 09:00:00'), -- Staff 100001011, Shift 1 (08-12)
(2, 100001012, '2025-01-11 13:30:00'), -- Staff 100001012, Shift 2 (12-16)
(3, 100001013, '2025-01-12 18:00:00'), -- Staff 100001013, Shift 3 (16-20)
(4, 100001014, '2025-01-13 09:30:00'), -- Staff 100001014, Shift 1 (08-12)
(5, 100001015, '2025-01-14 13:00:00'); -- Staff 100001015, Shift 2 (12-16)

------------------------------------------------------------
-- 25. REQUIRE 
------------------------------------------------------------
INSERT INTO Require (Booking_ID, Service_Type_ID, Number_of_times) VALUES
(1, 1,  2), 
(2, 6,  1),  
(3, 7,  3),  
(4, 2,  1),  
(5, 10, 2);  