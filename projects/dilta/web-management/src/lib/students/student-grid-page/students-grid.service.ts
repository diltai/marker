import { Injectable } from '@angular/core';
import { EntityNames, FindQueryParam, FindResponse, ModelOperations, SearchFindRequest, Student } from '@dilta/platform-shared';
import { AbstractTransportService } from '@dilta/web-transport';

@Injectable()
export class StudentGridService {
  constructor(
    private transport: AbstractTransportService  ) {}

  findStudents(query: SearchFindRequest<Student>, params?: FindQueryParam) {
    return this.transport.modelAction<FindResponse<Student>>(
      EntityNames.Student,
      ModelOperations.Find,
      query,
      params
    );
  }

}
