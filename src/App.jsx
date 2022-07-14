import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import CardDetail from "./components/MainContentsPage/Card_Detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/about/:boardIndex/:boardName/:cardIndex/*"
        element={<CardDetail />}
      />
    </Routes>
  );
}

export default App;
