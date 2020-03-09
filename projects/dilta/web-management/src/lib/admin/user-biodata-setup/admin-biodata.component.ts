import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { EntityNames, ModelOperations, PresetAction, School, schoolClassValueToKey, SchoolDict, User } from '@dilta/platform-shared';
import { RouterDirection } from '@dilta/router';
import { schoolFeature } from '@dilta/web-auth';
import { AbstractTransportService } from '@dilta/web-transport';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { combineLatest, exhaustMap, first, map } from 'rxjs/operators';


export interface BiodataFormPageARQMap {
  authId: string;
}

@Component({
  selector: 'admin-ui-user-biodata-form-page',
  templateUrl: './admin-biodata.component.html',
  styleUrls: ['./admin-biodata.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBioDataFormPageComponent implements OnInit {
  /**
   * required keys for the database
   *
   */
  static requiredKeys = [
    'id',
    'name',
    'gender',
    'phoneNo',
    'class',
    'subject',
    'phoneNos',
    'level',
    'address',
    'image',
    'email',
    'authId',
    'school'
  ];

  /**
   * array containing classes
   *
   */
  public view$: BehaviorSubject<SchoolDict> = new BehaviorSubject( {
    classes: [],
    permisions: [],
    subjects: []
  } as SchoolDict);

  public user$: Observable<User>;

  constructor(
    private store: Store<any>,
    private dir: RouterDirection,
    private transport: AbstractTransportService,
    private route: ActivatedRoute,
    private util: ClientUtilService
  ) {}

  /**
   * remaps the event by changing it properities to
   * valid object for the database
   *
   */
  remapEvent$($event: any) {
    const event$ = of($event);
    const authId$ = this.route.params.pipe(
      map((params: BiodataFormPageARQMap) => params.authId)
    );
    const schoolId$ = this.store
      .select(schoolFeature)
      .pipe(
        map(school =>
          typeof school.details === 'string'
            ? school.details
            : school.details.id
        )
      );
    return event$.pipe(
      combineLatest(authId$, schoolId$),
      map(this.remap.bind(this))
    ) as Observable<User>;
  }

  /**
   * changes the event to the standard user event
   *
   */
  remap([event, authId, schoolId]: [User, string, string]) {
    event.authId = authId;
    event.school = schoolId;
    event.phoneNo = event.phoneNo.toString();
    return event;
  }

  /**
   * dispatch an action to save the school biodata details
   * to the database and store
   *
   */
  saveBiodata($event: User) {
    this.remapEvent$($event)
      .pipe(
        exhaustMap(data =>
          data.id ? this.updateUser(data) : this.createUser(data)
        ),
        first()
      )
      .subscribe(this.changeRoute.bind(this), err => this.util.error(err));
  }

  /**
   * Action to create a user biodata if it doesn't exists
   *
   */
  createUser(biodata: User) {
    return this.transport.modelAction<User>(
      EntityNames.User,
      ModelOperations.Create,
      biodata
    );
  }

  /**
   * Action called to update the user biodata
   *
   */
  updateUser(biodata: User) {
    return this.transport.modelAction<User>(
      EntityNames.User,
      ModelOperations.Update,
      biodata.id,
      biodata
    );
  }

  /**
   * listen to the observable to setup the view
   *
   */
  schoolDetails() {
    return this.store
      .select(schoolFeature)
      .pipe(exhaustMap(({ details }) => this.selectView(details)))
      .subscribe(
        (v: SchoolDict) => {
          this.view$.next(v);
        },
        err => this.util.error(err)
      );
  }

  /** app view state for different school categories */
  selectView({ category }: School) {
    return this.transport
      .execute<SchoolDict>(PresetAction.SchoolPreset, category)
      .pipe(
        map(view => {
          view.permisions = Object.keys(view.permisions);
          return view;
        })
      );
  }

  /** gets the user biodata */
  getBiodata() {
    return this.route.params.pipe(
      exhaustMap(({ authId }) =>
        this.transport.modelAction<User>(
          EntityNames.User,
          ModelOperations.Retrieve,
          {
            authId
          }
        )
      )
    );
  }

  /**
   * changes the route to the finished route page
   *
   */
  changeRoute(user: User) {
    if (user) {
      this.util.success('User Form', `User information successfully saved`);
      this.dir.userForm(user);
    }
  }

  ngOnInit() {
    this.user$ = this.getBiodata().pipe(
      map(user => {
        if (user) {
          user = Object.assign(user, {
            class: schoolClassValueToKey(user.class)
          });
        }
        return user;
      })
    );
  }
}
