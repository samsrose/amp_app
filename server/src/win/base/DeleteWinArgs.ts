import { ArgsType, Field } from "@nestjs/graphql";
import { WinWhereUniqueInput } from "./WinWhereUniqueInput";

@ArgsType()
class DeleteWinArgs {
  @Field(() => WinWhereUniqueInput, { nullable: false })
  where!: WinWhereUniqueInput;
}

export { DeleteWinArgs };
