import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { RankingResolverBase } from "./base/ranking.resolver.base";
import { Ranking } from "./base/Ranking";
import { RankingService } from "./ranking.service";

@graphql.Resolver(() => Ranking)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RankingResolver extends RankingResolverBase {
  constructor(
    protected readonly service: RankingService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
