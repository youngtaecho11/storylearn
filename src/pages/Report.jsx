import {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {CircularProgress, Spinner} from "@chakra-ui/react";
import HorizontalGap from "../components/HorizontalGap.jsx";


const Report = () => {
    const [reportHtml, setReportHtml] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickAsk = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get('http://0.0.0.0:5501/api/v1/report');
            setReportHtml(data)
        } catch (error) {
            alert('Asking failed with error: ' + error.message);
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
                    <HorizontalGap gap={'50px'}/>
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