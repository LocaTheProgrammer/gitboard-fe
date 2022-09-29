import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatFormField } from 'src/app/@models/components/MatFormField';

@Component({
  selector: 'app-mat-form-field-auto-complete',
  templateUrl: './mat-form-field-auto-complete.component.html',
  styleUrls: ['./mat-form-field-auto-complete.component.scss']
})
export class MatFormFieldAutoCompleteComponent implements OnInit {

  @Input() matFormField!:MatFormField

  filteredList!: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
