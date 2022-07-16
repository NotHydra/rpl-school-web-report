import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DEVELOPMENT_MONGODB_URI)],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
