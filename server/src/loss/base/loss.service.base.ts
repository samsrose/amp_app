import { PrismaService } from "nestjs-prisma";
import { Prisma, Loss } from "@prisma/client";

export class LossServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.LossFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.LossFindManyArgs>
  ): Promise<Loss[]> {
    return this.prisma.loss.findMany(args);
  }
  async findOne<T extends Prisma.LossFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.LossFindUniqueArgs>
  ): Promise<Loss | null> {
    return this.prisma.loss.findUnique(args);
  }
  async create<T extends Prisma.LossCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LossCreateArgs>
  ): Promise<Loss> {
    return this.prisma.loss.create<T>(args);
  }
  async update<T extends Prisma.LossUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LossUpdateArgs>
  ): Promise<Loss> {
    return this.prisma.loss.update<T>(args);
  }
  async delete<T extends Prisma.LossDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.LossDeleteArgs>
  ): Promise<Loss> {
    return this.prisma.loss.delete(args);
  }
}
