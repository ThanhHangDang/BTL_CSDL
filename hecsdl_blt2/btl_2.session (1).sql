USE btl_2;
-- Create user table
CREATE TABLE user (
    UserID INT NOT NULL AUTO_INCREMENT,
    Username varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    PhoneNumber varchar(20) NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    PRIMARY KEY (UserID, UserName, Email),
    CHECK (
        PhoneNumber LIKE '0%'
        AND LENGTH(PhoneNumber) = 10
    )
);
CREATE TABLE address_user(
    UserID INT NOT NULL,
    AddressNumber INT NOT NULL,
    Street VARCHAR(50) NOT NULL,
    City VARCHAR(255) NOT NULL,
    PRIMARY KEY (UserID),
    CONSTRAINT fk_address_user_user FOREIGN KEY (UserID) REFERENCES user(UserID)
);
-- Create seller table
CREATE TABLE seller(
    UserID INT NOT NULL,
    StoreName VARCHAR(255) NOT NULL,
    PRIMARY KEY (UserID),
    CONSTRAINT fk_seller_user FOREIGN KEY (UserID) REFERENCES user(UserID)
);
-- Create buyer table
CREATE TABLE buyer(
    UserID INT NOT NULL,
    PRIMARY KEY (UserID),
    CONSTRAINT fk_buyer_user FOREIGN KEY (UserID) REFERENCES user(UserID)
);
-- Create catergory table
CREATE TABLE category(
    CategoryID INT NOT NULL,
    CategoryName VARCHAR(255) NOT NULL,
    PRIMARY KEY (CategoryID)
);
-- Create product table
CREATE TABLE product(
    ProductID INT NOT NULL AUTO_INCREMENT,
    ProductName VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Quantity INT DEFAULT 0 CHECK (Quantity >= 0),
    CategoryID INT NOT NUll,
    ImageURL VARCHAR(255) NOT NULL,
    UserID INT NOT NULL,
    Description TEXT NOT NULL,
    PRIMARY KEY (ProductID),
    CONSTRAINT fk_product_category FOREIGN KEY (CategoryID) REFERENCES category(CategoryID),
    CONSTRAINT fk_product_seller FOREIGN KEY (UserID) REFERENCES seller(UserID)
);
-- Create cart table
CREATE TABLE cart(
    CartID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL UNIQUE,
    PRIMARY KEY (CartID),
    CONSTRAINT fk_cart_user FOREIGN KEY (UserID) REFERENCES user(UserID)
);
-- Create cart_product table
CREATE TABLE cart_product(
    CartID INT NOT NULL,
    ProductID INT NOT NUll,
    Quantity INT,
    CONSTRAINT fk_cart_product_cart FOREIGN KEY (CartID) REFERENCES cart(CartID),
    CONSTRAINT fk_cart_product_product FOREIGN KEY (ProductID) REFERENCES product(ProductID)
);
-- Create Payment Method Table
CREATE TABLE paymentmethod(
    PaymentMethodID INT NOT NULL,
    MethodName VARCHAR(255) NOT NULL,
    Description VARCHAR(255),
    PRIMARY KEY (PaymentMethodID)
);
-- Create Shipping Table
CREATE Table shipping(
    ShippingID INT NOT NULL,
    ShippingCompany VARCHAR(255) NOT NULL,
    PRIMARY KEY (ShippingID)
);
-- Create discount table
CREATE TABLE discount (
    DiscountID INT NOT NULL,
    StartDate VARCHAR(255) NOT NULL,
    EndDate VARCHAR(255) NOT NULL,
    Description VARCHAR(255),
    PRIMARY KEY (DiscountID)
);
-- Create discount by price table
CREATE TABLE discount_by_price (
    DiscountID INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    -- Use DECIMAL for currency values
    PRIMARY KEY (DiscountID),
    CONSTRAINT fk_discount_price_discount FOREIGN KEY (DiscountID) REFERENCES discount(DiscountID)
);
-- Create discount by percent table
CREATE TABLE discount_by_percent (
    DiscountID INT NOT NULL,
    Percent DECIMAL(5, 2) NOT NULL,
    -- Use DECIMAL for percentages
    PRIMARY KEY (DiscountID),
    CONSTRAINT fk_discount_percent_discount FOREIGN KEY (DiscountID) REFERENCES discount(DiscountID)
);
-- Create order table
CREATE TABLE orders(
    OrderID INT NOT NULL AUTO_INCREMENT,
    TotalAmount INT NULL,
    OrderDate VARCHAR(255) NOT NULL,
    BuyerID INT NOT NULL,
    PaymentMethodID INT NOT NULL,
    ShippingID INT NOT NULL,
    OrderStatus VARCHAR(255),
    PaymentStatus VARCHAR(255),
    ShippingCost VARCHAR(255),
    SellerID INT NOT NULL,
    DiscountID INT NOT NULL,
    PRIMARY KEY (OrderID),
    CONSTRAINT fk_order_buyer FOREIGN KEY (BuyerID) REFERENCES buyer(UserID),
    CONSTRAINT fk_order_paymentmethod FOREIGN KEY (PaymentMethodID) REFERENCES paymentmethod(PaymentMethodID),
    CONSTRAINT fk_order_shipping FOREIGN KEY (ShippingID) REFERENCES shipping(ShippingID),
    CONSTRAINT fk_order_seller FOREIGN KEY (SellerID) REFERENCES seller(UserID),
    CONSTRAINT fk_orders_discount FOREIGN KEY (DiscountID) REFERENCES discount(DiscountID)
);
-- Need fix
CREATE TABLE order_review (
    ReviewID INT NOT NULL,
    Rating INT NOT NULL,
    Comment VARCHAR(255),
    ReviewDate VARCHAR(255),
    OrderID INT NOT NULL,
    PRIMARY KEY (ReviewID),
    CONSTRAINT fk_order_review_order FOREIGN KEY (OrderID) REFERENCES orders(OrderID),
    CHECK (
        Rating BETWEEN 0 AND 5
    )
);
-- -- Create danh gia table
-- CREATE TABLE review(
--     ReviewID INT NOT NULL,
--     OrderID INT NOT NULL,
--     ProductID INT NOT NUll,
-- );
-- Create order_item table
CREATE TABLE order_item(
    OrderID INT NOT NULL,
    CartID INT NOT NULL,
    CreateDate VARCHAR(255) NOT NULL,
    PRIMARY KEY (OrderID),
    CONSTRAINT fk_order_item_cart FOREIGN KEY(CartID) REFERENCES cart(CartID),
    CONSTRAINT fk_order_item_orders FOREIGN KEY (OrderID) REFERENCES orders(OrderID)
);
-- -- Create order_discount table
-- CREATE TABLE order_discount(
--     DiscountID INT NOT NULL,
--     OrderID INT NOT NULL,
--     PRIMARY KEY (DiscountID, OrderID),
--     CONSTRAINT fk_order_discount_discount FOREIGN KEY (DiscountID) REFERENCES discount(DiscountID),
--     CONSTRAINT fk_order_discount_orders FOREIGN KEY (OrderID) REFERENCES orders(OrderID)
-- );
-- Fake data ---------------------------------------------------------------------------------------------------------
-- User 
-- Insert fake data into user table
INSERT INTO user (
        Username,
        Password,
        Email,
        PhoneNumber,
        LastName,
        FirstName
    )
