import { ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-mat-select',
  templateUrl: './mat-select.component.html',
  styleUrls: ['./mat-select.component.scss']
})
export class MatSelectComponent implements OnInit, DoCheck {

  @Input() label!: string
  @Input() objField!: string
  @Input() list: any[] = []

  @Output() emitter = new EventEmitter<any>();


  itemSelected: any=this.list[0];
  differ: KeyValueDiffer<string, any>;

  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }
  
  ngDoCheck() {
    this.check()
  }

  check(){
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(() => {
        this.emitter.emit(this.itemSelected)
      });
    }
  }

  ngOnInit(): void {
    this.check()
  }



}
