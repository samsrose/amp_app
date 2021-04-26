import { PrismaService } from "nestjs-prisma";
import { Prisma, Win } from "@prisma/client";

export class WinServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.WinFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WinFindManyArgs>
  ): Promise<Win[]> {
    return this.prisma.win.findMany(args);
  }
  async findOne<T extends Prisma.WinFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.WinFindUniqueArgs>
  ): Promise<Win | null> {
    return this.prisma.win.findUnique(args);
  }
  async create<T extends Prisma.WinCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WinCreateArgs>
  ): Promise<Win> {
    return this.prisma.win.create<T>(args);
  }
  async update<T extends Prisma.WinUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WinUpdateArgs>
  ): Promise<Win> {
    return this.prisma.win.update<T>(args);
  }
  async delete<T extends Prisma.WinDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.WinDeleteArgs>
  ): Promise<Win> {
    return this.prisma.win.delete(args);
  }
}
