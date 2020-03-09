import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { EntityNames, ModelOperations, Parent, ParentRelationship, parentRelationToKey, PresetAction } from '@dilta/platform-shared';
import { RouterDirection } from '@dilta/router';
import { schoolFeature } from '@dilta/web-auth';
import { AbstractTransportService } from '@dilta/web-transport';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { exhaustMap, first, map, tap } from 'rxjs/operators';



export interface ParentFormEditorQPM {
  // unique parent id
  phoneNo: string;
}

interface ViewObject {
  lgas: string[];
  states: string[];
}

@Component({
  selector: 'admin-ui-parent-form-editor',
  templateUrl: './parent-form-editor.component.html',
  styleUrls: ['./parent-form-editor.component.scss']
})
export class ParentFormEditorComponent implements OnInit {
  parent$: Observable<Parent>;

  view$: Observable<ViewObject>;

  constructor(
    private store: Store<any>,
    private actR: ActivatedRoute,
    private dir: RouterDirection,
    private transport: AbstractTransportService,
    private util: ClientUtilService
  ) { }

  createView() {
    const lgas$ = this.transport.execute<string[]>(PresetAction.Lga);
    const states$ = this.transport.execute<string[]>(PresetAction.State);
    return combineLatest(lgas$, states$).pipe(
      map(([lgas, states]) => Object.assign({ lgas, states }) as ViewObject),
      first()
    );
  }

  saveParent(parent: Parent) {
    if (typeof parent.relationship === 'string') {
      parent.relationship = ParentRelationship[parent.relationship];
    }
    const schoolID$ = this.store
      .select(schoolFeature)
      .pipe(
        map(({ details }) => Object.assign(parent, { school: details.id })));
    const parentNo$ = this.actR.params.pipe(
      map((param: ParentFormEditorQPM) => param.phoneNo)
    );
    combineLatest(
      schoolID$, parentNo$
    ).pipe(

      tap(console.log),
      map(([newParent, phoneNo]) => Object.assign(newParent, { phoneNo })),
      exhaustMap(newParent =>
        newParent.id ? this.update(parent) : this.create(parent)
      ),
      first()
    )
      .subscribe(
        newParent => this.dir.viewParent(newParent),
        err => this.util.error(err)
      );
  }

  create(parent: Parent) {
    return this.transport.modelAction<Parent>(
      EntityNames.Parent,
      ModelOperations.Create,
      parent
    );
  }

  update(parent: Parent) {
    return this.transport.modelAction<Parent>(
      EntityNames.Parent,
      ModelOperations.Update,
      parent.id,
      parent
    );
  }

  retrieveParent() {
    return this.actR.params.pipe(
      map((param: ParentFormEditorQPM) => param.phoneNo),
      exhaustMap(phoneNo =>
        this.transport.modelAction<Parent>(
          EntityNames.Parent,
          ModelOperations.Retrieve,
          { phoneNo } as Partial<Parent>
        )
      ),
      map(parent =>
        parent
          ? Object.assign(parent, {
            relationship: parentRelationToKey(parent.relationship)
          })
          : parent
      )
    );
  }

  ngOnInit() {
    this.view$ = this.createView();
    this.parent$ = this.retrieveParent();
  }
}
