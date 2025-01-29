import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Survey } from './survey.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['text', 'single_choice', 'multiple_choice'],
    nullable: false,
  })
  type: 'text' | 'single_choice' | 'multiple_choice';

  @Column({ nullable: false })
  text: string;

  @Column('simple-array', { nullable: true }) // Массив строк для вариантов ответа
  options: string[];

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  survey: Survey;
}
