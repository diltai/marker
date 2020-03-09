import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';
import { AcademicSetting } from '@dilta/platform-shared';
import { Observable } from 'rxjs';
import { AcademicSettingService } from './settings.service';


@Component({
  selector: 'shared-academic-setting',
  templateUrl: './academic-setting.component.html',
  styleUrls: ['./academic-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicSettingComponent implements OnInit {
  private academic: AcademicSetting = {} as any;

  public setting$: Observable<AcademicSetting>;

  constructor(
    private settings: AcademicSettingService,
  ) {}

  /**
   * changes the step to the next and calls configure
   *
   */
  stepAndConfigure(stepper: MatHorizontalStepper, key: string, value: any) {
    stepper.next();
    this.configure(key, value);
  }

  /**
   * sets the key property on the setting, validates it and upload it
   *
   */
  configure(key: string, value: any) {
    this.academic[key] = value;
    if (this.academic.record && this.academic.grade) {
      this.settings.save(this.academic);
    }
  }


  ngOnInit() {
    this.setting$ = this.settings.retrieveSettings();
  }
}
