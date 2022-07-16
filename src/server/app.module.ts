import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AssignmentModule } from "./models/assignments/assignment.module";
import { StudentModule } from "./models/students/student.module";

@Module({
    imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DEVELOPMENT_MONGODB_URI), AssignmentModule, StudentModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
