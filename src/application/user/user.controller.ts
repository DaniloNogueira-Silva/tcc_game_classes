import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './service/user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Post('/')
  async save(@Body() user: CreateUserDto) {
    return this.userService.save(user);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(@Body() user: UpdateUserDto) {
    return this.userService.update(user);
  }

  @Post('/auth')
  async login(@Body() user: { email: string; password: string }) {
    return this.userService.login(user.email, user.password);
  }
}
