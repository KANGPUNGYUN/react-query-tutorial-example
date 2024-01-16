import { useQuery } from "react-query";
import axios from "axios";

function fetchProducts() {
  return axios.get("http://localhost:3000/products");
}

export function ReactQuery() {
  const onSuccess = (data) => {
    console.log("데이터 가져오기 후 사이드 이펙트 수행", data);
  };

  const onError = (error) => {
    console.log("오류 발생 후 사이드 이펙트 수행", error);
  };

  const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
    "get-product",
    fetchProducts,
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

    // {
    //   enabled: false,
    // }
    // 5. 유저 요청 시 useQuery 작동시키기. useQuery는 기본적으로 Reat 컴포넌트가 마운트(화면에 첫 렌더링하는 시점)되면 자동으로 시작. 이는 enabled이 true가 기본값이기 때문이다. 유저의 요청에 의해 데이터를 가져와야 할 때 enabled를 false로 바꾼다. ReactQuery의 첫 번째 인자에 refetch를 추가하여 유저가 버튼 클릭시 fetching 동작을 가져올 수 있게 refetch 콜백함수 제공.

    {
      onSuccess,
      onError,
      select: (data) => {
        const productName = data.data
          ?.filter((p) => parseInt(p.price) <= 50)
          .map((p) => p.name);
        return productName;
      },
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>

      <button
        onClick={refetch}
        className="py-2 px-4 border bg-slate-100 rounded-md"
      >
        fetch data
      </button>

      <ul className="list-disc p-4">
        {/* {data &&
          data.data?.items?.map((product) => (
            <li key={product.id}>
              {product.name} / {product.price}
            </li>
          ))} */}
        {data &&
          data.map((productName) => <li key={productName}>{productName}</li>)}
      </ul>
    </>
  );
}
