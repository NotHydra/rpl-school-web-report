import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT).then(() => {
        Logger.log(`Listening on http://localhost:${process.env.PORT}`);
    });
}
bootstrap();
