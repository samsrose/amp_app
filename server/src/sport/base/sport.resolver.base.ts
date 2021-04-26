import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteSportArgs } from "./DeleteSportArgs";
import { SportFindManyArgs } from "./SportFindManyArgs";
import { SportFindUniqueArgs } from "./SportFindUniqueArgs";
import { Sport } from "./Sport";
import { TeamFindManyArgs } from "../../team/base/TeamFindManyArgs";
import { Team } from "../../team/base/Team";
import { SportService } from "../sport.service";

@graphql.Resolver(() => Sport)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SportResolverBase {
  constructor(
    protected readonly service: SportService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Sport])
  @nestAccessControl.UseRoles({
    resource: "Sport",
    action: "read",
    possession: "any",
  })
  async sports(
    @graphql.Args() args: SportFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Sport[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Sport",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Sport, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Sport",
    action: "read",
    possession: "own",
  })
  async sport(
    @graphql.Args() args: SportFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Sport | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Sport",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Sport)
  @nestAccessControl.UseRoles({
    resource: "Sport",
    action: "delete",
    possession: "any",
  })
  async deleteSport(
    @graphql.Args() args: DeleteSportArgs
  ): Promise<Sport | null> {
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

  @graphql.ResolveField(() => [Team])
  @nestAccessControl.UseRoles({
    resource: "Sport",
    action: "read",
    possession: "any",
  })
  async teams(
    @graphql.Parent() parent: Sport,
    @graphql.Args() args: TeamFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findTeams(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
