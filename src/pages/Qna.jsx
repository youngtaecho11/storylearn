import {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {Box, Text, Progress, Flex, EditableTextarea, EditablePreview, Editable, Button} from "@chakra-ui/react";
import axios from "axios"
import logo from '@/logo.png';
import HorizontalGap from "../components/HorizontalGap.jsx";



const Qna = () => {
    const [query, setQuery] = useState("")
    const [answer , setAnswer] = useState("")
    const [isLoading, setIsLoading] = useState(false);


    const handleClickAsk = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('http://0.0.0.0:5501/api/v1/question', {query: query});
            setAnswer(data)
        } catch (error) {
            alert('Asking failed with error: ' + error.message);
            setAnswer('도수분포표는 데이터를 특정한 구간으로 나누어 각 구간에 속하는 데이터의 빈도를 나타낸 표입니다. 이를 통해 데이터의 분포를 시각적으로 쉽게 파악할 수 있습니다. 주로 통계학에서 사용되며, \n' +
                '히스토그램과 같은 그래프 형태로도 표현될 수 있습니다.\n');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <QuizContainer>
            <WelcomeStyle>AI 선생님을 통해 내가 제공한 정보를 바탕으로 질문해 보자!</WelcomeStyle>
            <img src={logo} alt="logo" width={'200px'}/>
            <Editable defaultValue={'클릭해서 질문을 입력하세요.'}
            style={{'width': '70%', 'minHeight': '100px'}}>
                <EditablePreview/>
                <EditableTextarea
                    value={query}
                    onChange={(e) => setQuery((prev) => e.target.value)}
                />
            </Editable>
            <Button
                isLoading={isLoading}
                loadingText='질문 기다리는 중'
                color='#8A0886'
                colorScheme='pink'
                variant='outline'
                spinnerPlacement='end'
                style={{'width': '70%'}}
                onClick={handleClickAsk}
            >
                질문하기
            </Button>
            <HorizontalGap gap={'30px'}/>
            {answer && <AnswerContainer>
                <Text pt='1' fontSize='m'>
                   StorylearnAI : {answer}
                </Text>
            </AnswerContainer>}
        </QuizContainer>
    );
}
export default Qna;


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
   font-size: 25px;
   line-height: 90px;
`;

const WelcomeStyle = styled.div`
  /* Title */
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  /* or 150% */
  width: 70%;

  color: #2c3e50;
`;

const AnswerContainer = styled.div`
   width: 70%;
   display: flex;
   font-family: 'Helvetica';
   font-style: normal;
   font-weight: 400;
   font-size: 20px;
   line-height: 40px;
  
  border-radius: 5px;
  border: thin solid #1F618D;
  padding: 10px;
`;
