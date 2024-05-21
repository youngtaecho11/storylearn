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
import { useToast } from '@chakra-ui/react'
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
} from '@chakra-ui/react'
import CustomAlert from "../../components/CustomAlert.jsx";
import axios from 'axios';



const greetingMessage = getGreetingMessage();

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

  const fetchTasks = useCallback(async () => {
    if (!memberId) {
      return;
    }
    const response = await getTasksByMemberId(memberId);
    const sortedTasks = sortByRule(response?.data ?? [], order);

    setTasks([...sortedTasks]);
  }, [memberId, order]);

  const handleConfirm = useCallback(async () => {
    await postTaskWithMemberId(memberId, contents);
    await fetchTasks();
    setContents('');
  }, [memberId, contents, fetchTasks]);

  const handleChangeDropdown = useCallback(
    value => {
      const sorted = sortByRule(tasks, value);

      setOrder(value);
      setTasks([...sorted]);
    },
    [tasks],
  );

  const countNotDoneTask = useMemo(() => tasks.filter(task => !task?.isDone).length, [tasks]);
  //
  // useEffect(() => {
  //   (() => {
  //     const name = sessionStorage.getItem('name');
  //     if (!name) {
  //       navigate('/login');
  //     }
  //     setUserName(name);
  //     setMemberId(sessionStorage.getItem('id'));
  //   })();
  // }, [navigate]);

  const handleCreateQuiz = async ()=>{
    if (!selectedPlotFile) {
      alert('세계관 PDF가 없어요.');
      return;
    }
    if (!selectedContentsFile) {
      alert('교육자료 PDF가 없어요.');
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
    } catch (error) {
      alert('Upload failed with error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Container>
        <HorizontalGap gap={'20px'}/>
        <TabWrapper>
          <Tabs isFitted variant='enclosed' width={'35%'}>
            <Heading as='h3' size='lg'>
              세계관
            </Heading>
            <HorizontalGap gap={'10px'}/>
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
          <IconWrapper>
            <img src={logo} alt="logo"/>
          </IconWrapper>
          <Tabs isFitted variant='enclosed' width={'35%'} >
            <Heading as='h3' size='lg'>
              교육 자료
            </Heading>
            <HorizontalGap gap={'10px'}/>
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
            onClick={handleCreateQuiz}
        >
          문제 만들기
        </Button>
      </Container>

      <HomeBottom quizs={quizs}/>
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