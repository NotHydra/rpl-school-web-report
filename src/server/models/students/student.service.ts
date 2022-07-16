import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StudentDocument } from "./schema/student.schema";

@Injectable()
export class StudentService {
    constructor(@InjectModel("students") private studentModel: Model<StudentDocument>) {}

    async findAll(): Promise<StudentDocument[]> {
        return await this.studentModel.find().exec();
    }
}
