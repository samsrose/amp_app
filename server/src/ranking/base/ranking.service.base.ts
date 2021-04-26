import { PrismaService } from "nestjs-prisma";
import { Prisma, Ranking } from "@prisma/client";

export class RankingServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.RankingFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RankingFindManyArgs>
  ): Promise<Ranking[]> {
    return this.prisma.ranking.findMany(args);
  }
  async findOne<T extends Prisma.RankingFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RankingFindUniqueArgs>
  ): Promise<Ranking | null> {
    return this.prisma.ranking.findUnique(args);
  }
  async create<T extends Prisma.RankingCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RankingCreateArgs>
  ): Promise<Ranking> {
    return this.prisma.ranking.create<T>(args);
  }
  async update<T extends Prisma.RankingUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RankingUpdateArgs>
  ): Promise<Ranking> {
    return this.prisma.ranking.update<T>(args);
  }
  async delete<T extends Prisma.RankingDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RankingDeleteArgs>
  ): Promise<Ranking> {
    return this.prisma.ranking.delete(args);
  }
}
