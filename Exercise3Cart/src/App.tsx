import { Link, Route, Routes } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./store/cartStore";

function App() {

  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return (
    <>
      <nav className="bg-slate-800 text-white p-4">
        <div className="flex gap-6">
          <Link to="/">Products</Link>

          <Link to="/cart">
            Cart ({totalItems})
          </Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<ProductsPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />
      </Routes>
    </>
  );
}

export default App;