import styled from 'styled-components';
import ArrowUpIcon from '@/ic_arrow_up.svg?react';
import ArrowDownIcon from '@/ic_arrow_down.svg?react';
import {useCallback, useEffect, useState} from 'react';
import { deleteTask, patchTask } from '../../services/tasks.js';
import TaskItem from '../../components/TaskItem.jsx';
import { toLocaleDate } from '../../utils/dateUtils.js';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../../../public/fonts/dropdown.css';
import {
    Box,
    Button,
    Editable,
    EditablePreview,
    EditableTextarea,
    Flex,
    Heading,
    IconButton,
    useToast
} from '@chakra-ui/react'
import {quizs as defaultQuizs} from "../../components/const.js";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react';
import HorizontalGap from "../../components/HorizontalGap.jsx";

const HomeBottom = ({ quizs = [] }) => {

    const [tempQuizs, setTempQuizs] = useState(defaultQuizs);

    useEffect(()=>{
        if(!quizs.length) {
            return;
        }
        setTempQuizs(quizs);
    }, [quizs]);

  return (
    <Container>
      {tempQuizs?.length !== 0 ? (
        <>
          <Wrapper>
              <Accordion allowToggle width={'100%'}>
                  {tempQuizs?.map( (item, index) => (
                  <AccordionItem key={'accodian_'+ index}>
                      <h2>
                          <AccordionButton bg='white' _expanded={{ bg: 'purple', color: 'white' }}>
                              <Box as='span' flex='1' textAlign='left'>
                                  {index + 1}번 문제 - [{item?.subject}] - [{item?.type}] - [{item?.difficulty}]
                              </Box>
                              <AccordionIcon />
                          </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                          <Card width={'100%'}>
                              <CardHeader>
                                  <Flex spacing='4'>
                                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                          <Box>
                                              <Heading size='md'>
                                                  <Editable defaultValue={item?.problem}>
                                                      <EditablePreview minWidth={'900px'}/>
                                                      <EditableTextarea minWidth={'900px'}/>
                                                  </Editable>
                                              </Heading>
                                          </Box>
                                      </Flex>
                                  </Flex>
                              </CardHeader>
                              <CardBody>
                                  <Text>
                                      답 :
                                      <Editable defaultValue={item?.answer}>
                                          <EditablePreview minWidth={'900px'}/>
                                          <EditableTextarea minWidth={'900px'}/>
                                      </Editable>
                                  </Text>
                                  <HorizontalGap gap={'5px'}/>
                                  <Text>
                                      해설 :
                                      <Editable defaultValue={item?.explanation}>
                                          <EditablePreview minWidth={'900px'}/>
                                          <EditableTextarea minWidth={'900px'}/>
                                      </Editable>
                                  </Text>
                              </CardBody>
                              {/*<Image*/}
                              {/*    objectFit='cover'*/}
                              {/*    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'*/}
                              {/*    alt='Chakra UI'*/}
                              {/*/>*/}

                              <CardFooter
                                  justify='space-between'
                                  flexWrap='wrap'
                                  sx={{
                                      '& > button': {
                                          minW: '136px',
                                      },
                                  }}
                              >
                                  <Button flex='1' variant='ghost' disabled>
                                      {item?.subject}
                                  </Button>
                                  <Button flex='1' variant='ghost' disabled>
                                      {item?.type}
                                  </Button>
                                  <Button flex='1' variant='ghost' disabled>
                                      {item?.difficulty}
                                  </Button>
                              </CardFooter>
                          </Card>
                      </AccordionPanel>
                  </AccordionItem>
                  ))}
              </Accordion>
            {/*  */}
            {/*{tasks?.map(task => (*/}
            {/*  <TaskItem*/}
            {/*    key={task?.id}*/}
            {/*    id={task?.id}*/}
            {/*    contents={task?.contents}*/}
            {/*    isDone={task?.isDone}*/}
            {/*    createdDate={toLocaleDate(task?.createdDate)}*/}
            {/*    modifiedDate={toLocaleDate(task?.modifiedDate)}*/}
            {/*    onChange={() => onClickCheckbox(task)}*/}
            {/*    onDelete={() => onClickDeleteIcon(task?.id)}*/}
            {/*    fetchTasks={fetchTasks}*/}
            {/*  />*/}
            {/*))}*/}
          </Wrapper>
        </>
      ) : (
        <>
          {/*<IconWrapper>*/}
          {/*    <img src={logo} alt="logo"/>*/}
          {/*</IconWrapper>*/}
        </>
      )}
    </Container>
  );
};

export default HomeBottom;

HomeBottom.propTypes = {
    quizs: PropTypes.array
};

const Container = styled.div`
  width: 100%;
  min-height: 800px;
  background: #f4f4f4;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 24px 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: 40px;
  padding-bottom: 16px;
`;

const BtnStyle = styled.div`
  /* Text btn */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 10px;

  border-radius: 4px;
`;

const IconWrapper = styled.div`
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
