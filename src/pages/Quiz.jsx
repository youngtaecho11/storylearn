import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {defaultQuizs} from "../const/const.js";
import styled from "styled-components";
import {Box, Text, Progress, Flex} from "@chakra-ui/react";
import {getABCDE} from "../utils/nameUtils.js";
import HorizontalGap from "../components/HorizontalGap.jsx";
import useTimer from "../hooks/useTimer.js";
import axios from "axios";

const checkCorrectness = (realAnswer, studentAnswer) => {
    if(realAnswer === studentAnswer){
        return 'Y'
    } else if(realAnswer !== studentAnswer){
        return 'N'
    }
}

const Quiz = () => {
    const [quizs, setQuizs] = useState(defaultQuizs);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const { state } = useLocation();
    const { id } = state || '';
    const { timeArray, resetTimer } = useTimer();
    const [answerArray, setAnswerArray] = useState([]);
    const navigate =useNavigate();

    const contentsTotal = useMemo(()=> getABCDE(quizs[currentQuizIndex]?.problem)
        ,[quizs, currentQuizIndex]);

    const handleClickAnswer = (answer) => {
        setAnswerArray(prev=>[...prev, answer]);
        resetTimer();
        setCurrentQuizIndex(prev => {
            if(prev+1 < quizs.length){
                return prev+1;
            }
            else {
                setIsFinished(true);
                return prev;
            }
        });
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
                alert('Get Quizs failed with error: ' + error.message);
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
                        'correctness': checkCorrectness(item?.answer, answerArray[index]),
                        'timestamp': timeArray[index]
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