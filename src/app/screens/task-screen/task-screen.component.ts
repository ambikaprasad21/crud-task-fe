import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import TaskListModel from 'src/app/models/taskListModel';
import TaskModel from 'src/app/models/taskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.css'],
})
export class TaskScreenComponent implements OnInit {
  taskLists: TaskListModel[] = [];
  tasks: TaskModel[] = [];
  taskListId: string = '';
  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTaskLists().subscribe((allTaskLists) => {
      this.taskLists = allTaskLists;
      // this.router.navigate(['task-list', this.taskLists[0]['_id']]);
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.taskListId = params.taskListId; //after sometime we realised that we will be needing tasklistid so we make it as class level variable
      if (this.taskListId) {
        this.taskService
          .getAllTasksForATaskList(this.taskListId)
          .subscribe((tasks: TaskModel[]) => (this.tasks = tasks));
        //subscribe has access to the return value immediately
      }
    });
  }

  taskClicked(task: TaskModel) {
    // console.log(task);
    this.taskService
      .updateTaskStatus(this.taskListId, task)
      .subscribe(() => (task.completed = !task.completed));
  }

  deleteTask(task: TaskModel) {
    console.log(task);
    this.taskService
      .deleteATaskInsideATasklist(this.taskListId, task._id)
      // after deleting the task from backend we also want to delete it from UI so this will be done by javascript
      .subscribe(
        (taskDeleted: TaskModel) =>
          (this.tasks = this.tasks.filter((t) => t._id != taskDeleted._id))
      ); //remove te deleted task from the class level tasks
    // we basically filter out the task that is deleted and put all the remaining task inside the tasks array
  }

  deleteTaskList(taskListClicked: TaskListModel) {
    this.taskService.deleteTaskList(taskListClicked._id).subscribe(() => {
      this.taskLists = this.taskLists.filter(
        (tl) => tl._id !== taskListClicked._id
      );
    });
  }

  addNewTask() {
    if (this.taskListId) {
      // route the user to add task screen for the selected task-list
      this.router.navigate(['./new-task'], { relativeTo: this.activatedRoute });
    } else {
      alert('Please select a task list!');
      return;
    }
  }
}
