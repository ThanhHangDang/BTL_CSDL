const express = require("express");
const routes = require("./routes"); // Import routes
const db = require("./db_connection");
const cors = require("cors");
const corsConfig = require("./configCors");

const app = express();
const PORT = 4000;
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

// Start the server
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

// Setup route
// signup
app.post("/signup", async (req, res) => {
  const {
    usernameRegister,
    passwordRegister,
    emailRegister,
    phoneNumberRegister,
    lastNameRegister,
    firstnameRegister,
    setStorenameRegister,
  } = req.body;
  console.log("check body", req.body);

  try {
    // Use the promise-based pool from db_connection.js
    const [results] = await db.query("CALL insert_user(?, ?, ?, ?, ?, ?, ?)", [
      usernameRegister,
      passwordRegister,
      emailRegister,
      phoneNumberRegister,
      lastNameRegister,
      firstnameRegister,
      setStorenameRegister || "",
    ]);

    // Send success response
    return res.json({ message: "User added successfully!" });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    return res.status(500).json({ error: err.message });
  }
});

// signin
// Setup route for sign-in
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  console.log("check body", req.body);

  try {
    // Use the promise-based pool from db_connection.js
    const [results] = await db.query("CALL signin_user(?, ?)", [
      username,
      password,
    ]);

    // If user found, return user information
    if (results.length > 0) {
      return res.json({
        message: "Signin successful",
        user: results[0],
      });
    } else {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    return res.status(500).json({ error: err.message });
  }
});

// list category
app.get("/categories", async (req, res) => {
  try {
    const [results] = await db.query("CALL get_full_category()");

    // Send the categories in the response
    return res.json({
      message: "Categories retrieved successfully",
      categories: results,
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    return res.status(500).json({ error: err.message });
  }
});

// list product by category
app.get("/products/category/:categoryID", async (req, res) => {
  const categoryID = parseInt(req.params.categoryID); // Get category ID from URL parameter
  try {
    // Use the promise-based pool to call the stored procedure with the category ID
    const [results] = await db.query("CALL get_products_by_category(?)", [
      categoryID,
    ]);
    console.log("check poins");
    // If products found, return them
    if (results.length > 0) {
      return res.json({
        message: "Products retrieved successfully",
        products: results,
      });
    } else {
      return res.status(404).json({
        message: "No products found for this category",
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    return res.status(500).json({ error: err.message });
  }
});

// list all product
app.get("/get-all-product", async (req, res) => {
  try {
    // Use the promise-based pool to call the stored procedure
    const [results] = await db.query("CALL get_all_products()");

    // If products found, return them
    if (results.length > 0) {
      return res.json({
        message: "Products retrieved successfully",
        products: results,
      });
    } else {
      return res.status(404).json({
        message: "No products found",
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    return res.status(500).json({ error: err.message });
  }
});

// get details products
app.get("/product/:productID", async (req, res) => {
  const productID = parseInt(req.params.productID);
  try {
    // Use the promise-based pool to call the stored procedure with the product ID
    const [results] = await db.query("CALL get_product_details(?)", [
      productID,
    ]);

    // If product is found, return the details
    if (results.length > 0) {
      return res.json({
        message: "Product details retrieved successfully",
        product: results[0],
      });
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    return res.status(500).json({ error: err.message });
  }
});

// get products by user id
app.get("/products/user/:userID", async (req, res) => {
  const userID = parseInt(req.params.userID); // Get user ID from URL parameter
  try {
    const [results] = await db.query("CALL get_products_by_userid(?)", [
      userID,
    ]);

    // If products found, return them
    if (results.length > 0) {
      return res.json({
        message: "Products retrieved successfully",
        products: results,
      });
    } else {
      return res.status(404).json({
        message: "No products found for this user",
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Update user endpoint
app.put("/update_user", async (req, res) => {
  const { UserName, Password, Email, PhoneNumber, LastName, FirstName } =
    req.body;

  try {
    // Call the stored procedure to update the user
    const [results] = await db.query("CALL update_user(?, ?, ?, ?, ?, ?)", [
      UserName,
      Password,
      Email,
      PhoneNumber,
      LastName,
      FirstName,
    ]);

    // If the procedure executes without error, return success message
    return res.json({
      message: "User updated successfully!",
      user: {
        UserName,
        Password,
        Email,
        PhoneNumber,
        LastName,
        FirstName,
      },
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    return res.status(400).json({
      message: err.message || "An error occurred while updating the user.",
    });
  }
});

// update product by id
app.put("/update-product/:id", async (req, res) => {
  const productID = parseInt(req.params.id);
  const { ProductName, Price, Quantity, ImageURL, Description } = req.body;
  try {
    const [results] = await db.query(
      "CALL update_product_by_id(?, ?, ?, ?, ?, ?)",
      [productID, ProductName, Price, Quantity, ImageURL, Description]
    );

    // If the procedure executes without error, return success message
    return res.json({
      message: "Product updated successfully!",
      product: {
        ProductID: productID,
        ProductName,
        Price,
        Quantity,
        ImageURL,
        Description,
      },
    });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    // Handle any errors from the procedure (like product not found or invalid input)
    return res.status(400).json({
      message: error.message || "An error occurred while updating the product.",
    });
  }
});
