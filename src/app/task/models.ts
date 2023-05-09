export const statusTypeName = {
	TASK_STATUS_TODO: "todo",
	TASK_STATUS_DOING: "doing",
	TASK_STATUS_FINISH: "finish"
}

export type Status = {
  id: string
  name: string
}

export type Task = {
  id: string 
  description: string 
  createdAt: Date 
  updatedAt: Date 
  status: Status 
}
