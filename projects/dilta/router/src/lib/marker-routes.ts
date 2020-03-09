import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MarkerRouterDirection {
  private appUrl = 'app';
  constructor(private router: Router) { }

  createStaff() {
    this.router.navigate([this.appUrl, 'admins', 'auth']);
  }
  settings() {
    this.router.navigate([this.appUrl]);
  }
  createStudent() {
    this.router.navigate([this.appUrl, 'students', 'edit']);
  }
  levelstatics() {
    this.router.navigate([this.appUrl, 'levels-stats']);
  }

  level(id: any) {
    this.router.navigate([this.appUrl, 'levels-stats', 'class', id]);
  }

  createRecord() {
    this.router.navigate([this.appUrl, 'record']);
  }

  staffs() {
    this.router.navigate([this.appUrl, 'admins']);
  }

  students() {
    this.router.navigate([this.appUrl, 'students-list']);
  }

  records() {
    this.router.navigate([this.appUrl, 'records']);
  }

  reportCard() {
    this.router.navigate([this.appUrl]);
  }
}
