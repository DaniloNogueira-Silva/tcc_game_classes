export class UserClassProgress {
  private id: string;
  private readonly user_id: string;
  private readonly class_id: string;
  private readonly score: number;
  private readonly is_finish: boolean;
  private readonly completion_date: Date;

  constructor(
    user_id: string,
    class_id: string,
    score: number,
    is_finish: boolean,
    completion_date: Date,
    id?: string,
  ) {
    this.class_id = class_id;
    this.user_id = user_id;
    this.score = score;
    this.is_finish = is_finish;
    this.completion_date = completion_date;

    if (id) {
      this.id = id;
    }
  }

  toGetUserId(): string {
    return this.user_id;
  }

  toGetClassId(): string {
    return this.class_id;
  }

  toGetScore(): number {
    return this.score;
  }

  toGetIsFinish(): boolean {
    return this.is_finish;
  }

  toGetCompletionDate(): Date {
    return this.completion_date;
  }

  toGetId(): string {
    return this.id;
  }
}
