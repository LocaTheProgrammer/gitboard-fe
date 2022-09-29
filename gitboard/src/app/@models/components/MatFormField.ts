import { FormControl } from "@angular/forms"
import { Observable } from "rxjs"

export class MatFormField{
    public title:string
    public myFormControl:FormControl
    public list:any[]
    public filteredList:Observable<string[]>
    public matAutocompleteValue:any
    public placeholder:string

    constructor(title:string, 
                myFormControl:FormControl,
                list:any[],
                filteredList:Observable<string[]>,
                matAutocompleteValue:any,
                placeholder:string
                ){
        this.title=title
        this.myFormControl=myFormControl
        this.list=list
        this.filteredList=filteredList
        this.matAutocompleteValue=matAutocompleteValue
        this.placeholder=placeholder
    }
}