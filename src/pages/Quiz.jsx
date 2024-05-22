import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {defaultQuizs} from "../const/const.js";
import styled from "styled-components";
import {Box, Text, Progress, Flex, useToast} from "@chakra-ui/react";
import {getABCDE} from "../utils/nameUtils.js";
import HorizontalGap from "../components/HorizontalGap.jsx";
import useTimer from "../hooks/useTimer.js";
import axios from "axios";

const checkCorrectness = (realAnswer, studentAnswer) => {
    console.log(realAnswer, 'realAnswer');
    console.log(studentAnswer, 'studentAnswer');
    if(realAnswer === studentAnswer){
        return 'Y'
    } else if(realAnswer !== studentAnswer){
        return 'N'
    }
}

const Quiz = () => {
    const [quizs, setQuizs] = useState(defaultQuizs);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [isChecking, setIsChecking] = useState('Unknown');
    const [isFinished, setIsFinished] = useState(false);

    const { state } = useLocation();
    const { id } = state || '';
    const { timeArray, resetTimer, resetTimerAndInsert } = useTimer();
    const [answerArray, setAnswerArray] = useState([]);
    const [correctnessArray, setCorrectnessArray] = useState([]);
    const navigate =useNavigate();
    const toast=useToast();

    const contentsTotal = useMemo(()=> getABCDE(quizs[currentQuizIndex]?.problem)
        ,[quizs, currentQuizIndex]);

    const handleClickAnswer = async (idx, answer) => {
        setAnswerArray(prev=>[...prev, answer]);
        const correctness = checkCorrectness(quizs[idx]?.answer, answer);
        setIsChecking(correctness);
        await resetTimerAndInsert();
        await new Promise(resolve => setTimeout(resolve, 4000));

        setCorrectnessArray(prev=>[...prev, correctness]);
        await setIsChecking('Unknown');
        setCurrentQuizIndex(prev => {
            if(prev+1 < quizs.length){
                return prev+1;
            }
            else {
                setIsFinished(true);
                return prev;
            }
        });
        await resetTimer();
    }

    useEffect(()=>{
        if(!id){
            return;
        }
        (async ()=>{
            try {
                const {data} = await axios.get('http://0.0.0.0:5501/api/v1/workbook/' + id);
                console.log(data);
                setQuizs([...data]);
            } catch (error) {
                await toast({
                    title: '실패',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        })();
        console.log(id);
    }, [id]);

    useEffect(() => {
        if(!isFinished){
            return;
        }
        (async ()=>{
            try {
                const logs = quizs.map((item, index)=>{
                    return {
                        'subject': item?.subject,
                        'type': item?.type,
                        'difficulty': item?.difficulty,
                        'correctness': correctnessArray[index],
                        'timestamp': timeArray[index].toString()
                    }
                })

                const {data} = await axios.post('http://0.0.0.0:5501/api/v1/quiz/solve', {log_list: logs});
                console.log(data);
                navigate('/report');
로
            } catch (error) {
                alert('Get Data from log failed with error: ' + error.message);
                navigate('/error');
            }
        })();
    },[isFinished, quizs]);

    return (
        <QuizContainer>
            <Progress hasStripe value={(currentQuizIndex + 1)/(quizs.length) * 100}
                      width={'-webkit-fill-available'}
                      style={{'minHeight': '20px'}}
            />
            <HorizontalGap gap={'50px'}/>
            <Box>{contentsTotal?.contents}</Box>
            <Flex flex={1}/>
            <HorizontalGap gap={'50px'}/>
            <ButtonWrapper
                isGreen={isChecking !== 'Unknown' && quizs[currentQuizIndex]?.answer === 'A'}
                isRed={isChecking === 'N' && answerArray[currentQuizIndex] === 'A'}
                onClick={()=>handleClickAnswer(currentQuizIndex, 'A')}>{contentsTotal?.contentsA}</ButtonWrapper>
            <ButtonWrapper
                isGreen={isChecking !== 'Unknown' && quizs[currentQuizIndex]?.answer === 'B'}
                isRed={isChecking === 'N' && answerArray[currentQuizIndex] === 'B'}
                onClick={()=>handleClickAnswer(currentQuizIndex, 'B')}>{contentsTotal?.contentsB}</ButtonWrapper>
            <ButtonWrapper
                isGreen={isChecking !== 'Unknown' && quizs[currentQuizIndex]?.answer === 'C'}
                isRed={isChecking === 'N' && answerArray[currentQuizIndex] === 'C'}
                onClick={()=>handleClickAnswer(currentQuizIndex, 'C')}>{contentsTotal?.contentsC}</ButtonWrapper>
            <ButtonWrapper
                onClick={()=>handleClickAnswer(currentQuizIndex, 'D')}
                isGreen={isChecking !== 'Unknown' && quizs[currentQuizIndex]?.answer === 'D'}
                isRed={isChecking === 'N' && answerArray[currentQuizIndex] === 'D'}>{contentsTotal?.contentsD}</ButtonWrapper>
            <ButtonWrapper
                isGreen={isChecking !== 'Unknown' && quizs[currentQuizIndex]?.answer === 'E'}
                isRed={isChecking === 'N' && answerArray[currentQuizIndex] === 'E'}
                onClick={()=>handleClickAnswer(currentQuizIndex, 'E')}>{contentsTotal?.contentsE}</ButtonWrapper>
        </QuizContainer>
    );
}
export default Quiz;

const QuizContainer = styled.div`
    width: 1024px;
    height: 1366px;
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 90px;

`;

const ButtonWrapper = styled.button`
  width: 900px;
  height: 90px;
  padding: 20px 0;
  margin: 10px 0;
  font-weight: 100;
  font-size: 40px;
  line-height: normal;
  
  
  border: 2px solid #D8D8D8;
  border-radius: 20px;
  background-color: ${({ isGreen, isRed }) => {
    if (isGreen) return '#2ECC71';
    if (isRed) return '#F93910';
    return 'white';
  }};
  color: ${({ isGreen, isRed }) => {
    if (isGreen) return 'white';
    if (isRed) return 'white';
    return 'black';
  }};
`;