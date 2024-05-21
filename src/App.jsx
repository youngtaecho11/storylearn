import Router from './routes/Router.jsx';
import '../public/fonts.css';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
    return (
        <ChakraProvider>
            <RecoilRoot>
                <Router />
            </RecoilRoot>
        </ChakraProvider>
    );
};

export default App;
