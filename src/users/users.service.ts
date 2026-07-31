import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { Role } from './role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async create(fullName: string, email: string, passwordHash: string, role: Role): Promise<UserModel> {
    const existing = await this.userModel.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    return this.userModel.create({ fullName, email, passwordHash, role });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({ where: { email } });
  }
}
