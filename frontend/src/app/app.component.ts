import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // implicit
  favoriteCount = 10;
  // explicit
  mailCount: number = 0;

  image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdqu4YwzhI017hRg-xm_waTsxP20Ah1X9u1w&usqp=CAU';
  username = 'iBlurBlur .DEV';

  onClickLogout(): void {
    alert('logout!!!!');
  }
}