VALUES (
        'user1',
        '16012003',
        'user1@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Nguyen',
        'An'
    ),
    (
        'user2',
        '16012003',
        'user2@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Pham',
        'Binh'
    ),
    (
        'user3',
        '16012003',
        'user3@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Tran',
        'Cuong'
    ),
    (
        'user4',
        '16012003',
        'user4@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Le',
        'Dai'
    ),
    (
        'user5',
        '16012003',
        'user5@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Doan',
        'Hoa'
    ),
    (
        'user6',
        '16012003',
        'user6@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Nguyen',
        'Kien'
    ),
    (
        'user7',
        '16012003',
        'user7@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Pham',
        'Lan'
    ),
    (
        'user8',
        '16012003',
        'user8@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Tran',
        'Minh'
    ),
    (
        'user9',
        '16012003',
        'user9@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Le',
        'Nhat'
    ),
    (
        'user10',
        '16012003',
        'user10@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Doan',
        'Phuc'
    ),
    (
        'user11',
        '16012003',
        'user11@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Nguyen',
        'Quang'
    ),
    (
        'user12',
        '16012003',
        'user12@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Pham',
        'Rach'
    ),
    (
        'user13',
        '16012003',
        'user13@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Tran',
        'Tung'
    ),
    (
        'user14',
        '16012003',
        'user14@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Le',
        'Vinh'
    ),
    (
        'user15',
        '16012003',
        'user15@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Doan',
        'Yen'
    ),
    (
        'user16',
        '16012003',
        'user16@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Nguyen',
        'Anh'
    ),
    (
        'user17',
        '16012003',
        'user17@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Pham',
        'Bich'
    ),
    (
        'user18',
        '16012003',
        'user18@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Tran',
        'Canh'
    ),
    (
        'user19',
        '16012003',
        'user19@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Le',
        'Dai'
    ),
    (
        'user20',
        '16012003',
        'user20@example.com',
        CONCAT('0', FLOOR(100000000 + (RAND() * 900000000))),
        'Doan',
        'Duong'
    );
