import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { LossServiceBase } from "./base/loss.service.base";

@Injectable()
export class LossService extends LossServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
