import styled from 'styled-components';
import HorizontalGap from '../../components/HorizontalGap.jsx';
import logo from '@/logo.png';
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview, TabIndicator,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import HomeBottom from './HomeBottom.jsx';
import { sortByRule } from '../../utils/orderUtils.js';
import { getGreetingMessage } from '../../utils/dateUtils.js';
import { useNavigate } from 'react-router-dom';
import { getTasksByMemberId, postTaskWithMemberId } from '../../services/members.js';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import VerticalGap from "../../components/VerticalGap.jsx";
import FileUpload from "../../components/FileUpload.jsx";
import { Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast
} from '@chakra-ui/react'
import axios from 'axios';
import {defaultQuizs} from "../../const/const.js";

const Home = () => {
  const [userName, setUserName] = useState('');
  const [memberId, setMemberId] = useState('');
  const [contents, setContents] = useState('');
  const [tasks, setTasks] = useState([]);
  const [order, setOrder] = useState('Oldest');
  const navigate = useNavigate();
  const toast = useToast();

  const [selectedPlotFile, setSelectedPlotFile] = useState(null);
  const [selectedContentsFile, setSelectedContentsFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quizs, setQuizs] = useState([]);

  const handleChange = useCallback(value => {
    setContents(value);
  }, []);

  useEffect(() => {
    (() => {
      const name = sessionStorage.getItem('name');
      if (!name) {
        navigate('/login');
      }
      setUserName(name);
    })();
  }, [navigate]);

  const handleCreateQuiz = async ()=>{

    if (!selectedPlotFile) {
      await toast({
        title: '실패',
        description: '세계관 PDF가 없어요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!selectedContentsFile) {
      await toast({
        title: '실패',
        description: '교육자료 PDF가 없어요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append(`plot_file`, selectedPlotFile);
    formData.append(`contents_file`, selectedContentsFile);

    try {
      setIsLoading(true);
      const {data} = await axios.post('http://0.0.0.0:5501/api/v1/quiz', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setQuizs([...data]);

      await toast({
        title: '성공',
        description: "문제가 생성 완료되었어요 !",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      await toast({
        title: '실패',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setQuizs(defaultQuizs);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Container>
        <HorizontalGap gap={'20px'}/>
        <TabWrapper>
          <Tabs isFitted variant='enclosed' flex={1}>
            <Heading as='h3' size='lg' textAlign={'center'}>
              세계관
            </Heading>
            <HorizontalGap gap={'20px'}/>
            <TabList>
              <Tab _selected={{ color: 'white', bg: '#8A0886' }}>PDF로 넣기</Tab>
              <Tab _selected={{ color: 'white', bg: '#8A0886' }}>텍스트로 넣기</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FileUpload selectedFile={selectedPlotFile} setSelectedFile={setSelectedPlotFile}/>
              </TabPanel>
              <TabPanel>
                <Editable defaultValue={'텍스트 입력'}>
                  <EditablePreview />
                  <EditableTextarea/>
                </Editable>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <IconWrapper flex={1}>
            <img src={logo} alt="logo"/>
          </IconWrapper>
          <Tabs isFitted variant='enclosed' flex={1}>
            <Heading as='h3' size='lg' textAlign={'center'}>
              교육 자료
            </Heading>
            <HorizontalGap gap={'20px'}/>
            <TabList>
              <Tab _selected={{ color: 'white', bg: '#8A0886' }}>PDF로 넣기</Tab>
              <Tab _selected={{ color: 'white', bg: '#8A0886' }}>텍스트로 넣기</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FileUpload selectedFile={selectedContentsFile} setSelectedFile={setSelectedContentsFile}/>
              </TabPanel>
              <TabPanel>
                <TextAreaStyle>
                  <Editable defaultValue={'텍스트 입력'}>
                    <EditablePreview />
                    <EditableTextarea/>
                  </Editable>
                </TextAreaStyle>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </TabWrapper>
        <Button
            isLoading={isLoading}
            loadingText='생성 중'
            color='#8A0886'
            colorScheme='pink'
            variant='outline'
            spinnerPlacement='end'
            height={'50px'}
            onClick={handleCreateQuiz}
        >
          조합해서 문제 만들기
        </Button>
      </Container>
      {quizs?.length && <HomeBottom quizs={quizs}/>}
    </>
  );
};
export default Home;

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 72px 60px;
`;

const MessageStyle = styled.div`
  /* Title */

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  /* identical to box height, or 150% */

  color: #2c3e50;
`;

const Wrapper = styled.div`
  /* Title */

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 72px;
  /* identical to box height, or 150% */

  color: #2c3e50;
  padding: 10px 0;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;


const IconWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextAreaStyle = styled.div`
  border: 1px solid #8A0886;
  border-radius: 4px;
  padding: 4px;
  min-height: 65px;
`;