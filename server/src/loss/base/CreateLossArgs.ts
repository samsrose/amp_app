import { ArgsType, Field } from "@nestjs/graphql";
import { LossCreateInput } from "./LossCreateInput";

@ArgsType()
class CreateLossArgs {
  @Field(() => LossCreateInput, { nullable: false })
  data!: LossCreateInput;
}

export { CreateLossArgs };
