import { IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field } from "@nestjs/graphql"

@ArgsType()
export class GetUserArgs {
    @Field()
    @IsString()
    @IsNotEmpty()
    id: string
}