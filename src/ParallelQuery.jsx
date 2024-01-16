import { useQuery } from "react-query";
import axios from "axios";

function fetchProducts() {
  return axios.get("http://localhost:3000/products");
}

function fetchUsers() {
  return axios.get("http://localhost:3000/users");
}

// 여러 개의 쿼리를 한 곳에서 사용하는 방법(병렬 쿼리)
export function ParallelQuery() {
  const {
    // 별칭(alias)을 사용하여 다른 쿼리의 데이터의 충돌을 방지한다. (ex. data: productsData와 data: usersData)
    data: productsData,
    // isLoading: productsLoading,
    // isError: productsError,
  } = useQuery("parallel-get-product", fetchProducts);
  const {
    data: usersData,
    // isLoading: usersLoading,
    // isError: usersError,
  } = useQuery("parallel-get-users", fetchUsers);

  return (
    <>
      <div className="text-4xl">All Users</div>
      <ul className="list-disc p-4">
        {usersData &&
          usersData.data?.map((user) => <li key={user.id}>{user.username}</li>)}
      </ul>
      <div className="text-4xl">All Products</div>
      <ul className="list-disc p-4">
        {productsData &&
          productsData.data?.map((products) => (
            <li key={products.id}>{products.name}</li>
          ))}
      </ul>
    </>
  );
}
