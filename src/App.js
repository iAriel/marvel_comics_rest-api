import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import PageDefault from './components/pageDefault';

function App() {
  return (
    <div className="App">
      <ChakraProvider w="100%" h="200px" bgGradient="linear(to-l, #7928CA, #FF0080)" >
        <PageDefault />
      </ChakraProvider>
    </div>
  );
}

export default App;
