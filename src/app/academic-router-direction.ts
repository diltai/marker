import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicSetting, Auth, Manager, Parent, School, Student, User } from '@dilta/platform-shared';
import { RouterDirection, RouterState } from '@dilta/router';
import { Authorized } from '@dilta/web-auth';
import { Store } from '@ngrx/store';


/**
 * This class holds various route configurations for pages dynamically
 */
@Injectable()
export class AcademicRouterDirection extends RouterDirection {
  private appUrl = 'app';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public state: RouterState,
    public store: Store<any>
  ) {
    super(router, route, state);
  }

  isSetupRoute() {
    const url = window.location.href;
    return url.includes('setup');
  }

  academicSettingForm(settings: AcademicSetting) {
    if (this.isSetupRoute()) {
      this.router.navigate(['setup', 'admin', 'login']);
      return;
    }
  }

  /**
   * the route to load when user biodata is succesfully created or edited
   *
   */
  userForm(user: User) {
    if (this.isSetupRoute()) {
        this.router.navigate(['login']);
        return;
    }
    
    this.viewUserDetails(user);
    // this.store.dispatch(new AuthLogOut());
    // this.router.navigate(['']);
  }

  isUserEdit() {
    
  }

  /**
   * the route to load when user  authentication succesfully signup or edited
   */
  signupForm(auth: Auth) {
    this.router.navigate(['setup', 'admin', 'biodata', auth.id]);
  }

  /**
   * the route to load when user succesfully logins in
   */
  loginForm(auth: Authorized) {
    this.router.navigate([this.appUrl]);
  }

  /**
   * the route to load when school biodata is succesfully created or edited
   */
  schoolForm(school: School) {
    if (this.isSetupRoute()) {
      this.router.navigate(['setup', 'manager', school.id]);
      return;
    }
    this.router.navigate([this.appUrl]);
  }

  /**
   * the route to load when manager's biodata is succesfully created or edited
   */
  managerForm(manager: Manager) {
    if (this.isSetupRoute()) {
      this.router.navigate(['setup', 'settings', manager.school]);
      return;
    }
    this.router.navigate([this.appUrl]);
  }

  /**
   * route for successfull student details.
   */
  studentForm(student: Student) {
    this.viewStudentDetails(student);
  }

  /**
   * route for successfull parent form
   */
  parentForm(parent: Parent) {
    this.viewParent(parent);
  }

  viewStudentDetails(student: Student) {
    this.router.navigate([this.appUrl, 'students', 'profile', student.id]);
  }

  editStudent(student: Student) {
    this.router.navigate([this.appUrl, 'students', 'edit', student.id]);
  }

  viewUserDetails(user: User) {
    this.router.navigate([this.appUrl, 'admins', 'details', user.id]);
  }

  editUser(user: User) {
    this.router.navigate([this.appUrl, 'admins', 'edit', user.authId]);
  }

  deletedStudent() {
    this.router.navigate([this.appUrl, 'levels-stats']);
  }

  deletedUser() {
    this.router.navigate([this.appUrl, 'admins']);
  }

  /**
   * route direction to create a new parent
   */
  createParent(parentPhoneNo: string) {
    this.router.navigate([this.appUrl, 'parents', 'edit', parentPhoneNo]);
  }

  /**
   * route direction to edit parent
   */
  editParent(parent: Parent) {
    this.createParent(parent.phoneNo as string);
  }

  /**
   * route direction to view parent details
   */
  viewParent(parent: Parent | string) {
    this.router.navigate([
      this.appUrl,
      'parents',
      'profile',
      typeof parent === 'object' ? parent.phoneNo : parent
    ]);
  }

  deletedRecord() {
    this.router.navigate([this.appUrl]);
  }
}
