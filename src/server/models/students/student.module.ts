import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { StudentSchema } from "./schema/student.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: "students", schema: StudentSchema }])],
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule {}