-- Insert to address table 
-- Insert fake data into address_user table
INSERT INTO address_user (UserID, AddressNumber, Street, City)
VALUES (1, 123, 'Main Street', 'Hanoi'),
    (
        2,
        456,
        'Nguyen Thi Minh Khai',
        'Ho Chi Minh City'
    ),
    (3, 789, 'Le Lai', 'Da Nang'),
    (4, 101, 'Tran Phu', 'Hue'),
    (5, 202, 'Pham Ngoc Thach', 'Can Tho'),
    (6, 303, 'Bach Dang', 'Nha Trang'),
    (7, 404, 'Quang Trung', 'Ha Long'),
    (8, 505, 'Le Duan', 'Ha Noi'),
    (9, 606, 'Dong Khoi', 'HCM'),
    (10, 707, 'Ngo Quyen', 'Vinh'),
    (11, 808, 'Pham Xuan Anh', 'Dong Nai'),
    (12, 909, 'Tao Dan', 'Hai Phong'),
    (13, 1001, 'Ly Thuong Kiet', 'Quang Nam'),
    (14, 1102, 'Hoang Hoa Tham', 'Binh Duong'),
    (15, 1203, 'Cao Thang', 'Bac Ninh'),
    (16, 1304, 'An Duong Vuong', 'Bac Giang'),
    (17, 1405, 'Hong Bang', 'Quang Ngai'),
    (18, 1506, 'Nguyen Dinh Chieu', 'Vinh Long'),
    (19, 1607, 'Dai Loc', 'Thanh Hoa'),
    (20, 1708, 'Nguyen Hieu', 'Quang Binh');
-- Insert into buyer and seller 
-- Insert data into seller table
INSERT INTO seller (UserID, StoreName)
VALUES (1, 'Tech World'),
    (3, 'Gourmet Eats'),
    (5, 'Fashion Hub'),
    (7, 'Home Appliances'),
    (9, 'Books Galore'),
    (11, 'Music Store'),
    (13, 'Gadget Store'),
    (15, 'Beauty Corner'),
    (17, 'Fitness Shop'),
    (19, 'Pet Paradise');
-- Insert data into buyer table
INSERT INTO buyer (UserID)
VALUES (2),
    (4),
    (6),
    (8),
    (10),
    (12),
    (14),
    (16),
    (18),
    (20);
-- Insert data into category table
INSERT INTO category (CategoryID, CategoryName)
VALUES (1, 'Office Chairs'),
    (2, 'Desks'),
    (3, 'Stationery'),
    (4, 'Filing Cabinets'),
    (5, 'Printers'),
    (6, 'Laptops & Computers'),
    (7, 'Office Decor'),
    (8, 'Office Lighting'),
    (9, 'Whiteboards & Chalkboards'),
    (10, 'Conference Room Equipment');
