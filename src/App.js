import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductHistory from "./components/ProductHistory";
import Products from "./components/Products";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="product-history/:id" element={<ProductHistory />} />
          <Route />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
