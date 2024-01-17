import { useQueries } from "react-query"; // useQueries 함수는 여러 개의 쿼리를 수행한다. useQuery는 하나의 쿼리를 수행.
import axios from "axios";

function fetchProducts(productId) {
  return axios.get(`http://localhost:3000/products/${productId}`);
}

export function DynamicParallelQueries({ productIds }) {
  // console.log(productIds);
  const results = useQueries(
    productIds.map((id) => {
      return {
        // DynamicParallelQueries 컴포넌트가 받은 productIds 배열에 따라 queryKey와 queryFn 항목만 지정해서 리턴하면 useQueries 함수가 알아서 처리.
        queryKey: ["get-product", id],
        queryFn: () => fetchProducts(id),
      };
    })
  );

  // console.log(results);

  return (
    <>
      <div className="text-4xl mb-4">DynamicParallelQueries</div>
      {results &&
        results.map((arr, i) => (
          <div key={i}>
            <div className="text-3xl">{arr.data?.data?.name}</div>
            <ul className="list-disc p-4">
              {arr.data?.data &&
                Object.entries(arr.data?.data).map(([key, value]) => (
                  <li key={`${i}-${key}`}>{value}</li>
                ))}
            </ul>
          </div>
        ))}
    </>
  );
}
