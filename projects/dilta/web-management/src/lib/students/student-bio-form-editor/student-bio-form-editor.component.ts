import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { EntityNames, ModelOperations, schoolClassValueToKey, Student } from '@dilta/platform-shared';
import { RouterDirection } from '@dilta/router';
import { schoolFeature, SchoolStore } from '@dilta/web-auth';
import { AbstractTransportService } from '@dilta/web-transport';
import { Store } from '@ngrx/store';
import { isUndefined } from 'lodash';
import { Observable } from 'rxjs';
import { exhaustMap, first, map, skipWhile } from 'rxjs/operators';


@Component({
  selector: 'admin-ui-student-bio-form-editor',
  templateUrl: './student-bio-form-editor.component.html',
  styleUrls: ['./student-bio-form-editor.component.scss']
})
export class StudentBioFormEditorComponent implements OnInit {
  student$: Observable<Student>;

  constructor(
    private store: Store<any>,
    private transport: AbstractTransportService,
    private avr: ActivatedRoute,
    private util: ClientUtilService,
    private dir: RouterDirection
  ) {}

  /**
   * update or upsert the student
   *
   */
  upsertStudent($event: Student) {
    $event.dob = Number(Date.parse($event.dob.toString()));
    this.store
      .select(schoolFeature)
      .pipe(
        exhaustMap(sch =>
          $event.id
            ? this.updateStudent($event)
            : this.createStudent(sch, $event)
        ),
        first()
      )
      .subscribe(this.changeRoute.bind(this), err => this.util.error(err));
  }

  /**
   * update the student
   *
   */
  updateStudent($event: Student) {
    return this.transport.modelAction<Student>(
      EntityNames.Student,
      ModelOperations.Update,
      $event.id,
      $event
    );
  }

  /**
   * create the student
   *
   */
  createStudent(sch: SchoolStore, $event: Student) {
    $event.school = sch.details.id;
    return this.transport.modelAction<Student>(
      EntityNames.Student,
      ModelOperations.Create,
      $event
    );
  }

  changeRoute(student: Student) {
    // TODO: change to student profile instead of academic dashboard
    this.util.success('Student Form', `student details successfully saved`);
    this.dir.studentForm(student);
  }

  /**
   * retrieve student data
   *
   */
  retrieveStudent() {
    return this.avr.params.pipe(
      map(param => (param as any).id),
      skipWhile(isUndefined),
      exhaustMap(id => {
        return this.transport.modelAction<Student>(
          EntityNames.Student,
          ModelOperations.Retrieve,
          id
        );
      }),
      map(student => {
        if (student) {
          student = Object.assign(student, {
            dob: new Date(Number(student.dob)).toDateString(),
            class: schoolClassValueToKey(student.class)
          });
        }
        return student;
      })
    );
  }

  ngOnInit() {
    this.student$ = this.retrieveStudent();
  }
}
