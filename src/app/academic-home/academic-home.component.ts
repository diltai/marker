import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { School } from '@dilta/platform-shared';
import { MarkerRouterDirection } from '@dilta/router';
import { schoolFeature } from '@dilta/web-auth';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 * interface for configuring the
 * route tree of the sidebar
 */
interface SideBarMenu {
  title: string;
  routes?: SideBarMenu[];
  dir?: () => void;
}


@Component({
  selector: 'acada-academic-home',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './academic-home.component.html',
  styleUrls: ['./academic-home.component.scss'],
})
export class AcademicHomeComponent implements OnInit {
  openSideBar = false;
  $menus = new BehaviorSubject<SideBarMenu[]>([]);
  map = {};

  school$: Observable<School>;

  constructor(
    private mdir: MarkerRouterDirection,
    public store: Store<any>
  ) { }

  toggleSidebar() {
    this.openSideBar = !this.openSideBar;
  }

  topLevel($event: SideBarMenu) {
    console.log($event);
    if ($event.dir) {
      return this.trigger($event);
    }
    this.map[$event.title] = (!this.map.hasOwnProperty($event.title)) ? true : !this.map[$event.title];
  }

  trigger($event: SideBarMenu) {
    $event.dir();
  }

  menuRoutes(): SideBarMenu[] {
    return [
      {
        title: 'Analytics', routes: [
          { title: 'Classes', dir: this.mdir.levelstatics.bind(this.mdir) }
        ]
      },
      {
        title: 'Students', routes: [
          { title: 'New', dir: this.mdir.createStudent.bind(this.mdir) },
          { title: 'all', dir: this.mdir.students.bind(this.mdir) },
        ]
      },
      {
        title: 'Academics', routes: [
          { title: 'Report Card', dir: this.mdir.reportCard.bind(this.mdir) },
          { title: 'Record Subject', dir: this.mdir.createRecord.bind(this.mdir) },
          { title: 'Subject Records', dir: this.mdir.records.bind(this.mdir) },
        ]
      },
      {
        title: 'Personnel', routes: [
          { title: 'New Staff', dir: this.mdir.createStaff.bind(this.mdir) },
          { title: 'Staff Details', dir: this.mdir.staffs.bind(this.mdir) },
        ]
      },
      { title: 'Settings', dir: this.mdir.settings.bind(this.mdir) },
    ];
  }

  schoolBiodata() {
    return this.store.select(schoolFeature)
      .pipe(map(({ details }) => details));
  }

  ngOnInit() {
    this.$menus.next(this.menuRoutes());
    this.school$ = this.schoolBiodata();
  }
}
