import { Inject, Injectable } from '@nestjs/common';
import {
  USER_MAP_PROGRESS_REPOSITORY,
  UserMapProgressRepository,
} from '../../../domain/repositories/user_map_progress_repository';
import { CreateUserMapProgressDto } from '../dto/create.user_map_progress.dto';
import { UserMapProgress } from '../../../domain/entities/user_map_progress/user_map_progress';
import { UpdateUserMapProgressDto } from '../dto/update.user_map_progress.dto';
import { UserMapProgressEntity } from '../../../infrastructure/persistence/entities/user_map_progress_entity';

@Injectable()
export class UserMapProgressService {
  constructor(
    @Inject(USER_MAP_PROGRESS_REPOSITORY)
    private readonly userMapProgressRepository: UserMapProgressRepository,
  ) {}

  async save(dto: CreateUserMapProgressDto): Promise<UserMapProgress | null> {
    const userMapProgress = new UserMapProgress(
      dto.student_id,
      dto.lesson_plan_id,
      dto.score,
      dto.status,
    );
    return this.userMapProgressRepository.save(userMapProgress);
  }

  async findAll(): Promise<UserMapProgressEntity[] | null> {
    return this.userMapProgressRepository.findAll();
  }

  async findById(id: string): Promise<UserMapProgressEntity | null> {
    return this.userMapProgressRepository.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.userMapProgressRepository.delete(id);
  }

  async update(dto: UpdateUserMapProgressDto): Promise<void> {
    const userMapProgress = new UserMapProgress(
      dto.student_id,
      dto.lesson_plan_id,
      dto.score,
      dto.status,
      dto.id,
    );
    await this.userMapProgressRepository.update(userMapProgress);
  }
}
