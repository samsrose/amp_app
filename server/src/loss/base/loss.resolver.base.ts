import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateLossArgs } from "./CreateLossArgs";
import { UpdateLossArgs } from "./UpdateLossArgs";
import { DeleteLossArgs } from "./DeleteLossArgs";
import { LossFindManyArgs } from "./LossFindManyArgs";
import { LossFindUniqueArgs } from "./LossFindUniqueArgs";
import { Loss } from "./Loss";
import { LossService } from "../loss.service";

@graphql.Resolver(() => Loss)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LossResolverBase {
  constructor(
    protected readonly service: LossService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Loss])
  @nestAccessControl.UseRoles({
    resource: "Loss",
    action: "read",
    possession: "any",
  })
  async losses(
    @graphql.Args() args: LossFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Loss[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Loss",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Loss, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Loss",
    action: "read",
    possession: "own",
  })
  async loss(
    @graphql.Args() args: LossFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Loss | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Loss",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Loss)
  @nestAccessControl.UseRoles({
    resource: "Loss",
    action: "create",
    possession: "any",
  })
  async createLoss(
    @graphql.Args() args: CreateLossArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Loss> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Loss",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Loss"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Loss)
  @nestAccessControl.UseRoles({
    resource: "Loss",
    action: "update",
    possession: "any",
  })
  async updateLoss(
    @graphql.Args() args: UpdateLossArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Loss | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Loss",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Loss"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Loss)
  @nestAccessControl.UseRoles({
    resource: "Loss",
    action: "delete",
    possession: "any",
  })
  async deleteLoss(@graphql.Args() args: DeleteLossArgs): Promise<Loss | null> {
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
