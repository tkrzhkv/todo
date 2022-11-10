import React from "react";
import {
  VStack,
  HStack,
  Text,
  IconButton,
  StackDivider,
  Spacer,
  Badge,
  Checkbox,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

interface Todo {
  id: string;
  text: string;
}

type TodoListProps = {
  todos: Todo[];
  deleteTodo: (id: string) => void;
};

const TodoList = ({ todos, deleteTodo }: TodoListProps) => {
  if (!todos.length) {
    return (
      <Badge
        colorScheme='purple'
        fontSize={30}
        borderRadius='lg'
        p={2}
      >
        No Todos
      </Badge>
    );
  }

  return (
    <VStack
      divider={<StackDivider />}
      borderColor='grey.100'
      borderWidth='2px'
      p={4}
      borderRadius='lg'
      w='100%'
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      alignItems='strach'
    >
      {todos.map((todo: Todo) => (
        <HStack key={todo.id}>
          <Checkbox
            size='md'
            colorScheme='green'
          ></Checkbox>
          <Text>{todo.text}</Text>
          <Spacer />
          <IconButton
            aria-label='delete-todo'
            icon={<FaTrash />}
            onClick={() => deleteTodo(todo.id)}
          />
        </HStack>
      ))}
    </VStack>
  );
};

export default TodoList;
