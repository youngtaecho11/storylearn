import {
    Box,
    Step, StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper, StepSeparator,
    StepStatus,
    StepTitle,
    useSteps
} from "@chakra-ui/react";
import {useState} from "react";
import Home from "../pages/home/Home.jsx";
import PropTypes from "prop-types";

const steps = [
    { title: '세계관 자료', description: '를 넣어주세요.' },
    { title: '교육내용 자료', description: '를 넣어주세요.' },
    { title: '문제 만들기', description: '버튼을 눌러주세요.' },
    { title: '문제 검토 후 저장하기', description: '버튼을 눌러주세요.' },
]

const HomeStepper = ({activeStep}) => {
    return (
        <Stepper colorScheme='pink' index={activeStep}>
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>
                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>
                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}
export default HomeStepper;

HomeStepper.propTypes = {
    currentStep: PropTypes.number,
}