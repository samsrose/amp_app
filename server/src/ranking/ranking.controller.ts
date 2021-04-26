import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { RankingService } from "./ranking.service";
import { RankingControllerBase } from "./base/ranking.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("rankings")
@common.Controller("rankings")
export class RankingController extends RankingControllerBase {
  constructor(
    protected readonly service: RankingService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
