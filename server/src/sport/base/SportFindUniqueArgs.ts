import { ArgsType, Field } from "@nestjs/graphql";
import { SportWhereUniqueInput } from "./SportWhereUniqueInput";

@ArgsType()
class SportFindUniqueArgs {
  @Field(() => SportWhereUniqueInput, { nullable: false })
  where!: SportWhereUniqueInput;
}

export { SportFindUniqueArgs };
