import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteRankingArgs } from "./DeleteRankingArgs";
import { RankingFindManyArgs } from "./RankingFindManyArgs";
import { RankingFindUniqueArgs } from "./RankingFindUniqueArgs";
import { Ranking } from "./Ranking";
import { RankingService } from "../ranking.service";

@graphql.Resolver(() => Ranking)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RankingResolverBase {
  constructor(
    protected readonly service: RankingService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Ranking])
  @nestAccessControl.UseRoles({
    resource: "Ranking",
    action: "read",
    possession: "any",
  })
  async rankings(
    @graphql.Args() args: RankingFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ranking[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Ranking",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Ranking, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Ranking",
    action: "read",
    possession: "own",
  })
  async ranking(
    @graphql.Args() args: RankingFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ranking | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Ranking",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Ranking)
  @nestAccessControl.UseRoles({
    resource: "Ranking",
    action: "delete",
    possession: "any",
  })
  async deleteRanking(
    @graphql.Args() args: DeleteRankingArgs
  ): Promise<Ranking | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
