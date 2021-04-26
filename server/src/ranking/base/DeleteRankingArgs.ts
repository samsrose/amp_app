import { ArgsType, Field } from "@nestjs/graphql";
import { RankingWhereUniqueInput } from "./RankingWhereUniqueInput";

@ArgsType()
class DeleteRankingArgs {
  @Field(() => RankingWhereUniqueInput, { nullable: false })
  where!: RankingWhereUniqueInput;
}

export { DeleteRankingArgs };
