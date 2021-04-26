import { ArgsType, Field } from "@nestjs/graphql";
import { RankingWhereInput } from "./RankingWhereInput";

@ArgsType()
class RankingFindManyArgs {
  @Field(() => RankingWhereInput, { nullable: true })
  where?: RankingWhereInput;
}

export { RankingFindManyArgs };
