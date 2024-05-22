import styled from 'styled-components';
import {useLocation, useNavigate} from 'react-router-dom';
import {useCallback, useRef} from 'react';
import { HamburgerIcon } from '@chakra-ui/icons'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure, Input, Button, Stack, StackDivider, Heading, Box, Text, Avatar, Flex
} from '@chakra-ui/react'
import {getPageName} from "../utils/nameUtils.js";
import VerticalGap from "../components/VerticalGap.jsx";

const currentDate = new Date();
const options = {
    month: 'numeric', // 월을 숫자 형식으로 표시 (예: 9)
    day: 'numeric', // 일을 숫자 형식으로 표시 (예: 13)
};
const formattedDate = `${currentDate.toLocaleDateString('en-US', options)} (${currentDate.toLocaleDateString('en-US', { weekday: 'short' })})`;

const Header = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const onClickSignup = useCallback(() => {
        navigate('/signup');
    }, [navigate]);

    return (
        location?.pathname !== '/quiz' &&
        (<>
            <Wrapper>
                <LeftBox onClick={onOpen}>
                <HamburgerIcon boxSize={30} color='#FFFFFF' ref={btnRef} />
                    <RightBox>DASHBOARD</RightBox>
                </LeftBox>
                <TitleStyle>
                    {getPageName(location?.pathname)}
                </TitleStyle>
                <RightBox>SDS AI HACK 2024</RightBox>
            </Wrapper>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <DrawerTitle>
                            <Flex flexDir={"row"} alignItems={"center"}>
                                <Avatar name={sessionStorage?.getItem('name')?? 'Karli'} src='https://bit.ly/broken-link' />
                                <VerticalGap gap={'20px'}/>
                                {sessionStorage?.getItem('name') ?? 'Karli'}님, 환영해요 !
                            </Flex>
                        </DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack divider={<StackDivider />} spacing='4'
                               style={{'cursor': 'pointer'}}
                        >
                            <Box onClick={()=>navigate('/')}>
                                <Heading size='md' textTransform='uppercase'>
                                    문제 및 문제집 만들기
                                </Heading>
                                <Text pt='2' fontSize='md'>
                                    사용자 주문형 문제를 만들고 묶어서 문제집을 만들 수 있습니다.
                                </Text>
                            </Box>
                            <Box onClick={()=>navigate('/solving')}>
                                <Heading size='md' textTransform='uppercase'>
                                    문제 풀기
                                </Heading>
                                <Text pt='2' fontSize='md'>
                                    사용자가 만들어놓은 문제집을 풀어볼 수 있습니다.
                                </Text>
                            </Box>
                            <Box onClick={()=>navigate('/report')}>
                                <Heading size='md' textTransform='uppercase'>
                                    경향 분석
                                </Heading>
                                <Text pt='2' fontSize='md'>
                                    사용자의 풀이 로그를 바탕으로 분석 리포트를 보여줍니다.
                                </Text>
                            </Box>
                            <Box onClick={()=>navigate('/qna')}>
                                <Heading size='md' textTransform='uppercase'>
                                    질문하고 답변받기
                                </Heading>
                                <Text pt='2' fontSize='md'>
                                    사용자가 주문했던 데이터를 기반으로 AI 질의응답을 할 수 있습니다.
                                </Text>
                            </Box>
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <BtnStyle2>
                            <LogoutStyle onClick={()=>{}}>로그아웃</LogoutStyle>
                        </BtnStyle2>
                        <BtnStyle>
                            <SignUpStyle onClick={onClickSignup}>회원 가입</SignUpStyle>
                        </BtnStyle>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    ));
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
  gap: 10px;

  position: fixed;
  width: 100%;
  height: 48px;
  left: 0;
  top: 0;
  z-index: 999;

  background: #8A0886;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 28px;

`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 28px;
`;

const TitleStyle = styled.div`
  /* Title */
  height: 28px;

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;

  color: #ffffff;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const DateStyle = styled.div`
  /* date */

  height: 19px;

  font-family: 'Helvetica';
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
  margin-right: 5px;

  height: 28px;

  border: 1px solid #8A0886;
  border-radius: 4px;
`;

const BtnStyle2 = styled.div`
  /* Frame 202698 */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  margin-right: 5px;

  height: 28px;

  border: 1px solid #0404B4;
  border-radius: 4px;
`;


const SignUpStyle = styled.div`
  /* Sign up */

  height: 16px;

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */
  display: flex;
  align-items: center;

  color: #8A0886;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  cursor: pointer;
`;

const LogoutStyle = styled.div`
  /* Sign up */

  height: 16px;

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */
  display: flex;
  align-items: center;

  color: #0404B4;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  cursor: pointer;
`;

const DrawerTitle = styled.div`
    display: flex;
  flex-direction: row;
  justify-content: space-between;
`;