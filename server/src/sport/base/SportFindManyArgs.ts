import { ArgsType, Field } from "@nestjs/graphql";
import { SportWhereInput } from "./SportWhereInput";

@ArgsType()
class SportFindManyArgs {
  @Field(() => SportWhereInput, { nullable: true })
  where?: SportWhereInput;
}

export { SportFindManyArgs };
