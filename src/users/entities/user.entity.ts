import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Login } from './login.entity';
import { BaseEntity } from '../../database/typeorm/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 100,
  })
  name: string;

  @Column({
    unique: true,
    length: 100,
  })
  email: string;

  @OneToMany(() => Login, (login) => login.user)
  login: Login;
}
