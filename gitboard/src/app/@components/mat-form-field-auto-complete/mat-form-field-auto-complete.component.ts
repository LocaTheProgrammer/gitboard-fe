import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-mat-form-field-auto-complete',
  templateUrl: './mat-form-field-auto-complete.component.html',
  styleUrls: ['./mat-form-field-auto-complete.component.scss']
})
export class MatFormFieldAutoCompleteComponent implements OnInit {

  @Input() title!:string
  @Input() myFormControl=new FormControl('');
  @Input() list:any[]=[]
  @Input() matAutocompleteValue!:string
  @Input() placeholder!:string
  @Input() filteredList!: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
    this.filteredList = this.myFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.list.filter(option => option.toLowerCase().includes(filterValue));
  }
}
