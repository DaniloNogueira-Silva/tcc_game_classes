export class Uuid {
  private readonly uuid: string;

  constructor() {
    this.uuid = crypto.randomUUID();
  }

  validate(): void {
    if (!this.uuid) {
      throw new Error('Uuid is required');
    }
  }

  toGetValue(): string {
    return this.uuid;
  }
}
