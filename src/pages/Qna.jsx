import {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {Box, Text, Progress, Flex, EditableTextarea, EditablePreview, Editable} from "@chakra-ui/react";
import axios from "axios"


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
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <QuizContainer>
            <Editable defaultValue={'텍스트 입력'}>
                <EditablePreview/>
                <EditableTextarea
                    value={query}
                    onChange={(e) => setQuery((prev) => e.target.value)}
                />
            </Editable>
            <ButtonWrapper onClick={handleClickAsk}>Ask</ButtonWrapper>
            <Text pt='1' fontSize='m'>
                {answer}
            </Text>
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
