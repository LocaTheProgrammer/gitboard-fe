import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDTO } from 'src/app/@models/CategoryDTO';
import { Task } from 'src/app/@models/Task';
import { TaskList } from 'src/app/@models/TaskList';

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.scss']
})
export class DragNDropComponent implements OnInit {

  @Input() taskList!: TaskList[]
  @Input() categoryList!: CategoryDTO[]

  @Output() isLoading: boolean = false;

  @Output() result = new EventEmitter<any>();

  containerName: any;
  containerCounter: number = 0;
  isFirstShifting: boolean = true;
  containerNumber!: number
  constructor() { }

  ngOnInit(): void {
  }

  drop(event: any, catId: number) { // CdkDragDrop<string[]>
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.updateTaskList(event, catId)
  }

  loadArrays(catId: number, task: Task) {
    this.taskList[this.containerNumber].taskDTOList.forEach(element => {
      element.listName = this.categoryList[catId].description
    })

    this.containerCounter = this.containerCounter + 3

    this.isLoading = false

    this.result.emit(task)

  }

  updateTaskList(event: any, catId: any) {
    this.isLoading = true;
    let task: Task;
    let listName = '';
    let taskName = '';
    let taskPosition: number;
    let taskId: any;
    let taskListId: any;

    taskPosition = event.currentIndex

    this.containerName = event.container.id
    let containerNumber = this.containerName.substring(this.containerName.lastIndexOf("-") + 1, this.containerName.length)

    this.containerNumber = +containerNumber - this.containerCounter

    listName = this.categoryList[catId].description
    taskName = this.taskList[catId].taskDTOList[event.currentIndex].taskName
    taskId = this.taskList[catId].taskDTOList[event.currentIndex].taskId
    taskListId = this.taskList[catId].taskDTOList[event.currentIndex].taskListId


    task = new Task(listName, taskName, taskPosition, taskId, taskListId)

   this.loadArrays(catId, task)
  //  this.result.emit(task)

  }

}
