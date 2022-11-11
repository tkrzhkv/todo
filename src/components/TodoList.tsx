import { FC, useState } from "react";
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
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import useLocalStorage from "../hooks/useLocalStorage";
import { Todo, TodoListProps } from "../@types/types";

const TodoList: FC = () => {
  const [persistedTodos, setPersistedTodos] = useLocalStorage("todos", []);

  const todoListState = atom({
    key: "todoListState",
    default: persistedTodos,
  });

  const todoList = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);

  const onDeleteTodo = (index: number) => {
    setTodoList((oldTodoList: TodoListProps[]) => {
      const newTodoList = oldTodoList.filter(function (el, i) {
        return index !== i;
      });
      setPersistedTodos(newTodoList);
      return newTodoList;
    });
  };

  if (!todoList.length) {
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
      {todoList.map((todo: Todo, index: number) => (
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
            onClick={() => onDeleteTodo(index)}
          />
        </HStack>
      ))}
    </VStack>
  );
};

export default TodoList;
