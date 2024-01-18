import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { v4 as uuid } from "uuid";

function fetchProducts() {
  return axios.get("http://localhost:3000/products");
}

function addProduct(product) {
  return axios.post("http://localhost:3000/products", product);
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

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation(addProduct, {
    /*
    onSuccess: (data) => {
      // 1) invalidateQueries 함수는 queryKey의 쿼리를 즉시 무효화 시키고 다시 fetching 시켜서, POST 액션 후에 잠깐의 시간 지체없이 바로 화면에 업데이트된 정보가 보여짐.
      // queryClient.invalidateQueries("get-product");

      // 2) POST 이후 다시 GET 액션이 되는 불필요한 작업을 줄이기 위해 아래의 코드를 사용한다.
      queryClient.setQueryData("get-product", (oldProductData) => {
        return {
          ...oldProductData,
          data: [...oldProductData.data, data.data],
        };
      });
    },
    */

    // Optimistic Updates: 요청을 보내는 것과 동시에 결과를 예측하여 예측한 결과를 UI에 반영하는 가장 이상적인 업데이트 방법
    // 참고 사이트: https://mycodings.fly.dev/blog/2023-10-02-react-query-howto-usemutation-in-depth
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries("get-product");
      const previousProductData = queryClient.getQueryData("get-product");
      queryClient.setQueryData("get-product", (oldProductData) => {
        return {
          ...oldProductData,
          data: [...oldProductData.data, { id: uuid(), ...newProduct }],
        };
      });
      return {
        // previousProductData는 실제 POST 액션이 에러가 나서 취소가 됐을 때 원상복구 용도이다.
        previousProductData,
      };
    },
    onError: (_error, _product, context) => {
      queryClient.setQueryData("get-product", context.previousProductData);
    },
    // onSettled은 POST 액션이 에러가 났거나 아니면 성공했을 때 실행되는 항목
    onSettled: () => {
      queryClient.invalidateQueries("get-product");
    },
  });
}
