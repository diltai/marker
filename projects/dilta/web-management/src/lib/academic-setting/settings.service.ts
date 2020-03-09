import { Injectable } from '@angular/core';
import { ClientUtilService } from '@dilta/client-shared';
import { AcademicSetting, EntityNames, ModelOperations } from '@dilta/platform-shared';
import { RouterDirection } from '@dilta/router';
import { schoolFeature } from '@dilta/web-auth';
import { AbstractTransportService } from '@dilta/web-transport';
import { Store } from '@ngrx/store';
import { exhaustMap, first, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AcademicSettingService {
  constructor(
    private store: Store<any>,
    private dir: RouterDirection,
    private transport: AbstractTransportService,
    private util: ClientUtilService
  ) { }

  /**
   * sets the key property on the setting, validates it and upload it
   *
   */
  save(setting: AcademicSetting) {
    this.upload(setting)
      .pipe(first())
      .subscribe(
        val => this.dir.academicSettingForm(val),
        err => this.util.error(err)
      );
  }

  /**
   * checks whether to upload or create the setting
   *
   */
  private upload(setting: AcademicSetting) {
    return setting.id
      ? this.updateSettings(setting)
      : this.createSettings(setting);
  }

  /**
   * retrieve the existing setting for the school
   *
   */
  retrieveSettings() {
    return this.store.select(schoolFeature).pipe(
      map(feature => feature.details),
      exhaustMap(({ id }) =>
        this.transport.modelAction<AcademicSetting>(
          EntityNames.academic_setting,
          ModelOperations.Retrieve,
          { school: id } as Partial<AcademicSetting>
        )
      )
    );
  }

  /**
   * create a new setting for the school
   *
   */
  private createSettings(setting: AcademicSetting) {
    return this.store.select(schoolFeature).pipe(
      map(feature => feature.details),
      exhaustMap(({ id }) =>
        this.transport.modelAction<AcademicSetting>(
          EntityNames.academic_setting,
          ModelOperations.Create,
          { ...setting, school: id } as Partial<AcademicSetting>
        )
      )
    );
  }

  /**
   * updates the settings
   *
   */
  private updateSettings(setting: AcademicSetting) {
    return this.transport.modelAction<AcademicSetting>(
      EntityNames.academic_setting,
      ModelOperations.Update,
      setting.id,
      setting
    );
  }

}
