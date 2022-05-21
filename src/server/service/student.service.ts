import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../schema/student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async getStudentAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async getStudentById(id: number): Promise<Student> {
    return this.studentModel.findOne({ id: id }).exec();
  }
}
