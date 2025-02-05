import { Inject, Injectable } from '@nestjs/common';
import {
  USER_CLASS_PROGRESS_REPOSITORY,
  UserClassProgressRepository,
} from '../../../domain/repositories/user_class_progress_repository';
import { CreateUserClassProgressDto } from '../dto/create.user_class_progress.dto';
import { UserClassProgress } from '../../../domain/entities/user_class_progress/user_class_progress';
import { UpdateUserClassProgressDto } from '../dto/update.user_class_progress.dto';
import { UserClassProgressEntity } from '../../../infrastructure/persistence/entities/user_class_progress_entity';

@Injectable()
export class UserClassProgressService {
  constructor(
    @Inject(USER_CLASS_PROGRESS_REPOSITORY)
    private readonly userClassProgressRepository: UserClassProgressRepository,
  ) {}

  async save(
    dto: CreateUserClassProgressDto,
  ): Promise<UserClassProgress | null> {
    const userClassProgress = new UserClassProgress(
      dto.user_id,
      dto.class_id,
      dto.score,
      dto.is_finish,
      dto.completion_date,
    );
    return this.userClassProgressRepository.save(userClassProgress);
  }

  async findAll(): Promise<UserClassProgressEntity[] | null> {
    return this.userClassProgressRepository.findAll();
  }

  async findById(id: string): Promise<UserClassProgressEntity | null> {
    return this.userClassProgressRepository.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.userClassProgressRepository.delete(id);
  }

  async update(dto: UpdateUserClassProgressDto): Promise<void> {
    const userClassProgress = new UserClassProgress(
      dto.user_id,
      dto.class_id,
      dto.score,
      dto.is_finish,
      dto.completion_date,
      dto.id,
    );
    await this.userClassProgressRepository.update(userClassProgress);
  }
}
