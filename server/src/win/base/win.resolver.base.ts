import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteWinArgs } from "./DeleteWinArgs";
import { WinFindManyArgs } from "./WinFindManyArgs";
import { WinFindUniqueArgs } from "./WinFindUniqueArgs";
import { Win } from "./Win";
import { WinService } from "../win.service";

@graphql.Resolver(() => Win)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class WinResolverBase {
  constructor(
    protected readonly service: WinService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Win])
  @nestAccessControl.UseRoles({
    resource: "Win",
    action: "read",
    possession: "any",
  })
  async wins(
    @graphql.Args() args: WinFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Win[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Win",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Win, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Win",
    action: "read",
    possession: "own",
  })
  async win(
    @graphql.Args() args: WinFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Win | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Win",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Win)
  @nestAccessControl.UseRoles({
    resource: "Win",
    action: "delete",
    possession: "any",
  })
  async deleteWin(@graphql.Args() args: DeleteWinArgs): Promise<Win | null> {
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
