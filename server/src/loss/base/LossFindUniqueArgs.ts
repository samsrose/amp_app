import { ArgsType, Field } from "@nestjs/graphql";
import { LossWhereUniqueInput } from "./LossWhereUniqueInput";

@ArgsType()
class LossFindUniqueArgs {
  @Field(() => LossWhereUniqueInput, { nullable: false })
  where!: LossWhereUniqueInput;
}

export { LossFindUniqueArgs };
