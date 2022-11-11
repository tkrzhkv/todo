export interface Todo {
  id: string;
  text: string;
}

export type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
};

export interface TodoItem {
  id: string;
  text: string;
}
