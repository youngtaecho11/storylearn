import { Flex, Button, Input,} from '@chakra-ui/react'
import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/logo.png';
import HorizontalGap from "../components/HorizontalGap.jsx";
import VerticalGap from "../components/VerticalGap.jsx";

const Login = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleChange = useCallback(event => {
    setName(event.target.value);
  }, []);

  const handleConfirm = useCallback(async () => {
    try {
      sessionStorage.setItem('name', name ?? 'Anonymous');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }, [name, navigate]);

  return (
    <>
      <Container>
        <img src={logo} alt="logo" width={'500px'}/>
        <WelcomeStyle>AI 선생님을 통해 <br/>초개인화 맞춤형 문제를 만들고 풀어 보자!</WelcomeStyle>
        <HorizontalGap gap={'80px'}/>
        <Flex flex={1} width ='50%'>
          <Input placeholder='이름을 입력해주세요.'
                 size='md'
                 value={name}
                 onChange={handleChange}
          />
          <VerticalGap gap={'10px'}/>
          <Button colorScheme='blue' onClick={handleConfirm}>
            로그인
          </Button>
        </Flex>
      </Container>
    </>
  );
};
export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 18px 20px;
`;

const WelcomeStyle = styled.div`
  /* Title */
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  /* or 150% */

  color: #2c3e50;
`;
