import styled from 'styled-components';
import HorizontalGap from '../components/HorizontalGap.jsx';
import { useCallback, useMemo, useState } from 'react';
import { checkEmail, createMember } from '../services/members.js';
import VerticalGap from '../components/VerticalGap.jsx';
import { useNavigate } from 'react-router-dom';
import { checkContainSpecialCharacters, validateEmail } from '../utils/regexUtils.js';
import {Editable, EditableInput, EditablePreview, useToast} from '@chakra-ui/react'
const Signup = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isDuplicated, setIsDuplicated] = useState('');
  const navigate = useNavigate();
  const { fireToast } = useToast();

  const handleChangeEmail = useCallback(value => {
    setEmail(value);
    setIsDuplicated('');
  }, []);

  const handleChangeUserName = useCallback(value => {
    setUserName(value);
  }, []);

  const handleValidate = useCallback(async () => {
    if (validateEmail(email)) {
      return;
    }
    const result = await checkEmail(email);
    setIsDuplicated(result.data.toString());
  }, [email]);

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const disabledConfirm = useMemo(
    () => !(isDuplicated === 'false' && userName && !checkContainSpecialCharacters(userName)),
    [isDuplicated, userName],
  );

  const handleConfirm = useCallback(async () => {
    if (disabledConfirm) {
      return;
    }
    await createMember({ email: email, userName: userName });
    fireToast({ content: 'Registered successfully.' });
    navigate('/login');
  }, [disabledConfirm, email, userName, fireToast, navigate]);

  return (
    <Container>
      <HorizontalGap gap={'108px'} />
      <TitleStyle>Sign up</TitleStyle>
      <HorizontalGap gap={'32px'} />
      <ColumnStyle>E-mail</ColumnStyle>
        <Editable defaultValue='Take some chakra'>
            <EditablePreview />
            <EditableInput />
        </Editable>
      <HorizontalGap gap={'10px'} />
      <ColumnStyle>User Name</ColumnStyle>
        <Editable defaultValue='Take some chakra'>
            <EditablePreview />
            <EditableInput />
        </Editable>
      <HorizontalGap gap={'32px'} />
      <ButtonWrapper>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        <VerticalGap gap={'8px'} />
        <ConfirmButton disabled={disabledConfirm} onClick={handleConfirm}>
          Confirm
        </ConfirmButton>
      </ButtonWrapper>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  position: fixed;
  left: 50%;
  transform: translateX(-50%);
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
  width: auto;
`;

const ColumnStyle = styled.div`
  /* User Name */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  color: #000000;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 36px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CancelButton = styled.div`
  /* Text btn */

  box-sizing: border-box;

  padding: 6px 12px;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;

  cursor: pointer;

  /* Cancle */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  display: flex;
  align-items: center;
  text-align: center;

  color: rgba(0, 0, 0, 0.6);
`;

const ConfirmButton = styled.div`
  padding: 6px 12px;
  background: ${({ disabled }) => (disabled ? '#2A82F04D' : '#2a82f0')};
  border-radius: 4px;

  cursor: pointer;

  /* Confirm */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;
