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
import { UserMapProgressService } from './service/user_map_progress.service';
import { CreateUserMapProgressDto } from './dto/create.user_map_progress.dto';
import { UpdateUserMapProgressDto } from './dto/update.user_map_progress.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('userMapProgress')
export class UserMapProgressController {
  constructor(
    private readonly userMapProgressService: UserMapProgressService,
  ) {}

  @Get('/')
  async findAll() {
    return this.userMapProgressService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.userMapProgressService.findById(id);
  }

  @Post('/')
  async save(@Body() userMapProgress: CreateUserMapProgressDto) {
    return this.userMapProgressService.save(userMapProgress);
  }

  @Patch('/:id')
  async update(
    @Body() userMapProgress: UpdateUserMapProgressDto,
    @Param('id') id: string,
  ) {
    return this.userMapProgressService.update({ ...userMapProgress, id });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userMapProgressService.delete(id);
  }
}
