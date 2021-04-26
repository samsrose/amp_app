import { ArgsType, Field } from "@nestjs/graphql";
import { RankingWhereUniqueInput } from "./RankingWhereUniqueInput";

@ArgsType()
class RankingFindUniqueArgs {
  @Field(() => RankingWhereUniqueInput, { nullable: false })
  where!: RankingWhereUniqueInput;
}

export { RankingFindUniqueArgs };
