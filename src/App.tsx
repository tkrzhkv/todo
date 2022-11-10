import { useState, useEffect } from "react";
import { Heading, VStack, IconButton, useColorMode } from "@chakra-ui/react";
import AddTodo, { TodoItem } from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { FaSun, FaMoon } from "react-icons/fa";

const App: React.FC = () => {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos") || "[]"));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: TodoItem): void => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo: TodoItem) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

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
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
      />
      <AddTodo onAddTodo={addTodo} />
    </VStack>
  );
};

export default App;
