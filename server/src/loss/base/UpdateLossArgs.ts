import { ArgsType, Field } from "@nestjs/graphql";
import { LossWhereUniqueInput } from "./LossWhereUniqueInput";
import { LossUpdateInput } from "./LossUpdateInput";

@ArgsType()
class UpdateLossArgs {
  @Field(() => LossWhereUniqueInput, { nullable: false })
  where!: LossWhereUniqueInput;
  @Field(() => LossUpdateInput, { nullable: false })
  data!: LossUpdateInput;
}

export { UpdateLossArgs };
