import { Container } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Search from "./pages/Search";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className="p-5">
        <Search />
      </Container>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
