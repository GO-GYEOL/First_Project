import NavigationBar from "./components/01_Navigation_Bar/navigation_bar";
import Footer from "./components/03_Footer/footer";
import MainContentsPage from "./components/02_MainContentsPage/01_mainContentsPage";
import styled from "styled-components";

const Wrapper = styled.div`
display:flex;
flex-direction: column;
height:100vh;
`
function App() {
  return (
    <Wrapper>
      <NavigationBar />
      <MainContentsPage/>
      <Footer />
    </Wrapper>
  );
}

export default App;
