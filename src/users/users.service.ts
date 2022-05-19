import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { GetUserArgs } from './dto/args/get-user-args.dto'
import { CreateUserInput } from './dto/input/create-user-input.dto'

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async createUser(createUserData: CreateUserInput): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: createUserData.email,
            }
        })

        if (user) {
            throw new UnprocessableEntityException('Email already exists.')
        }
        
        return this.prisma.user.create({
            data: {
                email: createUserData.email,
                password: await bcrypt.hash(createUserData.password, 10),
            }
        })
    }

    async getUser(getUserArgs: GetUserArgs): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id: parseInt(getUserArgs.id)
            }
        })
    }
}
