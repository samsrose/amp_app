import { ArgsType, Field } from "@nestjs/graphql";
import { SportWhereUniqueInput } from "./SportWhereUniqueInput";

@ArgsType()
class DeleteSportArgs {
  @Field(() => SportWhereUniqueInput, { nullable: false })
  where!: SportWhereUniqueInput;
}

export { DeleteSportArgs };
