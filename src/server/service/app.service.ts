import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getStudentAll() {
    let student_data = this.httpService
      .get('http://localhost:3000/api/student')
      .pipe(map((response) => response.data));

    return student_data;
  }
}
