import { AuthModule } from '../auth/auth.module';
import { CLASS_REPOSITORY } from '../../domain/repositories/class_repository';
import { ClassController } from './class.controller';
import { ClassEntity } from '../../infrastructure/persistence/entities/class_entity';
import { ClassService } from './service/class.service';
import { Module } from '@nestjs/common';
import { TypeOrmClassRepository } from '../../infrastructure/repositories/class/typeorm_class_repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity]), AuthModule],
  controllers: [ClassController],
  providers: [
    ClassService,
    {
      provide: CLASS_REPOSITORY,
      useClass: TypeOrmClassRepository,
    },
  ],
  exports: [ClassService],
})
export class ClassModule {}
