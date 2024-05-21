import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react'
import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMemberByEmail } from '../services/members.js';
import { validateEmail } from '../utils/regexUtils.js';
import { useToast } from '@chakra-ui/react'
import logo from '@/logo.png';

const Login = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const { fireToast } = useToast();

  const handleChange = useCallback(value => {
    setEmail(value);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (validateEmail(email)) {
      return;
    }
    try {
      const result = await getMemberByEmail(email);
      sessionStorage.setItem('id', result?.data?.id);
      sessionStorage.setItem('email', result?.data?.email);
      sessionStorage.setItem('name', result?.data?.userName ?? 'Anonymous');
      navigate('/');
    } catch (error) {
      fireToast({ content: 'Not registered user.' });
      console.log(error);
    }
  }, [email, fireToast, navigate]);

  return (
    <>
      <Container>
        <img src={logo} alt="logo" width={'500px'}/>
        <WelcomeStyle>환영합니다. </WelcomeStyle>
        <TitleStyle>로그인하세요.</TitleStyle>
        <Editable defaultValue='Take some chakra'>
          <EditablePreview />
          <EditableInput />
        </Editable>
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
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  /* or 150% */

  color: #2c3e50;
`;

const TitleStyle = styled.div`
  /* Title */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 72px;
  /* identical to box height, or 150% */

  color: #2c3e50;
  padding: 24px 0 16px 0;
`;
