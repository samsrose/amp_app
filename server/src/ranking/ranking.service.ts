import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { RankingServiceBase } from "./base/ranking.service.base";

@Injectable()
export class RankingService extends RankingServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
