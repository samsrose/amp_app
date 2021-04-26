import { Module } from "@nestjs/common";
import { WinModuleBase } from "./base/win.module.base";
import { WinService } from "./win.service";
import { WinController } from "./win.controller";
import { WinResolver } from "./win.resolver";

@Module({
  imports: [WinModuleBase],
  controllers: [WinController],
  providers: [WinService, WinResolver],
  exports: [WinService],
})
export class WinModule {}
