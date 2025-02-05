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
import { UserClassProgressService } from './service/user_class_progress.service';
import { CreateUserClassProgressDto } from './dto/create.user_class_progress.dto';
import { UpdateUserClassProgressDto } from './dto/update.user_class_progress.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user-class-progress')
export class UserClassProgressController {
  constructor(
    private readonly userClassProgressService: UserClassProgressService,
  ) {}

  @Get('/')
  async findAll() {
    return this.userClassProgressService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.userClassProgressService.findById(id);
  }

  @Post('/')
  async save(@Body() userClassProgress: CreateUserClassProgressDto) {
    return this.userClassProgressService.save(userClassProgress);
  }

  @Patch('/:id')
  async update(
    @Body() userClassProgress: UpdateUserClassProgressDto,
    @Param('id') id: string,
  ) {
    return this.userClassProgressService.update({ ...userClassProgress, id });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userClassProgressService.delete(id);
  }
}
