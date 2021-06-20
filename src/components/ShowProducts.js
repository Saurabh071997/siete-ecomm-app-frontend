import { ProductCard } from "./ProductCard";
import { useCart } from "../context/CartProvider";

export function ShowProducts() {
  const {
    state: {
      productList,
      selectedCategory,
      selectedSubCategory,
      sortBy,
      showNewOnly,
      showDiscountOnly
    }
  } = useCart();

  function getSortedData(productData, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productData.sort(
        (a, b) => b["effectivePrice"] - a["effectivePrice"]
      );
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productData.sort(
        (a, b) => a["effectivePrice"] - b["effectivePrice"]
      );
    }

    return productData;
  }

  function getFilteredData(
    productData,
    { selectedCategory, selectedSubCategory, showNewOnly, showDiscountOnly }
  ) {
    return productData
      .filter(({ subcategory: { category } }) =>
        selectedCategory !== null ? category._id === selectedCategory : true
      )
      .filter(({ subcategory: { _id } }) =>
        selectedSubCategory !== null ? _id === selectedSubCategory : true
      )
      .filter(({ newProduct }) => (showNewOnly ? newProduct : true))
      .filter(({ isDiscounted }) => (showDiscountOnly ? isDiscounted : true));
  }

  const sortedData = getSortedData(productList, sortBy);
  const filteredData = getFilteredData(sortedData, {
    selectedCategory,
    selectedSubCategory,
    showNewOnly,
    showDiscountOnly
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {filteredData.map((productItem, idx) => {
        return <ProductCard key={productItem._id} product={productItem} />;
      })}
    </div>
  );
}
