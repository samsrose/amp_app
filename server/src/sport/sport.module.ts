import { Module } from "@nestjs/common";
import { SportModuleBase } from "./base/sport.module.base";
import { SportService } from "./sport.service";
import { SportController } from "./sport.controller";
import { SportResolver } from "./sport.resolver";

@Module({
  imports: [SportModuleBase],
  controllers: [SportController],
  providers: [SportService, SportResolver],
  exports: [SportService],
})
export class SportModule {}
