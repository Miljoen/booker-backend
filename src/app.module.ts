import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import * as Joi from 'joi'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                DATABASE_URL: Joi.string().required(),
            })
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: 'schema.graphql',
            driver: ApolloDriver,
        }),
        UsersModule,
        DatabaseModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
