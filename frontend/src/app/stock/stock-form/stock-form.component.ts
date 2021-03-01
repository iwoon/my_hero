import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {



  constructor(private activatedRoute: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params.id
        if (id) {
          alert(id)
        }
      }
    );
  }
}
