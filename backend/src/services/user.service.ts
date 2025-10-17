import { prisma } from "../plugins/db";
import { UserInput } from "../schemas/user.schema";
import bcrypt from "bcrypt";

export const UserService = {
  async create(data: UserInput) {
    const hashed = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: { ...data, password: hashed },
    });
  },

  async findAll() {
    return prisma.user.findMany();
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  async update(id: number, data: Partial<UserInput>) {
    return prisma.user.update({ where: { id }, data });
  },

  async remove(id: number) {
    return prisma.user.delete({ where: { id } });
  },
};
