import { Controller, Request, Get, HttpException, UseGuards, Post } from '@nestjs/common';

import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('admin')
@Controller('admin')
export class AdminController{
    constructor(
        private readonly adminService: AdminService,
    ){}

    @Get('/')
    @ApiBearerAuth('Authorization')
    @UseGuards(AuthGuard('admin-jwt'))
    async getAllAdmins(@Request() req: any): Promise<any>{
        const admin = req.user;
        const result = await this.adminService.getAllAdmins(admin);
        
        if (result.error) {
            throw new HttpException(result.message, result.status);
          }
          return result;
    }
}