INSERT INTO discount (DiscountID, StartDate, EndDate, Description)
VALUES (
        1,
        '2024-11-01',
        '2024-11-30',
        'Black Friday Sale'
    ),
    (
        2,
        '2024-12-01',
        '2024-12-15',
        'Christmas Special'
    ),
    (
        3,
        '2024-12-20',
        '2024-12-31',
        'End of Year Clearance'
    ),
    (
        4,
        '2024-11-15',
        '2024-11-25',
        'Cyber Monday Deals'
    ),
    (
        5,
        '2024-11-10',
        '2024-11-20',
        'Back to School Promotion'
    ),
    (
        6,
        '2024-12-05',
        '2024-12-10',
        'Holiday Discount Week'
    ),
    (
        7,
        '2024-11-01',
        '2024-11-10',
        'Early Bird Offers'
    ),
    (
        8,
        '2024-12-01',
        '2024-12-25',
        'Christmas Gift Sale'
    ),
    (
        9,
        '2024-12-15',
        '2024-12-22',
        'Pre-Holiday Discounts'
    ),
    (
        10,
        '2024-11-01',
        '2024-11-30',
        'November Savings'
    );
-- Insert data into discount_by_price table
INSERT INTO discount_by_price (DiscountID, Price)
VALUES (1, 50.00),
    (2, 100.00),
    (3, 75.00),
    (4, 20.00),
    (5, 30.00),
    (6, 40.00),
    (7, 60.00),
    (8, 25.00),
    (9, 45.00),
    (10, 15.00);
-- DiscountID 10, $15 discount
-- Insert data into discount_by_percent table
INSERT INTO discount_by_percent (DiscountID, Percent)
VALUES (1, 10.00),
    (2, 15.00),
    (3, 20.00),
    (4, 25.00),
    (5, 5.00),
    (6, 10.00),
    (7, 30.00),
    (8, 8.00),
    (9, 12.00),
    (10, 18.00);
-- Insert data into product table
INSERT INTO product (
        ProductID,
        ProductName,
        Price,
        Quantity,
        CategoryID,
        ImageURL,
        UserID,
        Description
    )
