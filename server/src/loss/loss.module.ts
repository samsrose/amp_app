import { Module } from "@nestjs/common";
import { LossModuleBase } from "./base/loss.module.base";
import { LossService } from "./loss.service";
import { LossController } from "./loss.controller";
import { LossResolver } from "./loss.resolver";

@Module({
  imports: [LossModuleBase],
  controllers: [LossController],
  providers: [LossService, LossResolver],
  exports: [LossService],
})
export class LossModule {}
