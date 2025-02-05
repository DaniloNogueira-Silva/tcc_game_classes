export class ExtraLesson {
  private id: string;
  private readonly link?: string;
  private readonly additional_text?: string;

  constructor(
    link?: string,
    additional_text?: string,
    id?: string,
  ) {
    this.additional_text = additional_text;
    this.link = link;
    this.id = id;
  }

  toGetId(): string {
    return this.id;
  }

  toGetLink(): string | undefined {
    return this.link;
  }

  toGetAdditionalText(): string | undefined {
    return this.additional_text;
  }
}
