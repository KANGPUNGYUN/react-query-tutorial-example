import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

function fetchProductDetails(productId) {
  return axios.get(`http://localhost:3000/products/${productId}`);
}

export function useProductId(productId) {
  // detail 페이지가 처음 실행되면 isLoading이 true, 다시 나갔다 들어오면 캐시가 되어 false가 된다.
  // return useQuery(["product-id", productId], () =>
  //   fetchProductDetails(productId)
  // );

  // 하지만, 아래처럼 useQueryClient와 initialData를 사용하면, 전체 리스트 페이지에서 얻은 모든 데이터를 캐시하여 상세 페이지에서 또 쿼리작업(Loading)하지 않도록 네트워크 사용량을 줄일 수 있다.
  const queryClient = useQueryClient();
  return useQuery(
    ["product-id", productId],
    () => fetchProductDetails(productId),
    {
      initialData: () => {
        const product = queryClient
          .getQueryData("get-product")
          ?.data.find((p) => p.id === productId);

        if (product) {
          return {
            data: product,
          };
        } else return undefined;
      },
    }
  );
}
