import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Question, (question) => question.survey, { cascade: true }) // Важно добавить cascade
  questions: Question[];
}
