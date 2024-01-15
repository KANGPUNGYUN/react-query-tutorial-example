import { useQuery } from "react-query";
import axios from "axios";

function fetchProducts() {
  return axios.get("./db.json");
}

export function ReactQuery() {
  const { isLoading, isFetching, data, isError, error } = useQuery(
    "get-product",
    fetchProducts
    // { cacheTime: 5000 }
    // 1. react-query의 캐시 시스템. 다른 주소로 라우팅한 뒤 캐쉬타임만큼 후에 해당 캐시가 가비지 컬랙팅된다. cacheTime의 기본값은 5분.

    // { staleTime: 3000 }
    // 2. isFetching 주기는 staleTime으로 지정.
    // 리엑트 쿼리의 4가지 캐시 상태와 동작 순서: inactive -> fetching -> fresh -> stale
    // 해당 캐쉬가 있는 화면이 아닌 곳에 있다면 inactive가 되는 거고, ReactQuery가 있는 곳으로 라우팅 되면 fetching이 일어나고 캐시 값이 fresh 상태가 되었다가 다시 stale 값으로 변화한다. 백엔드에서는 staleTime 마다 계속 백엔드 값을 체크. staleTime의 기본값은 0.

    // { staleTime: 3000, refetchOnMount: false }
    // 3. refetch 방법 바꾸기. refetchOnMount의 기본값은 true. ReactQuery가 없는 곳에 있다가 잠시 이동 후에 다시 ReactQuery가 있는 곳으로 가면 isFetching 값이 true로 바뀌면서 fetching이 일어남. refetchOnMount를 false로 두면 Mount 됐을 때 fetching 작업이 일어나지 않게 됨.

    // {
    //   refetchInterval: 2000,
    //   refetchIntervalInBackground: true,
    // }
    // 4. 강제로 refetch하기(Polling: 정기적 데이터 가져오기) UI에 보이는 값을 실제로 실시간 주식 가격 데이터와 동기화하려는 경우에 사용. refetchInterval 값은 기본값은 false. refetchOnMount 나 refetchOnWindowFocus 옵션에 의해 ReactQuery 가 refecth를 수행하도록 놔둔다. 즉, ReactQuery는 유저의 행위에 의존하도록 만들었다. 유저가 ReactQuery가 있는 컴포넌트를 클릭했을 때나, 아니면 마우스를 다시 ReactQuery가 있는 컴포넌트로 옮겼다라든가, 이런 행위로 인해 refetchOnMount, refetchOnWindowFocus 옵션이 영향을 받는다. refetchInterval에 2000이라는 숫자를 넣으면 2초마다 fetching이 일어남. refetchIntervalInBackground는 앱이 포커스를 잃을 때에도 데이터를 정기적으로 가져오려면 백그라운드에서 다시 가져오기 간격을 설정한다. 기본값은 false. 이 값을 true라고 바꾸면 앱이 비활성화되었더라도 백그라운드에서 fetching 작업이 계속 일어남.
  );

  console.log({ isLoading, isFetching });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>

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
