import { ShowProducts } from "./ShowProducts";
import { useWindowSize } from "../context/useWindowSize";
import { ShowProductsInDesktop } from "./ShowProductsInDesktop";
import { ProductOperations } from "./ProductOperations";
import { useCart } from "../context/CartProvider";
import { Loader } from "./Loader";

export function ProductDisplay() {
  const [, width] = useWindowSize();
  const {
    state: { isLoading },
  } = useCart();

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div style={{ minHeight: "100vh" }}>
        {width <= 600 ? <ShowProducts /> : <ShowProductsInDesktop />}
      </div>
      {width <= 600 && <ProductOperations />}
    </div>
  );
}
