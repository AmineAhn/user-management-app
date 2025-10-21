import { prisma } from "../plugins/db";
import bcrypt from "bcrypt";
import { CreateUserInput, UpdateUserInput } from "../schemas/user.schema";

export const UserService = {
  async createUser(data: CreateUserInput) {
    if (!data.password || data.password.trim() === "") {
      throw new Error("Password is required");
    }

    const hashed = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        ...data,
        password: hashed,
        birthDate: new Date(data.birthDate),
      },
    });
  },

  async getAllUsers() {
    return prisma.user.findMany({
      orderBy: { firstName: "asc" }, // default order
    });
  },

  async getUsers(params?: {
    search?: string;
    sortBy?: keyof typeof prisma.user.fields;
    order?: "asc" | "desc";
    page?: number;
    limit?: number;
  }) {
    const {
      search = "",
      sortBy = "firstName",
      order = "asc",
      page = 1,
      limit = 10,
    } = params || {};

    const lowered = search.toLowerCase();
    const where = search
      ? {
        OR: [
          { firstName: { contains: lowered } },
          { lastName: { contains: lowered } },
          { email: { contains: lowered } },
        ],
      }
    : {};

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async getUserById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  async updateUser(id: number, data: UpdateUserInput) {
    if (data.password && data.password.trim() !== "") {
      // if new password => hash it
      data.password = await bcrypt.hash(data.password, 10);
    } else {
       // if not, remove from body to avoid overwrite
      delete data.password;
    }

    // Convert birthDate to Date object if provided
    if (data.birthDate) {
      data.birthDate = new Date(data.birthDate);
    }

    return prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  },
};
