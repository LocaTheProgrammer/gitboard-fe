import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDTO } from 'src/app/@models/DTO/CategoryDTO';
import { Task } from 'src/app/@models/DTO/Task';
import { TaskList } from 'src/app/@models/DTO/TaskList';

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.scss']
})
export class DragNDropComponent implements OnInit {

  @Input() taskList!: TaskList[]
  @Input() categoryList!: CategoryDTO[]
  @Input() id!: number
  @Input() auth!: string

  @Output() isLoading: boolean = false;

  @Output() result = new EventEmitter<any>();

  containerName: any;
  containerCounter: number = 0;
  isFirstShifting: boolean = true;
  containerNumber!: number
  constructor() { }

  ngOnInit(): void {
    console.log(this.auth)
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
    this.taskList[this.containerNumber].taskListDTOList.forEach(element => {
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
    taskName = this.taskList[catId - 1].taskListDTOList[event.currentIndex].taskName
    taskId = this.taskList[catId - 1].taskListDTOList[event.currentIndex].taskId
    taskListId = this.taskList[catId - 1].taskListDTOList[event.currentIndex].taskListId


    task = new Task(listName, taskName, taskPosition, taskId, taskListId)

    this.loadArrays(catId, task)
    //  this.result.emit(task)

  }

}
