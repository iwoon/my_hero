import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // implicit
  favoriteCount = 10;
  // explicit
  mailCount: number = 0;

  image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdqu4YwzhI017hRg-xm_waTsxP20Ah1X9u1w&usqp=CAU';
  username = 'iBlurBlur .DEV';

  @Output() toggle = new EventEmitter<void>();
  @Output() demo = new EventEmitter<string>();

  @Input() mobileQueryMax: MediaQueryList | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onClickLogout(): void {
    alert('logout!!!!');
  }

  onClickToggle(): void {
    this.toggle.emit();
    this.demo.emit('yai');
  }


}

