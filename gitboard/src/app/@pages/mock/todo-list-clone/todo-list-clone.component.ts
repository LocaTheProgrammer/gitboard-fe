import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDTO } from 'src/app/@models/DTO/CategoryDTO';
import { ProjectUserDTO } from 'src/app/@models/DTO/ProjectUserDTO';
import { Task } from 'src/app/@models/DTO/Task';
import { TaskList } from 'src/app/@models/DTO/TaskList';
import { Card } from 'src/app/@models/mock/Card';
import { CardArray } from 'src/app/@models/mock/CardArry';
import { TaskClone } from 'src/app/@models/mock/TaskClone';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { CategoryService } from 'src/app/@services/category.service';
import { CardService } from 'src/app/@services/mock/card.service';
import { TaskService } from 'src/app/@services/task.service';

@Component({
  selector: 'app-todo-list-clone',
  templateUrl: './todo-list-clone.component.html',
  styleUrls: ['./todo-list-clone.component.scss']
})
export class TodoListCloneComponent implements OnInit {

  todo: string[] = [];
  inProgress: string[] = [];
  done: string[] = [];
  taskList: Task[] = [];
  email: string = ''
  isLoading: boolean = false;
  isManageVisible: boolean = false

  cardsArray: CardArray[] = [];

  containerName: string = ''
  containerCounter: number = 0
  isFirstShifting = true;

  updateError: boolean = false

  id!: number
  isIdValid = true
  inputTaskList!: TaskList[]
  inputCategoryList!: CategoryDTO[]
  message: string = '';


  //mock purpose properties
  cardList: Card[] = []
  taskListMock: TaskClone[] = []
  isCreateVisible: boolean = false

  constructor(
    private taskService: TaskService,
    private _Activatedroute: ActivatedRoute,
    private cardService: CardService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.initialize()
  }

  initialize() {
    let token = this.authService.getDecodedAccessToken()
    this.email = token.sub
    this.getUserTaskListByUserEmail();

  }

  getUserTaskListByUserEmail() {

    this.cardService.getCategories().subscribe(categories => {
      this.inputCategoryList = []
      this.inputCategoryList = categories

      this.cardService.getDynamicUserTaskList().subscribe(tl => {
        this.inputTaskList = []

        console.log(tl)

        //  this.inputTaskList = tl

        this.cardService.getTaskList().subscribe(tasks => {
          this.taskListMock = tasks


          //popolo card array 
          tl.forEach(task => {

            let category: CategoryDTO = categories.filter(category => category.id == task.taskListCategoryId)[0]

            let position = task.taskPosition
            let description = tasks.filter(t => t.id == task.taskId)

            //if (category != undefined) {

            let card = new Card(description[0].taskName, position, category.description, task.taskListId, task.taskId, task.id);
            this.cardList.push(card)

            //}

          })


          let todoCardArray: Card[] = []
          let progCardArray: Card[] = []
          let doneCardArray: Card[] = []

          for (let card of this.cardList) {
            switch (card.category) {
              case 'todo':
                todoCardArray.push(card)
                break;
              case 'progress':
                progCardArray.push(card)
                break;
              case 'done':
                doneCardArray.push(card)
                break;
              default:
                console.log("error")
            }
          }

          todoCardArray = this.sortCardArray(todoCardArray)
          progCardArray = this.sortCardArray(progCardArray)

          doneCardArray = this.sortCardArray(doneCardArray)


          let cardArray = new CardArray([]);
          cardArray = {
            cards: todoCardArray
          }
          this.cardsArray.push(cardArray);

          cardArray = {
            cards: progCardArray
          }
          this.cardsArray.push(cardArray);

          cardArray = {
            cards: doneCardArray
          }
          this.cardsArray.push(cardArray);
          console.log(this.cardsArray)

        })
      })


    })





  }

  drop(event: any) { // CdkDragDrop<string[]>
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
    this.updateTaskList(event)
  }

  loadArrays() {
    this.todo = [];
    this.inProgress = [];
    this.done = [];
    for (let task of this.taskList) {
      switch (task.listName) {
        case 'todo':
          this.todo.push(task.taskName)
          break;
        case 'progress':
          this.inProgress.push(task.taskName)
          break;
        case 'done':
          this.done.push(task.taskName)
          break;
        default:
          this.updateError = true
          break;
      }
    }
    if (!this.isFirstShifting) {
      this.containerCounter = this.containerCounter + 3
    }
    this.isLoading = false
  }

  //TODO: cdk-drop-list-0
  //IN PROGRESS: cdk-drop-list-1
  //DONE: cdk-drop-list-2

  updateTaskList(event: any) {
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
    let switchCondition = +containerNumber - this.containerCounter

    switch (switchCondition) {
      case 0:
        listName = 'todo'
        taskName = this.todo[event.currentIndex]
        break;
      case 1:
        listName = 'progress'
        taskName = this.inProgress[event.currentIndex]
        break;
      case 2:
        listName = 'done'
        taskName = this.done[event.currentIndex]
        break;
      default:
        this.updateError = true
    }


    taskId = this.taskList.find(task => (task.taskName == taskName))?.taskId
    taskListId = this.taskList.find(task => task.taskId == taskId)?.taskListId


    task = new Task(listName, taskName, taskPosition, taskId, taskListId)



  }

  printTask($event: any) {
    console.log($event)

    this.resetAll()
    this.cardService.updateTaskList($event).subscribe(() => {
      this.updateError = false
      this.isFirstShifting = false
      this.taskList = [];
      this.getUserTaskListByUserEmail()
    }, fail => {
      console.log(fail)
      this.updateError = true
      this.isLoading = false

    })
  }


  private sortCardArray(array: Card[]) {
    return array.sort((card1: Card, card2: Card) => {
      return card1.position > card2.position ? 1 : -1;
    })
  }

  action(val: string) {
    this.hide()
    switch (val) {
      case 'create':
        this.isCreateVisible = true;
        break;
      case 'manage':
        this.isManageVisible = true;
        break;
      default:
        console.log('error')
    }
  }

  hide() {
    this.isCreateVisible = false
    this.isManageVisible = false
  }

  updateTaskListEmit($event: any) {
    this.resetAll()
    console.log('called')
    console.log($event)
    this.initialize()
  }

  resetAll() {

    this.todo = [];
    this.inProgress = [];
    this.done = [];
    this.taskList = [];
    this.email = ''
    this.isLoading = false;
    this.isManageVisible = false

    this.cardsArray = [];

    this.containerName = ''
    this.containerCounter = 0
    this.isFirstShifting = true;

    this.updateError = false


    //mock purpose properties
    this.cardList = []
    this.taskListMock = []
    this.isCreateVisible = false

  }

}
