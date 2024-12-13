/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.PropertyInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).property.createMany(input as any))),

        create: procedure.input($Schema.PropertyInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).property.create(input as any))),

        deleteMany: procedure.input($Schema.PropertyInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).property.deleteMany(input as any))),

        delete: procedure.input($Schema.PropertyInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).property.delete(input as any))),

        findFirst: procedure.input($Schema.PropertyInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).property.findFirst(input as any))),

        findMany: procedure.input($Schema.PropertyInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).property.findMany(input as any))),

        findUnique: procedure.input($Schema.PropertyInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).property.findUnique(input as any))),

        updateMany: procedure.input($Schema.PropertyInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).property.updateMany(input as any))),

        update: procedure.input($Schema.PropertyInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).property.update(input as any))),

        count: procedure.input($Schema.PropertyInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).property.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PropertyCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PropertyCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PropertyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PropertyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PropertyGetPayload<T>, Context>) => Promise<Prisma.PropertyGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PropertyDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PropertyDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PropertyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PropertyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PropertyGetPayload<T>, Context>) => Promise<Prisma.PropertyGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PropertyFindFirstArgs, TData = Prisma.PropertyGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PropertyFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PropertyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PropertyFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PropertyFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PropertyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PropertyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PropertyFindManyArgs, TData = Array<Prisma.PropertyGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PropertyFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PropertyGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PropertyFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PropertyFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PropertyGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PropertyGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PropertyFindUniqueArgs, TData = Prisma.PropertyGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PropertyFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PropertyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PropertyFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PropertyFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PropertyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PropertyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PropertyUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PropertyUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PropertyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PropertyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PropertyGetPayload<T>, Context>) => Promise<Prisma.PropertyGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PropertyCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PropertyCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PropertyCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PropertyCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PropertyCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PropertyCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PropertyCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PropertyCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
