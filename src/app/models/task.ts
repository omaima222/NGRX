import {Tag} from "./tag";
import {User} from "./user";

export interface Task{
  id: number;
  name: string;
  description: string;
  tags: Tag[];
  createdBy: User;
  assignedTo: User;
  priority: string;
  status: string;
}
