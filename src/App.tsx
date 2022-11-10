import { useState, useEffect } from "react";
import { Heading, VStack, IconButton, useColorMode } from "@chakra-ui/react";
import AddTodo, { TodoItem } from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { FaSun, FaMoon } from "react-icons/fa";

const initTodos = JSON.parse(localStorage.getItem("todos") || "");

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>(initTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (todo: TodoItem): void => {
    setTodos([...todos, todo]);
  };

  const onDeleteTodo = (id: string) => {
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
        deleteTodo={onDeleteTodo}
      />
      <AddTodo onAddTodo={handleAddTodo} />
    </VStack>
  );
};

export default App;
