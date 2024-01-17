import { useQuery } from "react-query";
import axios from "axios";

/** 이중 쿼리하는 방법(SQL에서 Scalar Subqueries, 즉, SELECT 절 안에 서브쿼리 방법과 비슷하다) */
export function DependentQuery({ userId }) {
  function fetchUserById(userId) {
    return axios.get(`http://localhost:3000/users?id=${userId}`);
  }

  function fetchProductsByUsername(username) {
    return axios.get(`http://localhost:3000/products?username=${username}`);
  }

  const { data: user } = useQuery(["get-user", userId], () =>
    fetchUserById(userId)
  );

  const userName = user?.data[0].username;

  const { data: userProducts } = useQuery(
    ["get-product-by-username", userName],
    () => fetchProductsByUsername(userName),
    {
      enabled: !!userName,
    }
  );

  // console.log(userProducts?.data.map((p) => p.id));

  return (
    <>
      <div className="text-2xl mb-4">{userName}&apos;s Products</div>
      <div>
        {userProducts &&
          userProducts.data.map((p) => <div key={p.id}>{p.name}</div>)}
      </div>
    </>
  );
}
