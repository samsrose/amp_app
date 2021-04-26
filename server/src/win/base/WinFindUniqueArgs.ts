import { ArgsType, Field } from "@nestjs/graphql";
import { WinWhereUniqueInput } from "./WinWhereUniqueInput";

@ArgsType()
class WinFindUniqueArgs {
  @Field(() => WinWhereUniqueInput, { nullable: false })
  where!: WinWhereUniqueInput;
}

export { WinFindUniqueArgs };
