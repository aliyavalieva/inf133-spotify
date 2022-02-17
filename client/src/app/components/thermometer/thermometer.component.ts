import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  @Input() name:string;
  @Input() percent:string;
  @Input() color:string;

  constructor() { }

  ngOnInit() {
  }

}
