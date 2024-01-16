import { useProductName } from "./hooks/useProductName";
import { Link } from "react-router-dom";

export function ReactQuery() {
  const onSuccess = (data) => {
    console.log("데이터 가져오기 후 사이드 이펙트 수행", data);
  };

  const onError = (error) => {
    console.log("오류 발생 후 사이드 이펙트 수행", error);
  };

  const { isLoading, isFetching, data, isError, error } = useProductName(
    onSuccess,
    onError
  );

  console.log({ isLoading, isFetching });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>

      <ul className="list-disc p-4">
        {data &&
          data.data?.map((product) => (
            <li key={product.id}>
              <Link to={`/react-query/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        {/* {data &&
          data.map((productName) => <li key={productName}>{productName}</li>)} */}
      </ul>
    </>
  );
}
