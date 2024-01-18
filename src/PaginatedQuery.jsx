/*기본 페이지네이션

import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function fetchProducts(pageParam) {
  return axios.get(
    `http://localhost:3000/products?_per_page=3&_page=${pageParam}`
  );
}
export function PaginatedQuery() {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useQuery(
    ["get-paginated", pageNumber],
    () => fetchProducts(pageNumber),
    {
      keepPreviousData: true,
    }
  );
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>

      <h2>current Page number : {pageNumber}</h2>
      <ul className="list-disc p-4">
        {data &&
          data.data?.map((product) => <li key={product.id}>{product.name}</li>)}
      </ul>
      <div className="space-x-4">
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 3}
        >
          Next
        </button>
      </div>
      <div>{isFetching && "Fetching..."}</div>
    </>
  );
}
*/

// 무한 스크롤 페이지네이션

import { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

function fetchProducts(page) {
  return axios.get(
    `http://localhost:3000/products?_page=${page}&_per_page=4&_limit=1`
  );
}

export function PaginatedQuery() {
  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["get-paginated"],
    ({ pageParam = 1 }) => fetchProducts(pageParam),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 10) {
          return pages.length + 1;
        } else return undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="text-4xl mb-4">ReactQuery</div>

      {data &&
        data.pages?.map((group, i) => (
          <Fragment key={i}>
            {group && group?.data?.map((p) => <div key={p.id}>{p.name}</div>)}
          </Fragment>
        ))}
      <div className="space-x-4">
        <button
          className="border"
          onClick={fetchNextPage}
          disabled={!hasNextPage}
        >
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}
