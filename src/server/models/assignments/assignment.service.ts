import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AssignmentDocument } from "./schema/assignment.schema";

@Injectable()
export class AssignmentService {
    constructor(@InjectModel("assignments") private assignmentModel: Model<AssignmentDocument>) {}

    async findAll(): Promise<AssignmentDocument[]> {
        return await this.assignmentModel.find().exec();
    }
}
