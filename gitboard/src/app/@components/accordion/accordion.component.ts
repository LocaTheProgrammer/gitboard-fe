import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { AccordionElement } from 'src/app/@models/components/AccordionElement';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

 @Input() accordionList!:AccordionElement[]

  constructor() { }

  ngOnInit(): void {
  }

}
