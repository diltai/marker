import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { AcademicActions, AcademicSubject, KeysConfig, MathExp, PrinterDocHeader, Record, schoolClassValueToKey, schoolTermValueToKey, Subject, SubjectGridConfig, subjectGridFactory, SubjectRecordDeletedStatus, SubjectRecords } from '@dilta/platform-shared';
import { setHeight } from '@dilta/printing-press';
import { RouterDirection } from '@dilta/router';
import { AbstractTransportService } from '@dilta/web-transport';
import { exhaustMap, first } from 'rxjs/operators';
import { AcademicService } from '../academic.service';

@Component({
  selector: 'acada-subject-grid-page',
  templateUrl: './subject-grid-page.component.html',
  styleUrls: ['./subject-grid-page.component.scss']
})
export class SubjectGridPageComponent implements OnInit {
  /**
   * record details
   *
   */
  public record: Record;

  /**
   * subject datas that matched
   *
   */
  public data: AcademicSubject[];

  /**
   * mathematical expression for evaluation
   *
   */
  public expression: MathExp = 'firstCa + secondCa + exam';

  /**
   * Keys config for table header
   *
   */
  public keys: KeysConfig[] = SubjectGridConfig;

  constructor(
    private route: ActivatedRoute,
    private transport: AbstractTransportService,
    private acada: AcademicService,
    public util: ClientUtilService,
    private dir: RouterDirection
  ) { }

  deleteRecord() {
    this.route.params
      .pipe(
        exhaustMap((params: Params) =>
          this.transport.execute<SubjectRecordDeletedStatus>(
            AcademicActions.DeleteSubjectRecord,
            params.id
          )
        ),
        first()
      )
      .subscribe(
        res => this.alertDeleteSuccess(res),
        err => this.util.error(err)
      );
  }

  alertDeleteSuccess({
    isAllSubjectDeleted,
    isRecordDeleted
  }: SubjectRecordDeletedStatus) {
    const message = `${isRecordDeleted ? 'record has been deleted;' : ''} ${
      isAllSubjectDeleted ? 'students subject records are deleted also' : ''
      }`;
    this.util.success(`Record Delete`, message);
    this.dir.deletedRecord();
  }

  /**
   * Updates the action to update the particular record
   *
   */
  updateSubjectRecord({
    index,
    data
  }: {
    data: AcademicSubject & { no: number };
    index: number;
  }) {
    const { no, ...record } = data;
    this.acada
      .teacherAndSchoolId()
      .pipe(
        exhaustMap(Ids => {
          return this.transport.execute<AcademicSubject>(
            AcademicActions.UpdateSubjectRecord,
            { ...record, ...Ids }
          );
        })
      )
      .pipe(first())
      .subscribe(
        subject => {
          this.data[index] = { ...subject, no } as any;
        },
        err => this.util.error(err)
      );
  }

  emitted(data: Subject) { }

  error(error: Error) {
    this.util.error(error);
  }

  /**
   * retrieve the student details and records
   *
   */
  retriveRecords() {
    return this.route.params.pipe(
      exhaustMap(param =>
        this.transport.execute<SubjectRecords>(
          AcademicActions.SubjectRecord,
          param.id
        )
      ),
      first()
    );
  }

  formatPrint(record: Record) {
    return (doc, height) => {
      const moveDown = setHeight(height);
      let line = moveDown(0);
      doc
        .setFontSize(12)
        .text(`Subject: ${record.subject}`, 10, line)
        .text(`Term: ${schoolTermValueToKey(record.term)}`, 130, line);
      line = moveDown(2);
      doc.line(10, line, 200, line);
      line = moveDown(5);
      doc
        .setFontSize(12)
        .text(`Class:  ${schoolClassValueToKey(record.class)}`, 10, line)
        .text(`Session:  ${record.session}`, 130, line);
      line = moveDown(2);
      doc.line(10, line, 200, line);
      return { doc, height: moveDown(2) } as PrinterDocHeader;
    };
  }

  dataToIndex(records: AcademicSubject[]) {
    return records.map((rec, index) => Object.assign(rec, { no: index + 1 }));
  }

  print() {
    this.retriveRecords().subscribe(
      ({ data, record }) => {
        // this.printer.printTable(SubjectGridConfig, this.dataToIndex(data), {
        //   filename: `${record.subject}  ${record.class} ${
        //     schoolTermValueToKey(record.term)
        //   } term ${format(Date.now(), DateFormat)}`,
        //   map: this.formatPrint(record)
        // });
      },
      err => this.util.error(err)
    );
  }

  ngOnInit() {
    this.retriveRecords().subscribe(
      resp => {
        const { config, expression } = subjectGridFactory(resp.config);
        this.keys = config;
        this.expression = expression;
        this.data = this.dataToIndex(resp.data);
        this.record = resp.record;
      },
      err => this.util.error(err)
    );
  }
}
