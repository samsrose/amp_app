import { PrismaService } from "nestjs-prisma";
import { Prisma, Sport, Team } from "@prisma/client";

export class SportServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.SportFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SportFindManyArgs>
  ): Promise<Sport[]> {
    return this.prisma.sport.findMany(args);
  }
  async findOne<T extends Prisma.SportFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SportFindUniqueArgs>
  ): Promise<Sport | null> {
    return this.prisma.sport.findUnique(args);
  }
  async create<T extends Prisma.SportCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SportCreateArgs>
  ): Promise<Sport> {
    return this.prisma.sport.create<T>(args);
  }
  async update<T extends Prisma.SportUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SportUpdateArgs>
  ): Promise<Sport> {
    return this.prisma.sport.update<T>(args);
  }
  async delete<T extends Prisma.SportDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SportDeleteArgs>
  ): Promise<Sport> {
    return this.prisma.sport.delete(args);
  }

  async findTeams(
    parentId: string,
    args: Prisma.TeamFindManyArgs
  ): Promise<Team[]> {
    return this.prisma.sport
      .findUnique({
        where: { id: parentId },
      })
      .teams(args);
  }
}
