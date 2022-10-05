import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() btnType!: string
  @Input() btnText!: string
  @Input() disabledCondition!: boolean
  @Input() id!: string
  @Input() minWidth!: string

  style: string = ''
  constructor() { }

  ngOnInit(): void {
    this.style = 'min-width: ' + this.minWidth
  }

}
