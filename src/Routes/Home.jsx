import NavigationBar from "../components/Navigation_Bar/navigation_bar";
import Footer from "../components/Footer/footer";
import MainContentsPage from "../components/MainContentsPage/01_mainContentsPage";
import styled from "styled-components";


const Wrapper = styled.div`
display:flex;
flex-direction: column;
height:100vh;
`

function Home() {
  return (
    <Wrapper>
      <MainContentsPage/>
    </Wrapper>
  );
}

export default Home;
