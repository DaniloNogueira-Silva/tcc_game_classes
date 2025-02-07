import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClassService } from './service/class.service';
import { CreateClassDto } from './dto/create.class.dto';
import { UpdateClassDto } from './dto/update.class.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../auth/decorator';
import { IDecorator } from '../auth/decorator.interface';

@UseGuards(AuthGuard)
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get('/')
  async findAll(@User() user: IDecorator) {
    return this.classService.findAll(user);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.classService.findById(id);
  }

  @Post('/')
  async save(@Body() classRoom: CreateClassDto) {
    return this.classService.save(classRoom);
  }

  @Patch('/:id')
  async update(@Body() classRoom: UpdateClassDto, @Param('id') id: string) {
    return this.classService.update({ ...classRoom, id });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.classService.delete(id);
  }
}
