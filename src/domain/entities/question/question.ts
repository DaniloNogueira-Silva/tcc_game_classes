export class Question {
  private id: string;
  private readonly extra_lesson_id: string;
  private readonly question: string;
  private readonly answer: string;


  constructor(
    extra_lesson_id: string,
    question: string,
    answer: string,
    id?: string,
  ) {
    this.answer = answer;
    this.question = question;
    this.extra_lesson_id = extra_lesson_id;
    this.id = id;
  }

  toGetId(): string {
    return this.id;
  }

  toGetExtraLessonId(): string {
    return this.extra_lesson_id;
  }

  toGetQuestion(): string {
    return this.question;
  }

  toGetAnswer(): string {
    return this.answer;
  }
}
