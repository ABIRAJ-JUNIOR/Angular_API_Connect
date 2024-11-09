import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  constructor(private router:Router){}

  GotoUserList(){
    this.router.navigate(['/user-list']);
  }

  GotoTaskList(){
    this.router.navigate(['/task-list']);
  }

  Lockout(){
    localStorage.removeItem("token")
    this.router.navigate(['/login'])
  }
}
