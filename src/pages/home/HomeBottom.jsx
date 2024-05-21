import styled from 'styled-components';
import ArrowUpIcon from '@/ic_arrow_up.svg?react';
import ArrowDownIcon from '@/ic_arrow_down.svg?react';
import {useCallback, useEffect, useRef, useState} from 'react';
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
import {quizs as defaultQuizs} from "../../const/const.js";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react';
import HorizontalGap from "../../components/HorizontalGap.jsx";
import axios from "axios";

const HomeBottom = ({ quizs = [] }) => {

    const [tempQuizs, setTempQuizs] = useState(defaultQuizs);
    const accordionRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [quizSet, setQuizSet] = useState([]);

    const handleCreateQuizSet = async () => {

        if (!accordionRef.current) return [];
        console.log(accordionRef);

        const labeledElements = accordionRef.current.querySelectorAll('[label]');

        const inputArray =  Array.from(labeledElements).map(el => ({
            key: el.getAttribute('label'),
            value: el.value || el.innerText || el.textContent
        }));

        const resultArray = [];
        for (let i = 0; i < inputArray.length; i += 6) {
            const group = {
                [inputArray[i].key]: inputArray[i].value,
                [inputArray[i + 1].key]: inputArray[i + 1].value,
                [inputArray[i + 2].key]: inputArray[i + 2].value,
                [inputArray[i + 3].key]: inputArray[i + 3].value,
                [inputArray[i + 4].key]: inputArray[i + 4].value,
                [inputArray[i + 5].key]: inputArray[i + 5].value,
            };
            resultArray.push(group);
        }
        console.log(resultArray);

        try {
            setIsLoading(true);
            const response = await axios.post('http://0.0.0.0:5501/api/v1/quiz', resultArray);
            console.log(response);
        } catch (error) {
            alert('Upload failed with error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
        alert("저장이 완료되었어요 !");
    }

    const removeQuizAtIndex = (index) => {
        console.log(index);
        setTempQuizs(prevItems => {
            const newItems = [...prevItems];
            newItems.splice(index, 1);
            return newItems;
        });
    };

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
              <Accordion allowToggle width={'100%'} ref={accordionRef}>
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
                                                      <EditableTextarea minWidth={'900px'} label={'problem'}/>
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
                                          <EditableTextarea minWidth={'900px'} label={'answer'}/>
                                      </Editable>
                                  </Text>
                                  <HorizontalGap gap={'5px'}/>
                                  <Text>
                                      해설 :
                                      <Editable defaultValue={item?.explanation}>
                                          <EditablePreview minWidth={'900px'}/>
                                          <EditableTextarea minWidth={'900px'} label={'explanation'}/>
                                      </Editable>
                                  </Text>
                              </CardBody>

                              <CardFooter
                                  justify='space-between'
                                  flexWrap='wrap'
                                  sx={{
                                      '& > button': {
                                          minW: '136px',
                                      },
                                  }}
                              >
                                  <Button flex='1' variant='ghost' label={'subject'}>
                                      {item?.subject}
                                  </Button>
                                  <Button flex='1' variant='ghost' label={'type'}>
                                      {item?.type}
                                  </Button>
                                  <Button flex='1' variant='ghost' label={'difficulty'}>
                                      {item?.difficulty}
                                  </Button>
                              </CardFooter>
                              <Button
                                  color='red'
                                  colorScheme='red'
                                  variant='outline'
                                  spinnerPlacement='end'
                                  onClick={()=>removeQuizAtIndex(index)}
                                  bg={'white'}
                                  width={'100%'}
                              >
                                  해당 문제 삭제하기
                              </Button>
                          </Card>
                      </AccordionPanel>
                  </AccordionItem>
                  ))}
              </Accordion>
              <HorizontalGap gap={'20px'}/>
              <Button
                  isLoading={isLoading}
                  loadingText='생성 중'
                  color='#8A0886'
                  colorScheme='pink'
                  variant='outline'
                  spinnerPlacement='end'
                  onClick={handleCreateQuizSet}
                  bg={'white'}
                  width={'100%'}
              >
                  문제 및 문제집으로 저장하기
              </Button>
          </Wrapper>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default HomeBottom;

HomeBottom.propTypes = {
    quizs: PropTypes.array,
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
