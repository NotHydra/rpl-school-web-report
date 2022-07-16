import { Controller, Get } from "@nestjs/common";
import { AssignmentService } from "./assignment.service";
import { AssignmentDocument } from "./schema/assignment.schema";

@Controller("__api/data/assignment")
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) {}

    @Get("all")
    async findAll(): Promise<AssignmentDocument[]> {
        return await this.assignmentService.findAll();
    }
}
