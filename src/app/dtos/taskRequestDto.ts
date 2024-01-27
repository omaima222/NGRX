
export interface TaskRequestDto{
    id: number | null;
    name: string;
    description: string;
    tags: String[];
    created_by_id: number | null;
    status: string;
    priority: string;
    debutDate: string;
    deadline: string;
}
