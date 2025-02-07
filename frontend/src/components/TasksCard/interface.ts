export interface Task {
  title: string;
  description?: string;
  isCompleted: boolean;
  userId: string;
  _id: string;
}

export interface TaskCardProps {
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, body: any) => void;
}
