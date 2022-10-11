import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddTaskToBoardComponent } from "./add-task-to-board/add-task-to-board.component";
import { AssignUserToProjectComponent } from "./assign-user-to-project/assign-user-to-project.component";
import { ButtonComponent } from "./button/button.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { CreateBoardComponent } from "./create-board/create-board.component";
import { CreateCompanyAdminComponent } from "./create-company-admin/create-company-admin.component";
import { CreateCompanyComponent } from "./create-company/create-company.component";
import { CreateTaskComponent } from "./create-task/create-task.component";
import { CreateUserComponent } from "./create-user/create-user.component";
import { DeleteProjectComponent } from "./delete-project/delete-project.component";
import { DeleteTaskListComponent } from "./delete-task-list/delete-task-list.component";
import { DeletedCardsComponent } from "./deleted-cards/deleted-cards.component";
import { DragNDropComponent } from "./drag-n-drop/drag-n-drop.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { MatFormFieldAutoCompleteComponent } from "./mat-form-field-auto-complete/mat-form-field-auto-complete.component";
import { MatSelectComponent } from "./mat-select/mat-select.component";
import { CreateCardComponent } from "./mock/create-card/create-card.component";
import { DragNDropColoneComponent } from "./mock/drag-n-drop-colone/drag-n-drop-colone.component";
import { ManageCardsComponent } from "./mock/manage-cards/manage-cards.component";
import { ResultMessageComponent } from "./result-message/result-message.component";
import { SpinnerComponent } from "./spinner/spinner.component";


export const providers = [
    MatDatepickerModule,
]


export const imports = [
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    MatAutocompleteModule,
]

export const declarations = [
    SpinnerComponent,

    DragNDropComponent,
    CreateCompanyComponent,
    CreateTaskComponent,
    CreateBoardComponent,
    AddTaskToBoardComponent,
    CreateCompanyAdminComponent,
    ResultMessageComponent,
    AssignUserToProjectComponent,
    MatFormFieldAutoCompleteComponent,
    CreateUserComponent,
    DragNDropColoneComponent,
    CreateCardComponent,
    ManageCardsComponent,
    ButtonComponent,
    MatSelectComponent,
    DeleteTaskListComponent,
    DeletedCardsComponent,
    DeleteProjectComponent,
    EditUserComponent,
    EditProfileComponent,
    ChangePasswordComponent,
];

@NgModule({
    providers: [...providers],
    imports: [...imports],
    exports: [...declarations],
    declarations
})
export class ComponentPagesShared { }