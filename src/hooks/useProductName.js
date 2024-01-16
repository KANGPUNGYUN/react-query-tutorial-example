import { useQuery } from "react-query";
import axios from "axios";

function fetchProducts() {
  return axios.get("http://localhost:3000/products");
}

export function useProductName(onSuccess, onError) {
  return useQuery("get-product", fetchProducts, {
    onSuccess: onSuccess,
    onError: onError,
    // select: (data) => {
    //   const productName = data.data
    //     ?.filter((p) => parseInt(p.price) <= 50)
    //     .map((p) => p.name);
    //   return productName;
    // },
  });
}
