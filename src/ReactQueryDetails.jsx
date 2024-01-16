import { useParams } from "react-router-dom";
import { useProductId } from "./hooks/useProductId";

export function ReactQueryDetails() {
  const { productId } = useParams();
  const { isLoading, isError, error, data } = useProductId(productId);
  // console.log(data);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  return (
    <>
      {data && (
        <div>
          <h1>ID : {data.data.id}</h1>
          <h1>NAME : {data.data.name}</h1>
          <h2>PRICE : {data.data.price}</h2>
        </div>
      )}
    </>
  );
}
