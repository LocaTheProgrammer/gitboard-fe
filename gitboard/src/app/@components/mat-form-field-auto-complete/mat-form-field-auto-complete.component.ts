import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-mat-form-field-auto-complete',
  templateUrl: './mat-form-field-auto-complete.component.html',
  styleUrls: ['./mat-form-field-auto-complete.component.scss']
})
export class MatFormFieldAutoCompleteComponent implements OnInit {

  @Input() title!: string
  @Input() myFormControl = new FormControl('');
  @Input() list: any[] = []
  @Input() matAutocompleteValue!: string
  @Input() placeholder!: string
  @Input() filteredList!: Observable<string[]>;

  @Output() emitter = new EventEmitter<any>();
  fp: any
  disabled: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.setFilteredList()
  }

  setFilteredList() {
    console.log("called")
    this.filteredList = this.myFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    console.log(value)
    const filterValue = value.toLowerCase();

    return this.list.filter(option => option.toLowerCase().includes(filterValue));
  }

  onModelChange() {
    console.log(this.myFormControl.valueChanges)
    if (!this.disabled)
      this.filteredList.subscribe(list => {
        this.disabled = true
        this.emitter.emit(list)
      })
  }

  enable() {
    this.disabled = false
  }
}
