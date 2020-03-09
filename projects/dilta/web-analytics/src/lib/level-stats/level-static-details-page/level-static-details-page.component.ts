import { Component, OnInit } from '@angular/core';
import { ClientUtilService } from '@dilta/client-shared';
import { ClassDetailedStat } from '@dilta/platform-shared';
import { MarkerRouterDirection } from '@dilta/router';
import { AcademicService } from '@dilta/web-academics';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  selector: 'acada-level-static-details-page',
  templateUrl: './level-static-details-page.component.html',
  styleUrls: ['./level-static-details-page.component.scss']
})
export class LevelStaticDetailsPageComponent implements OnInit {
  statics$: Observable<ClassDetailedStat[]>;

  constructor(
    private acada: AcademicService,
    public util: ClientUtilService,
    private mRte: MarkerRouterDirection
  ) {}

  viewClass(detail: ClassDetailedStat) {
    this.mRte.level(detail.value);
  }

  print() {
    this.statics$.pipe(first()).subscribe(stats => {
      // this.printer.printTable(LevelStaticDetailsGridConfig, stats, {
      //   filename: `class_levels_statics ${format(Date.now(), DateFormat)}`
      // })
    });
  }

  ngOnInit() {
    this.statics$ = this.acada.levelStatics();
    this.statics$
      .pipe(first())
      .subscribe({ error: err => this.util.error(err) });
  }
}
