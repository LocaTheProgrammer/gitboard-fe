import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() btnType!:string
  @Input() btnText!:string
  @Input() disabledCondition!:boolean
  @Input() id!:string

  constructor() { }

  ngOnInit(): void {
  }

}
