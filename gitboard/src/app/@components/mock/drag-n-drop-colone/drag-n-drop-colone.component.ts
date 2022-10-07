import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDTO } from 'src/app/@models/DTO/CategoryDTO';
import { Task } from 'src/app/@models/DTO/Task';
import { TaskList } from 'src/app/@models/DTO/TaskList';

@Component({
  selector: 'app-drag-n-drop-colone',
  templateUrl: './drag-n-drop-colone.component.html',
  styleUrls: ['./drag-n-drop-colone.component.scss']
})
export class DragNDropColoneComponent implements OnInit {


  @Input() taskList!: any[]
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
    this.taskList[this.containerNumber].cards.forEach((element: any) => {
      element.listName = this.categoryList[catId - 1].description
    })
    this.containerCounter += this.categoryList.length

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


    listName = this.categoryList[catId - 1].description
    taskName = this.taskList[catId - 1].cards[event.currentIndex].description
    taskId = this.taskList[catId - 1].cards[event.currentIndex].taskId
    taskListId = this.taskList[catId - 1].cards[event.currentIndex].taskListId


    let id = this.taskList[catId - 1].cards[event.currentIndex].id

    //TODO dinamico
    let categoryID
    switch (this.taskList[catId - 1].cards[event.currentIndex].category) {
      case 'todo': categoryID = 1; break;
      case 'progress': categoryID = 2; break;
      case 'done': categoryID = 3; break;
      default: console.log("error in switch category")
    }


    task = new Task(listName, taskName, taskPosition, taskId, taskListId, undefined, categoryID, id)

    this.loadArrays(catId, task)
    //  this.result.emit(task)

  }
}
