import { LessonPlan } from './lesson_plan';

describe('LessonPlan', () => {
  const validData = {
    id: '123',
    teacher_id: 'teacher_1',
    name: 'Matemática',
    theme: 'Cálculo',
  };

  it('deve criar uma instância válida do plano de aula', () => {
    const planoDeAula = new LessonPlan(
      validData.id,
      validData.teacher_id,
      validData.name,
      validData.theme,
    );
    expect(planoDeAula).toBeInstanceOf(LessonPlan);
    expect(planoDeAula.toGetId()).toBe(validData.id);
    expect(planoDeAula.toGetTeacherId()).toBe(validData.teacher_id);
    expect(planoDeAula.toGetName()).toBe(validData.name);
    expect(planoDeAula.toGetTheme()).toEqual(validData.theme);
  });

  it('deve lançar um erro se algum campo estiver ausente', () => {
    const invalidData = { ...validData, id: '' };
    expect(
      () =>
        new LessonPlan(
          invalidData.id,
          invalidData.teacher_id,
          invalidData.name,
          invalidData.theme,
        ),
    ).toThrow('Todos os campos são obrigatórios para criar um plano de aula');
  });
});
