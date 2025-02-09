import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Poll } from './poll.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({
    type: 'enum',
    enum: ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TEXT'],
  })
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TEXT';

  @ManyToOne(() => Poll, (poll) => poll.questions)
  poll: Poll;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @Column({ nullable: true })
  correctAnswer: string; // JSON строка для правильных ответов
}
