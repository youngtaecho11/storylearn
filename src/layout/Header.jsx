import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons'

const currentDate = new Date();
const options = {
    month: 'numeric', // 월을 숫자 형식으로 표시 (예: 9)
    day: 'numeric', // 일을 숫자 형식으로 표시 (예: 13)
};
const formattedDate = `${currentDate.toLocaleDateString('en-US', options)} (${currentDate.toLocaleDateString('en-US', { weekday: 'short' })})`;

const Header = () => {
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const onClickSignup = useCallback(() => {
        navigate('/signup');
    }, [navigate]);

    return (
        <Wrapper>
            <LeftBox onClick={onClick}>
                <HamburgerIcon boxSize={30} color='#FFFFFF'/>
                <TitleStyle>Story Learn</TitleStyle>
            </LeftBox>
            <RightBox>
                <DateStyle>{formattedDate}</DateStyle>
                <BtnStyle>
                    <SignUpStyle onClick={onClickSignup}>Sign up</SignUpStyle>
                </BtnStyle>
            </RightBox>
        </Wrapper>
    );
};

export default Header;

const Wrapper = styled.div`
  /* Top */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 9px 16px;
  gap: 530px;

  position: fixed;
  width: 100%;
  height: 48px;
  left: 0;
  top: 0;

  background: #8A0886;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 30px;
  gap: 16px;
`;

const TitleStyle = styled.div`
  /* Title */

  height: 28px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;

  color: #ffffff;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const DateStyle = styled.div`
  /* date */

  height: 19px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  text-align: right;

  color: #ffffff;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const BtnStyle = styled.div`
  /* Frame 202698 */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  gap: 10px;

  height: 28px;

  border: 1px solid #ffffff;
  border-radius: 4px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const SignUpStyle = styled.div`
  /* Sign up */

  height: 16px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */
  display: flex;
  align-items: center;

  color: #ffffff;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  cursor: pointer;
`;
