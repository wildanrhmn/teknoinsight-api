import { Injectable, Inject } from "@nestjs/common";

import { User } from "src/models/forum_user/user.entity";

import { JwtService } from "@nestjs/jwt";

import { TokenPayload } from "src/types/token-payload";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: typeof User,
        private jwtService: JwtService,
    ) {}

    async getAllUsers(): Promise<any> {
        try{
            const users = await this.userRepository.findAll({
                attributes: {
                    exclude: ['user_id', 'password']
                }
            });
            return{
                result: users,
            }
        } catch (err) {
            return {
                error: true,
                message: 'Unable to get users',
            }
        }
    }

    async getDetailUser(payload: TokenPayload): Promise<any> {
        try{
            const user = await this.userRepository.findOne({
                attributes: {
                    exclude: ['user_id', 'password']
                },
                where: {
                    user_id: payload.user_id,
                }
            })
            if(!user){
                return{
                    error: true,
                    message: 'User not found',
                }
            }
            return {
                result: user,
                message: 'Successfully get user detail',
            }
        }
        catch(err){
            return{
                error: true,
                message: 'Unable to get user detail',
            }
        }
    }
}