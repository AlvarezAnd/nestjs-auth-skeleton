import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('login')
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User, (user) => user.login, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    length: 255,
  })
  password: string;
}
