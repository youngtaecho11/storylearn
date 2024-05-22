import {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {CircularProgress, Spinner, useToast} from "@chakra-ui/react";
import HorizontalGap from "../components/HorizontalGap.jsx";


const Report = () => {
    const [reportHtml, setReportHtml] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast=useToast();

    const handleClickAsk = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get('http://0.0.0.0:5501/api/v1/report');
            setReportHtml(data)
            await toast({
                title: '성공',
                description: "분석 리포트를 불러왔어요 !",
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
            navigate('/error');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => await handleClickAsk())();
    }, []);

    return (
        <QuizContainer>
            <div dangerouslySetInnerHTML={{__html: reportHtml}}/>
            {
                isLoading &&
                <>
                    <HorizontalGap gap={'100px'}/>
                    <CircularProgress isIndeterminate color='#8A0886' size={'200px'} />
                </>
            }
        </QuizContainer>
    );
}
export default Report;


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