VALUES (
        1,
        'Ergonomic Office Chair',
        120.00,
        50,
        1,
        'images/ergonomic_chair.jpg',
        1,
        'Comfortable office chair with ergonomic design'
    ),
    (
        2,
        'Standing Desk',
        250.00,
        30,
        2,
        'images/standing_desk.jpg',
        1,
        'Height-adjustable standing desk for office use'
    ),
    (
        3,
        'Ballpoint Pen Pack',
        5.50,
        200,
        3,
        'images/ballpoint_pen.jpg',
        3,
        'Pack of 10 blue ballpoint pens'
    ),
    (
        4,
        'Wooden Filing Cabinet',
        180.00,
        20,
        4,
        'images/filing_cabinet.jpg',
        3,
        'Stylish wooden filing cabinet with 3 drawers'
    ),
    (
        5,
        'Laser Printer',
        150.00,
        15,
        5,
        'images/laser_printer.jpg',
        3,
        'High-speed monochrome laser printer'
    ),
    (
        6,
        'Laptop Stand',
        30.00,
        100,
        6,
        'images/laptop_stand.jpg',
        3,
        'Adjustable laptop stand with cooling feature'
    ),
    (
        7,
        'Office Desk Lamp',
        35.00,
        75,
        7,
        'images/desk_lamp.jpg',
        5,
        'Modern office desk lamp with LED light'
    ),
    (
        8,
        'LED Ceiling Light',
        60.00,
        50,
        8,
        'images/led_ceiling_light.jpg',
        5,
        'Bright LED ceiling light for office'
    ),
    (
        9,
        'Magnetic Whiteboard',
        90.00,
        40,
        9,
        'images/magnetic_whiteboard.jpg',
        5,
        'Large magnetic whiteboard with marker tray'
    ),
    (
        10,
        'Conference Room Projector',
        500.00,
        10,
        10,
        'images/projector.jpg',
        5,
        'High-resolution projector for conference rooms'
    ),
    (
        11,
        'Mesh Back Chair',
        110.00,
        60,
        1,
        'images/mesh_chair.jpg',
        7,
        'Mesh back office chair with lumbar support'
    ),
    (
        12,
        'Wooden Desk',
        200.00,
        25,
        2,
        'images/wooden_desk.jpg',
        9,
        'Solid wooden desk with drawer storage'
    ),
    (
        13,
        'Stapler',
        7.00,
        150,
        3,
        'images/stapler.jpg',
        7,
        'Heavy-duty office stapler for large stacks'
    ),
    (
        14,
        'Compact File Cabinet',
        120.00,
        30,
        4,
        'images/compact_file_cabinet.jpg',
        11,
        'Compact file cabinet with lockable drawers'
    ),
    (
        15,
        'Inkjet Printer',
        100.00,
        40,
        5,
        'images/inkjet_printer.jpg',
        11,
        'Color inkjet printer with wireless connectivity'
    ),
    (
        16,
        'Portable Laptop Desk',
        45.00,
        80,
        6,
        'images/portable_laptop_desk.jpg',
        15,
        'Portable desk for laptops with adjustable height'
    ),
    (
        17,
        'Table Lamp with USB Port',
        40.00,
        90,
        7,
        'images/table_lamp_usb.jpg',
        9,
        'Table lamp with built-in USB charging port'
    ),
    (
        18,
        'Smart LED Office Light',
        80.00,
        70,
        8,
        'images/smart_led_light.jpg',
        9,
        'Smart LED light with app control'
    ),
    (
        19,
        'Whiteboard with Markers',
        95.00,
        55,
        9,
        'images/whiteboard_markers.jpg',
        11,
        'Whiteboard set including markers and eraser'
    ),
    (
        20,
        'Executive Conference Chair',
        150.00,
        15,
        1,
        'images/executive_chair.jpg',
        17,
        'Executive chair with premium leather finish'
    ),
    (
        21,
        'Height Adjustable Desk',
        270.00,
        20,
        2,
        'images/height_adjustable_desk.jpg',
        11,
        'Height-adjustable desk with memory settings'
    ),
    (
        22,
        'Desk Organizer Set',
        12.00,
        200,
        3,
        'images/desk_organizer.jpg',
        11,
        'Complete desk organizer set with compartments'
    ),
    (
        23,
        'Steel File Cabinet',
        130.00,
        35,
        4,
        'images/steel_file_cabinet.jpg',
        17,
        'Durable steel file cabinet with large capacity'
    ),
    (
        24,
        'Wireless Laser Printer',
        160.00,
        25,
        5,
        'images/wireless_printer.jpg',
        17,
        'Wireless laser printer with duplex printing'
    ),
    (
        25,
        'Portable Desk Lamp',
        35.00,
        120,
        7,
        'images/portable_desk_lamp.jpg',
        13,
        'Portable desk lamp with rechargeable battery'
    ),
    (
        26,
        'Smart Whiteboard',
        130.00,
        40,
        9,
        'images/smart_whiteboard.jpg',
        13,
        'Smart whiteboard with interactive features'
    ),
    (
        27,
        'Ergonomic Keyboard',
        75.00,
        150,
        6,
        'images/ergonomic_keyboard.jpg',
        5,
        'Ergonomic keyboard with wrist rest support'
    ),
    (
        28,
        'Adjustable Office Chair',
        100.00,
        70,
        1,
        'images/adjustable_office_chair.jpg',
        15,
        'Office chair with adjustable height and tilt'
    ),
    (
        29,
        'Projector Screen',
        80.00,
        50,
        10,
        'images/projector_screen.jpg',
        15,
        'Large projector screen with stand'
    ),
    (
        30,
        'Executive Office Desk',
        300.00,
        20,
        2,
        'images/executive_office_desk.jpg',
        15,
        'Executive desk with premium finish and storage'
    );
-- Insert data into paymentmethod table
INSERT INTO paymentmethod (PaymentMethodID, MethodName, Description)
VALUES (
        1,
        'Credit Card',
        'Payment via credit card (Visa, MasterCard, etc.)'
    ),
    (2, 'PayPal', 'Payment through PayPal account'),
    (
        3,
        'Bank Transfer',
        'Direct bank transfer payment method'
    ),
    (
        4,
        'Cash on Delivery',
        'Payment in cash upon delivery of the product'
    ),
    (5, 'Debit Card', 'Payment via debit card');
-- Insert data into shipping table
INSERT INTO shipping (ShippingID, ShippingCompany)
VALUES (1, 'FedEx'),
    (2, 'UPS'),
    (3, 'DHL'),
    (4, 'USPS'),
    (5, 'Royal Mail'),
    (6, 'Canada Post'),
    (7, 'Australia Post');
