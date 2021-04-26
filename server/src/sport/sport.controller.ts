import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SportService } from "./sport.service";
import { SportControllerBase } from "./base/sport.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("sports")
@common.Controller("sports")
export class SportController extends SportControllerBase {
  constructor(
    protected readonly service: SportService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
