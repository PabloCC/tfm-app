import { Component, OnInit } from '@angular/core';
import { ClassroomsService } from 'src/app/shared/services/classrooms.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  classrooms: [];

  constructor(private classroomsService: ClassroomsService) {
  }
  
  ngOnInit(): void {
    this.getClassrooms();
  }

  async getClassrooms() {
    this.classrooms = await this.classroomsService.getClassrooms();  
  }

}