-- Insert data into orders table
INSERT INTO orders (
        OrderID,
        TotalAmount,
        OrderDate,
        BuyerID,
        PaymentMethodID,
        ShippingID,
        OrderStatus,
        PaymentStatus,
        ShippingCost,
        SellerID,
        DiscountID
    )
VALUES (
        1,
        250,
        '2024-11-27',
        2,
        1,
        1,
        'Pending',
        'Paid',
        '10.00',
        1,
        1
    ),
    -- Buyer 2, Seller 1
    (
        2,
        180,
        '2024-11-27',
        4,
        2,
        2,
        'Shipped',
        'Paid',
        '15.00',
        3,
        2
    ),
    -- Buyer 4, Seller 3
    (
        3,
        350,
        '2024-11-27',
        6,
        3,
        3,
        'Delivered',
        'Paid',
        '20.00',
        5,
        5
    ),
    -- Buyer 6, Seller 5
    (
        4,
        200,
        '2024-11-26',
        8,
        4,
        4,
        'Pending',
        'Unpaid',
        '12.00',
        7,
        4
    ),
    -- Buyer 8, Seller 7
    (
        5,
        150,
        '2024-11-25',
        10,
        5,
        5,
        'Shipped',
        'Paid',
        '8.00',
        9,
        6
    ),
    -- Buyer 10, Seller 9
    (
        6,
        320,
        '2024-11-24',
        12,
        1,
        6,
        'Cancelled',
        'Unpaid',
        '18.00',
        11,
        8
    ),
    -- Buyer 12, Seller 11
    (
        7,
        275,
        '2024-11-23',
        14,
        2,
        7,
        'Pending',
        'Paid',
        '10.00',
        13,
        9
    ),
    -- Buyer 14, Seller 13
    (
        8,
        450,
        '2024-11-22',
        16,
        3,
        1,
        'Delivered',
        'Paid',
        '20.00',
        15,
        1
    ),
    -- Buyer 16, Seller 15
    (
        9,
        300,
        '2024-11-21',
        18,
        4,
        2,
        'Shipped',
        'Paid',
        '22.00',
        17,
        2
    ),
    -- Buyer 18, Seller 17
    (
        10,
        120,
        '2024-11-20',
        20,
        5,
        3,
        'Pending',
        'Unpaid',
        '5.00',
        19,
        4
    );
-- Buyer 20, Seller 19
-- Insert data into order_review table
INSERT INTO order_review (ReviewID, Rating, Comment, ReviewDate, OrderID)
VALUES (
        1,
        5,
        'Excellent product, very satisfied with the purchase!',
        '2024-11-27',
        1
    ),
    (
        2,
        4,
        'Good quality, but the shipping took longer than expected.',
        '2024-11-26',
        2
    ),
    (
        3,
        3,
        'The product is decent, but I expected better performance for the price.',
        '2024-11-25',
        3
    ),
    (
        4,
        2,
        'The item arrived damaged, but the seller was responsive.',
        '2024-11-24',
        4
    ),
    (
        5,
        1,
        'Worst purchase ever, the product doesn’t work as described.',
        '2024-11-23',
        5
    ),
    (
        6,
        4,
        'Good value for money, would buy again.',
        '2024-11-22',
        6
    ),
    (
        7,
        5,
        'Loved it! The product exceeded my expectations.',
        '2024-11-21',
        7
    ),
    (
        8,
        3,
        'The quality was fine, but the delivery was delayed.',
        '2024-11-20',
        8
    ),
    (
        9,
        4,
        'Solid purchase, the product works as expected.',
        '2024-11-19',
        9
    ),
    (
        10,
        5,
        'Perfect! Fast shipping and high-quality product.',
        '2024-11-18',
        10
    );
