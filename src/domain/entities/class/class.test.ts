import { Class } from './Class';

describe('Class', () => {
  const validData = {
    id: '123',
    teacher_id: 'teacher_1',
    name: 'Matemática',
    due_date: new Date('2025-12-31'),
    url: 'https://example.com',
    points: 10,
    type: 'prova',
    extra_lesson_id: 'extra_123',
  };

  it('deve criar uma instância válida da classe', () => {
    const aula = new Class(
      validData.id,
      validData.teacher_id,
      validData.name,
      validData.due_date,
      validData.url,
      validData.points,
      validData.type,
      validData.extra_lesson_id
    );
    expect(aula).toBeInstanceOf(Class);
    expect(aula.toGetId()).toBe(validData.id);
    expect(aula.toGetTeacherId()).toBe(validData.teacher_id);
    expect(aula.toGetName()).toBe(validData.name);
    expect(aula.toGetDueDate()).toEqual(validData.due_date);
    expect(aula.toGetUrl()).toBe(validData.url);
    expect(aula.toGetPoints()).toBe(validData.points);
    expect(aula.toGetType()).toBe(validData.type);
    expect(aula.toGetExtraLessonId()).toBe(validData.extra_lesson_id);
  });

  it('deve lançar um erro se algum campo estiver ausente', () => {
    const invalidData = { ...validData, id: '' };
    expect(() => new Class(
      invalidData.id,
      invalidData.teacher_id,
      invalidData.name,
      invalidData.due_date,
      invalidData.url,
      invalidData.points,
      invalidData.type,
      invalidData.extra_lesson_id
    )).toThrow('Todos os campos são obrigatórios para criar um aula');
  });

  it('deve lançar um erro se a pontuação for negativa', () => {
    const invalidData = { ...validData, points: -5 };
    expect(() => new Class(
      invalidData.id,
      invalidData.teacher_id,
      invalidData.name,
      invalidData.due_date,
      invalidData.url,
      invalidData.points,
      invalidData.type,
      invalidData.extra_lesson_id
    )).toThrow('Pontuação não pode ser negativa');
  });
});
