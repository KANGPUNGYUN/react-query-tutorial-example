import { useProductName, useAddProduct } from "./hooks/useProductName";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ReactQuery() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const { mutate: addProduct } = useAddProduct();

  const handleCreate = () => {
    console.log({ name, price });
    const data = { name, price };
    addProduct(data);
  };

  const onSuccess = (data) => {
    console.log("데이터 가져오기 후 사이드 이펙트 수행", data);
  };

  const onError = (error) => {
    console.log("오류 발생 후 사이드 이펙트 수행", error);
  };

  const { isLoading, data, isError, error } = useProductName(
    onSuccess,
    onError
  );

  // console.log({ isLoading, isFetching });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>
      <div className="space-x-2">
        <input
          className="border"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button className="border" onClick={handleCreate}>
          Create
        </button>
      </div>
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
