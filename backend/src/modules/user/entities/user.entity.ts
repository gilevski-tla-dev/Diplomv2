import { Poll } from 'src/modules/poll/entities/poll.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({ nullable: true })
  username: string | null;

  @Column({ nullable: true })
  languageCode: string | null;

  @Column({ default: true })
  allowsWriteToPm: boolean;

  @Column({ nullable: true })
  photoUrl: string | null;

  @OneToMany(() => Poll, (poll) => poll.owner)
  polls: Poll[]; // Связь с опросами
}
