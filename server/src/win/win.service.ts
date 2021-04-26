import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { WinServiceBase } from "./base/win.service.base";

@Injectable()
export class WinService extends WinServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
