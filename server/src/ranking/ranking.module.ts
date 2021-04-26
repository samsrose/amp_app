import { Module } from "@nestjs/common";
import { RankingModuleBase } from "./base/ranking.module.base";
import { RankingService } from "./ranking.service";
import { RankingController } from "./ranking.controller";
import { RankingResolver } from "./ranking.resolver";

@Module({
  imports: [RankingModuleBase],
  controllers: [RankingController],
  providers: [RankingService, RankingResolver],
  exports: [RankingService],
})
export class RankingModule {}
