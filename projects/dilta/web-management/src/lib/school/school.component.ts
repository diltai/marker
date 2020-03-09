import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { EntityNames, ModelOperations, PresetAction, School } from '@dilta/platform-shared';
import { RouterDirection } from '@dilta/router';
import { SchoolActionSuccess } from '@dilta/web-auth';
import { AbstractTransportService } from '@dilta/web-transport';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { exhaustMap, first, map } from 'rxjs/operators';


interface ViewObject {
  school: School;
  states: string[];
  lgas: string[];
  categories: string[];
}

/**
 * ui for setting up school biodata
 *
 */
@Component({
  selector: 'admin-ui-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchoolDataFormComponent implements OnInit {
  public viewObject$: Observable<ViewObject>;

  constructor(
    private dir: RouterDirection,
    private store: Store<any>,
    private transport: AbstractTransportService,
    private route: ActivatedRoute,
    private util: ClientUtilService
  ) { }

  /**
   * triggers when the form is submitted for saving in the database
   *
   */
  onSubmit($event: School | Partial<School>) {
    this.transport.log('debug', {
      message: `submiting school data`,
      trace: `SchoolComponent::onSubmit`,
      module: 'AdminUiModule'
    });
    this.route.params
      .pipe(
        map(({ id }) => Object.assign({ id } as any, $event, { globalId: id })),
        exhaustMap((school: School) =>
          this.createOrUpdate(school)
        )
      )
      .pipe(first())
      .subscribe(this.changeRoute.bind(this), err => this.util.error(err));
  }

  createOrUpdate(school: School) {
    if (school.id) {
      return this.transport.modelAction<School>(
        EntityNames.School,
        ModelOperations.Update,
        school.id,
        school
      );
    }
    return this.transport.modelAction<School>(
      EntityNames.School,
      ModelOperations.Create,
      school
    );
  }

  /**
   * changes the route to the admin page for setup
   *
   */
  changeRoute(school: School) {
    this.store.dispatch(new SchoolActionSuccess(school));
    this.transport.log('debug', {
      message: `changing route to admin/${school.id}`,
      trace: `SchoolComponent::changeRoute`,
      module: 'AdminUiModule'
    });
    this.util.success('School Form', `School details saved successfully`);
    this.dir.schoolForm(school);
  }

  retrieveSchool() {
    return this.route.params.pipe(
      map(({ id }) => id),
      exhaustMap(id =>
        this.transport.modelAction<School>(
          EntityNames.School,
          ModelOperations.Retrieve,
          { id }
        )
      )
    );
  }

  reactiveView(): Observable<ViewObject> {
    return combineLatest(
      this.retrieveSchool(),
      this.transport.execute<string[]>(PresetAction.State),
      this.transport.execute<string[]>(PresetAction.Lga),
      this.transport.execute(PresetAction.SchoolCategories)
    ).pipe(
      map(([school, states, lgas, categories]) => Object.assign({ school, states, lgas, categories }))
    );
  }

  ngOnInit() {
    this.viewObject$ = this.reactiveView();
  }
}
