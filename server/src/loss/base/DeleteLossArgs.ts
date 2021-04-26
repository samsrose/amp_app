import { ArgsType, Field } from "@nestjs/graphql";
import { LossWhereUniqueInput } from "./LossWhereUniqueInput";

@ArgsType()
class DeleteLossArgs {
  @Field(() => LossWhereUniqueInput, { nullable: false })
  where!: LossWhereUniqueInput;
}

export { DeleteLossArgs };
