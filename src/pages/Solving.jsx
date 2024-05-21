import styled from "styled-components";
import {Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {defaultQuizSet} from "../const/const.js";
import HorizontalGap from "../components/HorizontalGap.jsx";
import {parseStringToObject} from "../utils/dateUtils.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Solving = () => {
    const [quizSetList, setQuizSetList] = useState(defaultQuizSet);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate('/quiz', {state: {id} });
    }

    useEffect(()=>{
        (async ()=>{
            try {
                const {data} = await axios.get('http://0.0.0.0:5501/api/v1/workbook/all');
                console.log(data);
                setQuizSetList([...data]);
            } catch (error) {
                alert('Get Quiz Set failed with error: ' + error.message);
            }
        })();
    },[]);

    return (
            <Container>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                    {quizSetList?.map((item, index)=>(
                        <Card key={`card_item_${item?.title}`}
                              id={`card_item_${item?.title}`}
                              style={{
                                  'border':'1px solid #819FF7',
                                  'height':'630px',
                                  'width':'100%',
                                  'display':'flex',
                                  'flexDirection':'column',
                                  'alignItems':'center',
                                }}
                        >
                            <HorizontalGap gap={'30px'}/>
                            <CardHeader style={{ 'padding': '70px'}}>
                                <Heading size='md'>
                                    <Text style={{'fontSize': '100px'}}>
                                        {index + 1}
                                    </Text>
                                </Heading>
                            </CardHeader>
                            <CardBody width={'100%'} style={{ 'padding': '0 30px'}}>
                                <Text style={{
                                    'fontSize': '50px',
                                    'display':'flex',
                                    'flexDirection':'row',
                                    'justifyContent':'flex-end',
                                }}>
                                    {parseStringToObject(item?.title).subject}
                                </Text>
                                <Text style={{
                                    'fontSize': '50px',
                                    'display':'flex',
                                    'flexDirection':'row',
                                    'justifyContent':'flex-end',
                                }}>
                                    {item?.quiz_id_list?.length} 문제
                                </Text>
                                <HorizontalGap gap={'10px'}/>
                                <Text style={{
                                    'fontSize': '20px',
                                    'display':'flex',
                                    'flexDirection':'row',
                                    'justifyContent':'flex-end',}}>
                                    {parseStringToObject(item?.title).createdDate}  {parseStringToObject(item?.title).createdTime}
                                </Text>
                            </CardBody>
                            <CardFooter width='100%'>
                                <Button
                                    width='100%'
                                    bg={'#CED8F6'}
                                    style={{
                                    'height': '100px'
                                }}
                                    onClick={()=>handleClick(item?.id)}
                                >
                                    <Text style={{'fontSize': '30px'}}>
                                    풀어보기
                                    </Text>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>
    );
};
export default Solving;

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 72px 60px;
  overflow: hidden;
  min-height: 1366px;
  background-color: #E6E6E6;
`;