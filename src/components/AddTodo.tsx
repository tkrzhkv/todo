import { FC, FormEvent } from "react";
import { HStack, Input, Button, useToast } from "@chakra-ui/react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import useLocalStorage from "../hooks/useLocalStorage";
import { TodoItem } from "../@types/types";

const AddTodo: FC = () => {
  const toast = useToast();
  const [persistedTodos, setPersistedTodos] = useLocalStorage("todos", []);

  const addTodoListState = atom({
    key: "todoListState",
    default: persistedTodos,
  });

  const setTodoList = useSetRecoilState(addTodoListState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      toast({
        title: "No content",
        description: "Enter your task please",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setTodoList((oldTodoList: TodoItem[]) => {
      const newTodoList = [
        ...oldTodoList,
        {
          text,
          id: oldTodoList.length + 1,
        },
      ];
      setPersistedTodos(newTodoList);
      return newTodoList;
    });
    setText("");
  };
  const textState = atom({
    key: "textState",
    default: "",
  });

  const [text, setText] = useRecoilState(textState);

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt={4}>
        <Input
          variant='filled'
          placeholder='Enter your task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          colorScheme='blue'
          px='8'
          type='submit'
        >
          ADD TODO
        </Button>
      </HStack>
    </form>
  );
};

export default AddTodo;
