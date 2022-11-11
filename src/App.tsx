import { Heading, VStack, IconButton, useColorMode } from "@chakra-ui/react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { FaSun, FaMoon } from "react-icons/fa";

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack>
      <IconButton
        aria-label='color-mode'
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        alignSelf='flex-end'
        onClick={toggleColorMode}
      />
      <Heading fontWeight='extrabold'>Todo List</Heading>
      <TodoList />
      <AddTodo />
    </VStack>
  );
};

export default App;
