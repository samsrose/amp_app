import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { WinService } from "./win.service";
import { WinControllerBase } from "./base/win.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("wins")
@common.Controller("wins")
export class WinController extends WinControllerBase {
  constructor(
    protected readonly service: WinService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
