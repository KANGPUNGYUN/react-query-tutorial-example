import { Link } from "react-router-dom";

export function Header() {
  return (
    <nav className="mb-4 flex space-x-5 border-b-2 py-2">
      <Link to="/">Home</Link>
      <Link to="/axios-query">Axios Query</Link>
      <Link to="/react-query">React Query</Link>
      <Link to="/parallel-query">Parallel Query</Link>
      <Link to="/dynamic-parallel-queries">Dynamic Parallel Queries</Link>
      <Link to="/dependent-query">Dependent Query</Link>
      <Link to="/paginated-query">Paginated Query</Link>
    </nav>
  );
}
