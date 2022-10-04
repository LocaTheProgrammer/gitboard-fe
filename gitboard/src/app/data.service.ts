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

            taskList: [
                {
                    id: 0,
                    taskListId: 1,
                    isDeleted: false,
                    taskPosition: 0,
                    taskListCategoryId: 3,
                    projectId: 1,
                    taskId: 1,
                    userId: 1
                },
                {
                    id: 1,
                    taskListId: 2,
                    isDeleted: false,
                    taskPosition: 1,
                    taskListCategoryId: 2,
                    projectId: 1,
                    taskId: 2,
                    userId: 1
                },
                {
                    id: 2,
                    taskListId: 3,
                    isDeleted: false,
                    taskPosition: 0,
                    taskListCategoryId: 1,
                    projectId: 1,
                    taskId: 3,
                    userId: 1
                },
                {
                    id: 3,
                    taskListId: 4,
                    isDeleted: false,
                    taskPosition: 1,
                    taskListCategoryId: 3,
                    projectId: 1,
                    taskId: 4,
                    userId: 1
                },
                {
                    id: 4,
                    taskListId: 5,
                    isDeleted: false,
                    taskPosition: 0,
                    taskListCategoryId: 1,
                    projectId: 1,
                    taskId: 5,
                    userId: 1
                }
            ],

            taskListCategory: [
                {
                    id: 1,
                    description: 'todo'
                },
                {
                    id: 2,
                    description: 'progress'
                },
                {
                    id: 3,
                    description: 'done'
                }
            ],

            task: [
                {
                    id: 1,
                    taskName: 'mangiare'
                },
                {
                    id: 2,
                    taskName: 'bere'
                },
                {
                    id: 3,
                    taskName: 'dormire'
                },
                {
                    id: 4,
                    taskName: 'studiare'
                },
                {
                    id: 5,
                    taskName: 'lavorare'
                },
            ],

            card: [
                {
                    id: 1,
                    description: 'mangiare',
                    position: 0,
                    category: 'todo'
                }
            ]
        };
    }
}