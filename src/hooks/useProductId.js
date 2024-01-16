import { useQuery } from "react-query";
import axios from "axios";

function fetchProductDetails(productId) {
  return axios.get(`http://localhost:3000/products/${productId}`);
}

export function useProductId(productId) {
  return useQuery(["product-id", productId], () =>
    fetchProductDetails(productId)
  );
}
