import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { Role } from './role.enum';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async create(fullName: string, email: string, password: string, role: Role): Promise<UserModel> {
    const existing = await this.userModel.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    return this.userModel.create({ fullName, email, passwordHash, role });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({ where: { email } });
  }
}
