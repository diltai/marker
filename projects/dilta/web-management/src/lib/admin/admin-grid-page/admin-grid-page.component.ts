import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ClientUtilService } from '@dilta/client-shared';
import * as platformShared from '@dilta/platform-shared';
import { MarkerRouterDirection, RouterDirection } from '@dilta/router';
import { AbstractTransportService } from '@dilta/web-transport';
import { first, map } from 'rxjs/operators';
import { CleanUser } from './admin-grid/admin-grid.component';




@Component({
  selector: 'admin-ui-admin-grid-page',
  templateUrl: './admin-grid-page.component.html',
  styleUrls: ['./admin-grid-page.component.scss']
})
export class AdminGridPageComponent implements OnInit {
  public users: CleanUser[] = [];

  public config: platformShared.GridConfig = {
    filter: true,
    paginator: {
      length: 0,
      count: 0,
      options: [10]
    }
  };

  private _params = { limit: 10, skip: 0, sort: 'name' };

  public keys = platformShared.UsersGridConfig;

  private queryObj: Partial<platformShared.User> | string = {};

  constructor(
    private transport: AbstractTransportService,
    public util: ClientUtilService,
    public dir: RouterDirection,
    public mRte: MarkerRouterDirection
  ) {}

  newAdmin() {
    this.mRte.createStaff();
  }

  /**
   * Clean Data to match grid
   *
   */
  cleanData(admins: platformShared.User[]): CleanUser[] {
    return admins.map((admin, no) =>
      Object.assign({}, admin, {
        no: no + 1,
        class: platformShared.schoolClassValueToKey(admin.class)
      })
    );
  }

  retriveUsers$() {
    return this.transport
      .modelAction<platformShared.FindResponse<platformShared.User>>(
        platformShared.EntityNames.User,
        platformShared.ModelOperations.Find,
        this.queryObj,
        this._params
      )
      .pipe(first());
  }

  search(query: string | Partial<platformShared.User>) {
    this.queryObj = query && query !== '' ? query : {};
    this.retriveUsers$().subscribe(
      res => {
        this.users = this.cleanData(res.data);
        this.config.paginator.length = res.total;
        this.config.paginator.count = res.limit;
      },
      error => this.util.error(error)
    );
  }

  paginator($event: PageEvent) {
    this._params.skip = this._params.limit * $event.pageIndex;
    this.search(this.queryObj);
  }

  print() {
    this.transport
      .modelAction<platformShared.FindResponse<platformShared.User>>(
        platformShared.EntityNames.User,
        platformShared.ModelOperations.Find,
        this.queryObj,
        { limit: this.config.paginator.length, sort: 'name', skip: 0 }
      )
      .pipe(
        first(),
        map(res => this.cleanData(res.data))
      )
      .subscribe(
        users => {
          // this.printer.printTable(UsersGridConfig, users, {
          //   filename: `school staffs ${format(Date.now(), DateFormat)}`
          // });
        },
        error => this.util.error(error)
      );
  }

  ngOnInit() {
    this.search({});
  }
}
