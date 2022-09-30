import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class DataService implements InMemoryDbService {
    constructor() { }
    createDb() {
        return {
            products: [
                {
                    id: 1,
                    name: 'Seaman Cap',
                    description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
                    price: '$40'
                },
                {
                    id: 2,
                    name: 'T-shirt',
                    description: 'amet consectetur adipisicing elit.Lorem ipsum dolor sit ',
                    price: '$80'
                },
                {
                    id: 3,
                    name: 'Back Pack',
                    description: 'Voluptatem excepturi harum rerum aliquam magnam nostrum dolore recusandae',
                    price: '$30'
                }
            ],

            //questa è una card TODO refactor
            taskList: [
                {
                    taskListId: 1,
                    isDeleted: false,
                    taskPoistion: 0,
                    taskListCategoryId: 2,
                    projectId: 1,
                    taskId: 1,
                    userId: 1
                }
            ],

            taskListCategory: [
                {
                    taskListCategoryId: 1,
                    taskListcategoryDescription: 'todo'
                },
                {
                    taskListCategoryId: 2,
                    taskListcategoryDescription: 'progress'
                },
                {
                    taskListCategoryId: 3,
                    taskListcategoryDescription: 'done'
                }
            ],

            task: [
                {
                    taskId: 1,
                    taskDescription: 'mangiare'
                },
                {
                    taskId: 2,
                    taskDescription: 'bere'
                },
                {
                    taskId: 3,
                    taskDescription: 'dormire'
                },
                {
                    taskId: 4,
                    taskDescription: 'studiare'
                },
                {
                    taskId: 5,
                    taskDescription: 'lavorare'
                },
            ],

            card: [
                {
                    id:1,
                    description:'mangiare',
                    position:0,
                    category:'todo'
                }
            ]
        };
    }
}