-- -- Insert data into order_item table
-- INSERT INTO order_item (OrderID, TotalAmount, CartID, CreateDate)
-- VALUES (1, '120.00', 1, '2024-11-27'),
--     (2, '250.00', 2, '2024-11-26'),
--     (3, '5.50', 3, '2024-11-25'),
--     (4, '180.00', 4, '2024-11-24'),
--     (5, '150.00', 5, '2024-11-23'),
--     (6, '30.00', 6, '2024-11-22'),
--     (7, '35.00', 7, '2024-11-21'),
--     (8, '60.00', 8, '2024-11-20'),
--     (9, '90.00', 9, '2024-11-19'),
--     (10, '500.00', 10, '2024-11-18');
-- Insert data into discount table
-- Insert data into order_discount table
-- INSERT INTO order_discount (DiscountID, OrderID)
-- VALUES (1, 1),
--     (2, 2),
--     (3, 3),
--     (4, 4),
--     (5, 5),
--     (6, 6),
--     (7, 7),
--     (8, 8),
--     (9, 9),
--     (10, 10);
-- user procedure ---------------------------------------------------------------------------------------------------------
-- user insert
DROP PROCEDURE IF EXISTS insert_user;
CREATE PROCEDURE insert_user(
    IN UserName VARCHAR(256),
    IN Password VARCHAR(256),
    IN Email VARCHAR(256),
    IN PhoneNumber VARCHAR(20),
    IN LastName VARCHAR(256),
    IN FirstName VARCHAR(256)
) BEGIN -- Kiểm tra nếu tên người dùng đã tồn tại
IF EXISTS (
    SELECT 1
    FROM user
    WHERE user.UserName = UserName
) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = "The username is already in use";
END IF;
-- Kiểm tra định dạng số điện thoại
IF PhoneNumber NOT REGEXP '^0[0-9]{9}$' THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = "Invalid phone number. It must start with '0' and be 10 characters long.";
END IF;
-- Kiểm tra định dạng email
IF Email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = "Invalid email format.";
END IF;
-- Thêm người dùng vào bảng user
INSERT INTO user (
        UserName,
        Password,
        Email,
        PhoneNumber,
        LastName,
        FirstName
    )
VALUES (
        UserName,
        Password,
        Email,
        PhoneNumber,
        LastName,
        FirstName
    );
END;
CALL insert_user(
    'testusers3232',
    -- UserName
    'securepassword',
    -- Password
    'testuse',
    -- Email
    '0987220540',
    -- PhoneNumber
    'Nguyen',
    -- LastName
    'Huy' -- FirstName
);
-- user update
DROP PROCEDURE IF EXISTS update_user;
CREATE PROCEDURE update_user(
    IN p_UserName VARCHAR(256),
    IN p_Password VARCHAR(256),
    IN p_Email VARCHAR(256),
    IN p_PhoneNumber VARCHAR(20),
    IN p_LastName VARCHAR(256),
    IN p_FirstName VARCHAR(256)
) BEGIN -- Kiểm tra xem người dùng có tồn tại không
IF NOT EXISTS (
    SELECT 1
    FROM user
    WHERE UserName = p_UserName
) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = "User not found";
END IF;
-- Kiểm tra định dạng số điện thoại
IF p_PhoneNumber NOT REGEXP '^0[0-9]{9}$' THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = "Invalid phone number. It must start with '0' and be 10 characters long.";
END IF;
-- Kiểm tra định dạng email
IF p_Email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = "Invalid email format.";
END IF;
-- Kiểm tra mật khẩu có ít nhất 6 ký tự
IF LENGTH(p_Password) < 6 THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = "Password must be at least 6 characters long.";
END IF;
-- Cập nhật thông tin người dùng
UPDATE user
SET Password = p_Password,
    Email = p_Email,
    PhoneNumber = p_PhoneNumber,
    LastName = p_LastName,
    FirstName = p_FirstName
