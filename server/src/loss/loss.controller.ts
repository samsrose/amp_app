import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LossService } from "./loss.service";
import { LossControllerBase } from "./base/loss.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("losses")
@common.Controller("losses")
export class LossController extends LossControllerBase {
  constructor(
    protected readonly service: LossService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
