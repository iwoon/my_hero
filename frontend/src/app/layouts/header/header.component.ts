import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickLogout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.authService.removeToken();
          this.router.navigate(['member']);
      }
    })
  }

  onClickToggle(): void {
    this.toggle.emit();
    this.demo.emit('yai');
  }


}

