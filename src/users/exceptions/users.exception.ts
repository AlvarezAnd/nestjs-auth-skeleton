import { ConflictException, NotFoundException } from '@nestjs/common';

/**
 * HttpCode: 404
 * Message: User with id {id} not found
 */
export class UserNotFoundException extends NotFoundException {
  id: number;
  constructor(id: number) {
    super(`User with id ${id} not found`);
    this.id = id;
  }
}

/**
 * HttpCode: 409
 * Message: User with email {email} already exists
 */
export class UserAlreadyExistsException extends ConflictException {
  email: string;
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.email = email;
  }
}
