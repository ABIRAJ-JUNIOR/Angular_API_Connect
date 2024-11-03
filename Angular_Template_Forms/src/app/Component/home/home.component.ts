import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(private router:Router){}

  GotoUserList(){
    this.router.navigate(['/user-list']);
  }

  GotoTaskList(){
    this.router.navigate(['/task-list']);
  }
}
