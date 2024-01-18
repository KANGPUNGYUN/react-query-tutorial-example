import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { AxiosQuery } from "./AxiosQuery";
import { ReactQuery } from "./ReactQuery";
import { ReactQueryDetails } from "./ReactQueryDetails";
import { ReactQueryDevtools } from "react-query/devtools";
import { ParallelQuery } from "./ParallelQuery";
import { DynamicParallelQueries } from "./DynamicParallelQueries";
import { DependentQuery } from "./DependentQuery";
// import { PaginatedQuery } from "./PaginatedQuery"; // 기본 페이지네이션 & 무한 스크롤 페이지네이션 방법
import { PaginatedQuery2 } from "./PaginatedQuery2"; // Intersection Observer를 활용한 무한스크롤

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/axios-query" element={<AxiosQuery />} />
          <Route path="/react-query" element={<ReactQuery />} />
          <Route
            path="/react-query/:productId"
            element={<ReactQueryDetails />}
          />
          <Route path="/parallel-query" element={<ParallelQuery />} />
          <Route
            path="/dynamic-parallel-queries"
            element={
              <DynamicParallelQueries
                productIds={["asmdlmalg23mlm", "sdfggmalg23mlm"]}
              />
            }
          />
          <Route
            path="/dependent-query"
            element={<DependentQuery userId="alk3naw2eezc2" />}
          />
          <Route path="/paginated-query" element={<PaginatedQuery2 />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;
