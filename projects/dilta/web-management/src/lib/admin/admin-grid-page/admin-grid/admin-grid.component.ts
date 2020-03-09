import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridConfig, User, UsersGridConfig } from '@dilta/platform-shared';

export type CleanUser = User & { no: number };


@Component({
  selector: 'admin-ui-user-biodata-grid',
  styleUrls: ['./admin-grid.component.scss'],
  templateUrl: './admin-grid.component.html'
})

export class AdminUserBiodataGridComponent implements OnInit {

  @Input()
  public users: CleanUser[] = [];

  @Input()
  public config: GridConfig = {

  };

  public keys = UsersGridConfig;

  @Output()
  public emitter = new EventEmitter();
  @Output()
  public search = new EventEmitter();

  @Output()
  public paginator = new EventEmitter();

  constructor() { }

  ngOnInit() { }
}
