import NavigationBar from "../components/Navigation_Bar/navigation_bar";
import Footer from "../components/Footer/footer";
import MainContentsPage from "./MainPage";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { loginState } from "../atoms";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const WarningBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
`;

function Home() {
  const userInfo = useRecoilValue(loginState);
  const navigate = useNavigate();
  return (
    <Wrapper>
      {userInfo ? (
        <MainContentsPage />
      ) : (
        <WarningBox
          onClick={() => {
            navigate("/login");
          }}
        >
          허가되지 않은 접근입니다.
          <button>뒤로가기</button>
        </WarningBox>
      )}
    </Wrapper>
  );
}

export default Home;
