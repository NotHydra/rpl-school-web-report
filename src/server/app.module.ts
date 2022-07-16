import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AssignmentModule } from "./models/assignments/assignment.module";

@Module({
    imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DEVELOPMENT_MONGODB_URI), AssignmentModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
