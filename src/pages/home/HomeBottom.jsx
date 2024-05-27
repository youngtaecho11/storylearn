import styled from 'styled-components';
import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Editable,
    EditablePreview,
    EditableTextarea,
    Flex,
    Heading,
    useToast,
} from '@chakra-ui/react'
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
import {useNavigate} from "react-router-dom";

const HomeBottom = ({ quizs }) => {

    const [tempQuizs, setTempQuizs] = useState(quizs);
    const accordionRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quizToRemove, setQuizToRemove] = useState([]);

    const navigate=useNavigate();
    const toast=useToast();

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
        const arrayToSave = removeElementsByIndices(resultArray, quizToRemove);
        console.log(arrayToSave);

        try {
            setIsLoading(true);
            const response = await axios.post('http://0.0.0.0:5501/api/v1/quiz/complete', {quiz_list: arrayToSave});
            console.log(response);
            await toast({
                title: '성공',
                description: "문제와 문제집 모두 저장 완료되었어요 !",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate("/solving");
        } catch (error) {
            await toast({
                title: '실패',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            //navigate('/error');
        } finally {
            setIsLoading(false);
        }
    }

    const removeElementsByIndices = (array1, array2) => {
        array2.sort((a, b) => a - b);

        let resultArray = [...array1];

        for (let i = array2.length - 1; i >= 0; i--) {
            const index = array2[i];
            if (index >= 0 && index < resultArray.length) {
                resultArray.splice(index, 1);
            }
        }
        return resultArray;
    };

    const removeQuizAtIndex = (index) => {
        setQuizToRemove(prevItems => {
            if (prevItems.includes(index)) {
                return prevItems.filter(i => i !== index);
            } else {
                return [...prevItems, index];
            }
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
                  <AccordionItem key={`accordion_item_${index}`} id={`accordion_item_${index}`} expanded>
                      <h2>
                          <AccordionButton bg='white' _expanded={{ bg: 'purple', color: 'white' }}>
                              <Box as='span' flex='1' textAlign='left' style={{'textDecoration': quizToRemove.includes(index)? 'line-through' : 'none'}}>
                                  {index + 1}번 문제 - [{item?.subject}] - [{item?.type}] - [{item?.difficulty}]
                              </Box>
                              <AccordionIcon />
                          </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                          <Card width={'100%'} key={`card_item_${index}`} id={`card_item_${index}`}
                                bg={quizToRemove?.includes(index)? '#424242': 'white'}
                          >
                              <CardHeader key={`card_header_${index}`} id={`card_header_${index}`}>
                                  <Flex spacing='4'>
                                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                          <Box>
                                              <Heading size='md'>
                                                  <Editable defaultValue={item?.problem} key={`card_problem_${index}`} id={`card_problem_${index}`}>
                                                      <EditablePreview minWidth={'500px'}/>
                                                      <EditableTextarea minWidth={'500px'} label={'problem'}/>
                                                  </Editable>
                                              </Heading>
                                          </Box>
                                      </Flex>
                                  </Flex>
                              </CardHeader>
                              <CardBody key={`card_body_${index}`} id={`card_body_${index}`}>
                                  <Text>
                                      답 :
                                      <Editable defaultValue={item?.answer} key={`card_answer_${index}`} id={`card_answer_${index}`}>
                                          <EditablePreview minWidth={'500px'}/>
                                          <EditableTextarea minWidth={'500px'} label={'answer'}/>
                                      </Editable>
                                  </Text>
                                  <HorizontalGap gap={'5px'}/>
                                  <Text>
                                      해설 :
                                      <Editable defaultValue={item?.explanation} key={`card_explanation_${index}`} id={`card_explanation_${index}`}>
                                          <EditablePreview minWidth={'500px'}/>
                                          <EditableTextarea minWidth={'500px'} label={'explanation'}/>
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
                              {
                                  quizToRemove?.includes(index) ?
                                      <>
                                          <Button
                                              color='#424242'
                                              colorScheme='#424242'
                                              variant='outline'
                                              spinnerPlacement='end'
                                              onClick={()=>removeQuizAtIndex(index)}
                                              bg={'white'}
                                              width={'100%'}
                                          >
                                              해당 문제 제외 취소
                                          </Button>
                                      </>
                                      :
                                      <>
                                          <Button
                                          color='white'
                                          colorScheme='white'
                                          variant='outline'
                                          spinnerPlacement='end'
                                          onClick={()=>removeQuizAtIndex(index)}
                                          bg={'#424242'}
                                          width={'100%'}
                                      >
                                          해당 문제 제외하기
                                      </Button></>
                              }

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
                  height={'50px'}
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