import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';
@Injectable({
  providedIn: 'root',
})
export class ApiconfigService {
  API_BASE_URL = 'https://todo-api-kekw.onrender.com';
  // inside the constructor we are using HttpClient module
  constructor(private httpclient: HttpClient) {}

  // get API call
  getTaskLists(url: string) {
    return this.httpclient.get<TaskListModel[]>(`${this.API_BASE_URL}/${url}`);
  }

  getTasks(url: string) {
    return this.httpclient.get<TaskModel[]>(`${this.API_BASE_URL}/${url}`);
  }

  // post API call
  post(url: string, data: Object) {
    return this.httpclient.post<TaskListModel>(
      `${this.API_BASE_URL}/${url}`,
      data
    );
  }

  // patch API call
  patch(url: string, data: Object) {
    return this.httpclient.patch(`${this.API_BASE_URL}/${url}`, data);
  }

  // delete API call
  deleteTaskList(url: string) {
    return this.httpclient.delete<TaskListModel>(`${this.API_BASE_URL}/${url}`);
  }
  deleteTask(url: string) {
    return this.httpclient.delete<TaskModel>(`${this.API_BASE_URL}/${url}`);
  }
}
