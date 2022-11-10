import React, { FC, FormEvent } from "react";
import { HStack, Input, Button, useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";

export interface TodoItem {
  id: string;
  body: string;
}

interface AddTodoProps {
  onAddTodo: (totoItem: TodoItem) => void;
}

const AddTodo: FC<AddTodoProps> = ({ onAddTodo }) => {
  const toast = useToast();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content) {
      toast({
        title: "No content",
        description: "Enter your task please",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const totoItem = {
      id: nanoid(),
      body: content,
    };

    onAddTodo(totoItem);
    setContent("");
  }

  const [content, setContent] = React.useState("");

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt={4}>
        <Input
          variant='filled'
          placeholder='Enter your task'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          colorScheme='blue'
          px='8'
          type='submit'
        >
          ADD
        </Button>
      </HStack>
    </form>
  );
};

export default AddTodo;
