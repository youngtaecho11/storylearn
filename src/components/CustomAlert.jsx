import {Alert, AlertIcon, AlertTitle} from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomAlert = ({ msg }) => {
    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{msg}</AlertTitle>
        </Alert>
    )
}
export default CustomAlert;

CustomAlert.propTypes = {
    msg: PropTypes.string,
}