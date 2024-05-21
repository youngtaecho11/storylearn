import {useLocation} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {defaultQuizs} from "../const/const.js";
import styled from "styled-components";
import {Box, Text, Progress, Flex} from "@chakra-ui/react";
import {getABCDE} from "../utils/nameUtils.js";
import HorizontalGap from "../components/HorizontalGap.jsx";
import useTimer from "../hooks/useTimer.js";
import axios from "axios";

const Quiz = () => {
    const [quizs, setQuizs] = useState(defaultQuizs);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

    const { state } = useLocation();
    const { id } = state || '';
    const { timeArray, resetTimer } = useTimer();
    const [answerArray, setAnswerArray] = useState([]);

    const contentsTotal = useMemo(()=> getABCDE(quizs[currentQuizIndex]?.problem)
        ,[quizs, currentQuizIndex]);

    const handleClickAnswer = (answer) => {
        setAnswerArray(prev=>[...prev, answer]);
        resetTimer();
        setCurrentQuizIndex(prev => prev+1);
    }

    useEffect(()=>{
        if(!id){
            return;
        }
        (async ()=>{
            try {
                const {data} = await axios.get('http://0.0.0.0:5501/api/v1/quiz/all/' + id);
                console.log(data);
                setQuizs([...data]);
            } catch (error) {
                alert('Get Quizs failed with error: ' + error.message);
            }
        })();
        console.log(id);
    }, [id]);

    useEffect(()=>{
        if(!currentQuizIndex || currentQuizIndex !== quizs.length){
            return;
        }
        console.log(currentQuizIndex);
    }, [currentQuizIndex]);

    return (
        <QuizContainer>
            <Progress hasStripe value={(currentQuizIndex + 1)/(quizs.length) * 100}
                      width={'-webkit-fill-available'}
                      style={{'minHeight': '20px'}}
            />
            <HorizontalGap gap={'50px'}/>
            <Box>{contentsTotal?.contents}</Box>
            <Flex flex={1}/>
            <ButtonWrapper onClick={()=>handleClickAnswer('A')}>{contentsTotal?.contentsA}</ButtonWrapper>
            <ButtonWrapper onClick={()=>handleClickAnswer('B')}>{contentsTotal?.contentsB}</ButtonWrapper>
            <ButtonWrapper onClick={()=>handleClickAnswer('C')}>{contentsTotal?.contentsC}</ButtonWrapper>
            <ButtonWrapper onClick={()=>handleClickAnswer('D')}>{contentsTotal?.contentsD}</ButtonWrapper>
            <ButtonWrapper onClick={()=>handleClickAnswer('E')}>{contentsTotal?.contentsE}</ButtonWrapper>
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
  font-size: 50px;
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
`;