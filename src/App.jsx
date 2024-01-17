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
            path="/depent-query"
            element={<DependentQuery userId="alk3naw2eezc2" />}
          />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;
