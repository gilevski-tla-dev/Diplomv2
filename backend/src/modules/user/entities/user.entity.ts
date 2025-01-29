import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  languageCode: string;

  @Column({ default: true })
  allowsWriteToPm: boolean;

  @Column({ nullable: true })
  photoUrl: string;
}
