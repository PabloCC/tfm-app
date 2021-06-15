import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClassroomsService } from 'src/app/shared/services/classrooms.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  classrooms: [];
  isAdmin: boolean;

  constructor(private classroomsService: ClassroomsService, private router: Router, private authService: AuthService) {
    this.isAdmin = false;
  }

  ionViewWillEnter() {
    this.getClassrooms();
    this.isAdmin = this.authService.getRole() === 'ADMIN';
  }
  
  ngOnInit(): void {
  }

  async getClassrooms() {
    this.classrooms = await this.classroomsService.getClassrooms();  
  }

  createClassroom() {
    this.router.navigate(['/tabs/tab1/create-classroom']);
  }

  onEdit(e: MouseEvent, id) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.router.navigate(['/tabs/tab1/edit-classroom/' + id]);
  }
}
