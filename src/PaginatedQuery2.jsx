import { Fragment, useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

function fetchProducts(page) {
  return axios.get(
    `http://localhost:3000/products?_page=${page}&_per_page=4&_limit=1`
  );
}

export function PaginatedQuery2() {
  const observerElem = useRef(null);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
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

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, handleObserver]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="text-4xl mb-4">ReactQuery</div>

      {data &&
        data.pages?.map((group, i) => (
          <Fragment key={i}>
            {group && group?.data.map((p) => <div key={p.id}>{p.name}</div>)}
          </Fragment>
        ))}
      <div className="loader" ref={observerElem}>
        {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
      </div>
    </>
  );
}
