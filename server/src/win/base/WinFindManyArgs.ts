import { ArgsType, Field } from "@nestjs/graphql";
import { WinWhereInput } from "./WinWhereInput";

@ArgsType()
class WinFindManyArgs {
  @Field(() => WinWhereInput, { nullable: true })
  where?: WinWhereInput;
}

export { WinFindManyArgs };
