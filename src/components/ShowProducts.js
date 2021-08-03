import { useParams } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { useCart } from "../context/CartProvider";
import empty from '../images/empty.jpg';

export function ShowProducts() {
  const {
    state: {
      productList,
      sortBy,
      showNewOnly,
      showDiscountOnly,
    }
  } = useCart();

  let { categoryId: selectedCategory, subcategoryId: selectedSubCategory } =
    useParams();

  function getSortedData(itemList, sortBy) {
    let productData = [...itemList]
    if (sortBy === "PRICE_HIGH_TO_LOW") {
      return productData.sort(
        (a, b) => b["effectivePrice"] - a["effectivePrice"]
      );
    }

    if (sortBy === "PRICE_LOW_TO_HIGH") {
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
        selectedCategory ? category._id === selectedCategory : true
      )
      .filter(({ subcategory: { _id } }) =>
        selectedSubCategory ? _id === selectedSubCategory : true
      )
      .filter(({ newProduct }) => (showNewOnly ? newProduct : true))
      .filter(({ isDiscounted }) => (showDiscountOnly ? isDiscounted : true));
  }

  const sortedData = getSortedData(productList, sortBy);
  const filteredData = getFilteredData(sortedData, {
    selectedCategory,
    selectedSubCategory,
    showNewOnly,
    showDiscountOnly,
  });

  return (filteredData?.length > 0 ?
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {filteredData.map((productItem, idx) => {
        return <ProductCard key={productItem._id} product={productItem} />;
      })}
    </div> : <>
      <div className="page-layout" >
        <div className="empty-container">
          <img src= {empty} alt="empty-products" className="empty-img"/>
        </div>
      </div>
    </>
  );
}
