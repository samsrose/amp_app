import { ArgsType, Field } from "@nestjs/graphql";
import { LossWhereInput } from "./LossWhereInput";

@ArgsType()
class LossFindManyArgs {
  @Field(() => LossWhereInput, { nullable: true })
  where?: LossWhereInput;
}

export { LossFindManyArgs };
