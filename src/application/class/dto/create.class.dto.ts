export interface CreateClassDto {
    name: string;
    due_date: Date;
    url: string;
    points: number;
    type: string;
    extra_lesson_id: string;
    teacher_id: string;
}