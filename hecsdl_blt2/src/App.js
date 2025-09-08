import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./component/_component/header.js";
import HomePage from "./HomePage/index.js";
import Footer from "./component/_component/footer.js";
import ProductDetail from "./ProductPage/productDetail.js";
import ProfilePage from "./ProfilePage/index.js";
import ProfileInfo from "./ProfilePage/profileInfo.js";
import MyProduct from "./ProfilePage/myProduct.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/product/:productID" Component={ProductDetail} />
          <Route Component={ProfilePage}>
            <Route path="/profile" Component={ProfileInfo} />
            <Route path="/my-product" Component={MyProduct} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
