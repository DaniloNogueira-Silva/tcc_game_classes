import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Post('/')
  async save(@Body() user: CreateUserDto) {
    return this.userService.save(user);
  }

  @Patch('/:id')
  async update(@Body() user: UpdateUserDto) {
    return this.userService.update(user);
  }
}
