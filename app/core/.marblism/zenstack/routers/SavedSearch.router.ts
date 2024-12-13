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

        createMany: procedure.input($Schema.SavedSearchInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).savedSearch.createMany(input as any))),

        create: procedure.input($Schema.SavedSearchInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).savedSearch.create(input as any))),

        deleteMany: procedure.input($Schema.SavedSearchInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).savedSearch.deleteMany(input as any))),

        delete: procedure.input($Schema.SavedSearchInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).savedSearch.delete(input as any))),

        findFirst: procedure.input($Schema.SavedSearchInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).savedSearch.findFirst(input as any))),

        findMany: procedure.input($Schema.SavedSearchInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).savedSearch.findMany(input as any))),

        findUnique: procedure.input($Schema.SavedSearchInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).savedSearch.findUnique(input as any))),

        updateMany: procedure.input($Schema.SavedSearchInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).savedSearch.updateMany(input as any))),

        update: procedure.input($Schema.SavedSearchInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).savedSearch.update(input as any))),

        count: procedure.input($Schema.SavedSearchInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).savedSearch.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SavedSearchCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SavedSearchCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SavedSearchCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SavedSearchCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SavedSearchCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SavedSearchCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SavedSearchGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SavedSearchGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SavedSearchCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SavedSearchCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SavedSearchGetPayload<T>, Context>) => Promise<Prisma.SavedSearchGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SavedSearchDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SavedSearchDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SavedSearchDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SavedSearchDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SavedSearchDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SavedSearchDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SavedSearchGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SavedSearchGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SavedSearchDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SavedSearchDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SavedSearchGetPayload<T>, Context>) => Promise<Prisma.SavedSearchGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SavedSearchFindFirstArgs, TData = Prisma.SavedSearchGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.SavedSearchFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SavedSearchGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SavedSearchFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SavedSearchFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SavedSearchGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SavedSearchGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SavedSearchFindManyArgs, TData = Array<Prisma.SavedSearchGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.SavedSearchFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SavedSearchGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SavedSearchFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SavedSearchFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SavedSearchGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SavedSearchGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SavedSearchFindUniqueArgs, TData = Prisma.SavedSearchGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SavedSearchFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SavedSearchGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SavedSearchFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SavedSearchFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SavedSearchGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SavedSearchGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SavedSearchUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SavedSearchUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SavedSearchUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SavedSearchUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SavedSearchUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SavedSearchUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SavedSearchGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SavedSearchGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SavedSearchUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SavedSearchUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SavedSearchGetPayload<T>, Context>) => Promise<Prisma.SavedSearchGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.SavedSearchCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SavedSearchCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.SavedSearchCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.SavedSearchCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.SavedSearchCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.SavedSearchCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.SavedSearchCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SavedSearchCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
