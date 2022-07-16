import { Controller, Get } from "@nestjs/common";
import { StudentDocument } from "./schema/student.schema";
import { StudentService } from "./student.service";

@Controller("__api/data/student")
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get("all")
    async findAll(): Promise<StudentDocument[]> {
        return await this.studentService.findAll();
    }
}
