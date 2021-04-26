import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { SportServiceBase } from "./base/sport.service.base";

@Injectable()
export class SportService extends SportServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