WHERE UserName = p_UserName;
END;
CALL update_user(
    'testusers',
    -- UserName
    'secur',
    -- Password
    'testuser123@example.com',
    -- Email
    '0344768682',
    -- PhoneNumber
    'Nguyen',
    -- LastName
    'Huy' -- FirstName
);
-- -- delete user
-- DROP PROCEDURE IF EXISTS delete_user;
-- CREATE PROCEDURE delete_user(IN p_UserName VARCHAR(256)) BEGIN -- Declare variable for UserID
-- DECLARE v_UserID INT;
-- -- Check if UserName exists
-- IF NOT EXISTS (
--     SELECT 1
--     FROM user
--     WHERE UserName = p_UserName
-- ) THEN SIGNAL SQLSTATE '45000'
-- SET MESSAGE_TEXT = "User not found";
-- END IF;
-- -- Get the UserID based on the UserName
-- SELECT UserID INTO v_UserID
-- FROM user
-- WHERE UserName = p_UserName;
-- -- Delete related records from buyer table
-- DELETE FROM buyer
-- WHERE UserID = v_UserID;
-- -- Delete related records from seller table
-- DELETE FROM seller
-- WHERE UserID = v_UserID;
-- -- Delete related records from address_user table
-- DELETE FROM address_user
-- WHERE UserID = v_UserID;
-- -- Delete related records in cart_product
-- DELETE FROM cart_product
-- WHERE CartID IN (
--         SELECT CartID
--         FROM cart
--         WHERE UserID = v_UserID
--     );
-- -- Delete the cart itself
-- DELETE FROM cart
-- WHERE UserID = v_UserID;
-- -- Delete related records in orders
-- DELETE FROM order_item
-- WHERE OrderID IN (
--         SELECT OrderID
--         FROM orders
--         WHERE BuyerID = v_UserID
--             OR SellerID = v_UserID
--     );
-- -- Delete related records in order_review
-- DELETE FROM order_review
-- WHERE OrderID IN (
--         SELECT OrderID
--         FROM orders
--         WHERE BuyerID = v_UserID
--             OR SellerID = v_UserID
--     );
-- -- Delete related records in order_discount
-- DELETE FROM order_discount
-- WHERE OrderID IN (
--         SELECT OrderID
--         FROM orders
--         WHERE BuyerID = v_UserID
--             OR SellerID = v_UserID
--     );
-- -- Delete user from user table
-- DELETE FROM user
-- WHERE UserID = v_UserID;
-- END;
-- Trigger -------------------------------------------------------------------------------------------------------------------------
-- trigger for create cart after create_user
CREATE TRIGGER create_cart_for_user
AFTER
INSERT ON user FOR EACH ROW BEGIN -- Tạo một bản ghi cart mới cho người dùng
INSERT INTO cart (UserID)
VALUES (NEW.UserID);
END;
-- trigger test 
-- function ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE FUNCTION GetProductCountByCategory(category_name VARCHAR(255)) RETURNS INT DETERMINISTIC BEGIN
DECLARE product_count INT;
-- Tính số lượng sản phẩm trong category cụ thể
SELECT COUNT(*) INTO product_count
FROM product p
    JOIN category c ON p.CategoryID = c.CategoryID
WHERE c.CategoryName = category_name;
RETURN product_count;
END
SELECT GetProductCountByCategory('Desks');
-- INSERT INTO cart_product(CartID, ProductID, Quantity)
-- VALUES (2, 5, 3)
-- INSERT INTO order_item (OrderID, CartID, CreateDate)
-- VALUES (1, 1, NOW());
DROP DATABASE btl_2;
CREATE DATABASE btl_2;
--  Procedure category
DROP PROCEDURE IF EXISTS GetProductsByCategory CREATE PROCEDURE GetProductsByCategory(IN category_name VARCHAR(255)) BEGIN
SELECT p.ProductID,
    p.ProductName,
    p.Price,
    p.Quantity,
    p.ImageURL,
    p.UserID
FROM product p
    JOIN category c ON p.CategoryID = c.CategoryID
WHERE c.CategoryName = category_name
ORDER BY p.Price ASC;
END;
CALL GetProductsByCategory('Printers');
-- Procedure Product
DROP PROCEDURE IF EXISTS ArrangeProductByPrice CREATE PROCEDURE ArrangeProductByPrice(IN price DECIMAL(10, 2)) BEGIN
SELECT p.ProductID,
    p.ProductName,
    p.Price,
    p.Quantity,
    p.ImageURL,
    p.UserID
FROM product p
WHERE p.Price >= price
ORDER BY p.Price ASC;
END CALL ArrangeProductByPrice(150.00);
CREATE FUNCTION GetProductCountByUser(user_id INT) RETURNS INT DETERMINISTIC BEGIN
DECLARE product_count INT;
IF NOT EXISTS (
    SELECT 1
    FROM seller
    WHERE UserID = user_id
) THEN RETURN -1;
ELSE
SELECT COUNT(*) INTO product_count
FROM product
WHERE UserID = user_id;
RETURN product_count;
END IF;
END
SELECT GetProductCountByUser(11) AS TotalProducts;