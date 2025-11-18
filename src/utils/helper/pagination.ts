import { Prisma, PrismaClient } from '@prisma/client';

export interface PageResult<T> {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  items: T[];
}

export async function paginate<M extends keyof PrismaClient, R>(
  delegate: PrismaClient[M] & {
    count(args: {
      where?: Prisma.Enumerable<Prisma.JsonObject>;
    }): Promise<number>;
    findMany(args: {
      where?: Prisma.JsonObject;
      skip: number;
      take: number;
      orderBy?: Prisma.JsonObject;
    }): Promise<R[]>;
  },
  opts: {
    page: number;
    pageSize: number;
    where?: Prisma.JsonObject;
    orderBy?: Prisma.JsonObject;
  },
): Promise<PageResult<R>> {
  const { page, pageSize, where, orderBy } = opts;
  const skip = (page - 1) * pageSize;

  const [totalCount, raw] = await Promise.all([
    delegate.count({ where }),
    delegate.findMany({ where, skip, take: pageSize, orderBy }),
  ]);

  return {
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
    pageSize,
    items: raw,
  };
}
