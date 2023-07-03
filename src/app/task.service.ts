import { Injectable } from '@angular/core';
import { ApiconfigService } from './apiconfig.service';
import TaskModel from './models/taskModel';
import { Observable } from 'rxjs';
import TaskListModel from './models/taskListModel';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private apiConfigService: ApiconfigService) {}

  // to fetch all task lists
  getAllTaskLists(): Observable<TaskListModel[]> {
    return this.apiConfigService.getTaskLists('tasklists');
  }

  // getAllTasks(taskListId: string): Observable<TaskModel>{
  //   return this.apiConfigService.getTasks(`tasklists/${taskListId}`);
  // }

  // create a tasklist bucket
  createTaskList(title: string): Observable<TaskListModel> {
    let data = { title: title };
    return this.apiConfigService.post('tasklists', data);
  }

  // to fetch all task inside a task list object
  // http://127.0.0.1:8001/tasklists/64a05b06aa37fc394ce8e807/tasks
  getAllTasksForATaskList(taskListId: string): Observable<TaskModel[]> {
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  // create a task inside a particular tasklist object
  // http://127.0.0.1:8001/tasklists/64a05b06aa37fc394ce8e807/tasks
  createTaskInsideATaskList(taskListId: string, title: string) {
    let data = { title: title };

    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`, data);
  }

  // delete a tasklist
  deleteTaskList(taskListId: string): Observable<TaskListModel> {
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
  }

  // delete a task inside a particular tasklist
  deleteATaskInsideATasklist(
    taskListId: string,
    taskId: string
  ): Observable<TaskModel> {
    return this.apiConfigService.deleteTask(
      `tasklists/${taskListId}/tasks/${taskId}`
    );
  }

  //  update the status of a task wether it is completed or not
  updateTaskStatus(taskListId: string, taskObject: TaskModel) {
    let updateData = { completed: !taskObject.completed };
    return this.apiConfigService.patch(
      `tasklists/${taskListId}/tasks/${taskObject._id}`,
      updateData
    );
  }
}
