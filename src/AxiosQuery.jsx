import { useState, useEffect } from "react";
import axios from "axios";

export function AxiosQuery() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("./db.json")
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <>Loading...</>;

  if (error) return <h2>{error}</h2>;

  return (
    <>
      <div className="text-4xl">AxiosQuery</div>
      <ul className="list-disc p-4">
        {data &&
          data.data?.items?.map((product) => (
            <li key={product.id}>
              {product.name} / {product.price}
            </li>
          ))}
      </ul>
    </>
  );
}
