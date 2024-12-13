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

        createMany: procedure.input($Schema.FavoriteListingInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).favoriteListing.createMany(input as any))),

        create: procedure.input($Schema.FavoriteListingInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).favoriteListing.create(input as any))),

        deleteMany: procedure.input($Schema.FavoriteListingInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).favoriteListing.deleteMany(input as any))),

        delete: procedure.input($Schema.FavoriteListingInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).favoriteListing.delete(input as any))),

        findFirst: procedure.input($Schema.FavoriteListingInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).favoriteListing.findFirst(input as any))),

        findMany: procedure.input($Schema.FavoriteListingInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).favoriteListing.findMany(input as any))),

        findUnique: procedure.input($Schema.FavoriteListingInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).favoriteListing.findUnique(input as any))),

        updateMany: procedure.input($Schema.FavoriteListingInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).favoriteListing.updateMany(input as any))),

        update: procedure.input($Schema.FavoriteListingInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).favoriteListing.update(input as any))),

        count: procedure.input($Schema.FavoriteListingInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).favoriteListing.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.FavoriteListingCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FavoriteListingCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FavoriteListingCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FavoriteListingCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.FavoriteListingCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FavoriteListingCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FavoriteListingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FavoriteListingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FavoriteListingCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FavoriteListingCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FavoriteListingGetPayload<T>, Context>) => Promise<Prisma.FavoriteListingGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.FavoriteListingDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FavoriteListingDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FavoriteListingDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FavoriteListingDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.FavoriteListingDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FavoriteListingDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FavoriteListingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FavoriteListingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FavoriteListingDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FavoriteListingDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FavoriteListingGetPayload<T>, Context>) => Promise<Prisma.FavoriteListingGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.FavoriteListingFindFirstArgs, TData = Prisma.FavoriteListingGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.FavoriteListingFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FavoriteListingGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FavoriteListingFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FavoriteListingFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FavoriteListingGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FavoriteListingGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.FavoriteListingFindManyArgs, TData = Array<Prisma.FavoriteListingGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.FavoriteListingFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.FavoriteListingGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FavoriteListingFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FavoriteListingFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.FavoriteListingGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.FavoriteListingGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.FavoriteListingFindUniqueArgs, TData = Prisma.FavoriteListingGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.FavoriteListingFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FavoriteListingGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FavoriteListingFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FavoriteListingFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FavoriteListingGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FavoriteListingGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.FavoriteListingUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FavoriteListingUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FavoriteListingUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FavoriteListingUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.FavoriteListingUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FavoriteListingUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FavoriteListingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FavoriteListingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FavoriteListingUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FavoriteListingUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FavoriteListingGetPayload<T>, Context>) => Promise<Prisma.FavoriteListingGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.FavoriteListingCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FavoriteListingCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.FavoriteListingCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.FavoriteListingCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.FavoriteListingCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.FavoriteListingCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.FavoriteListingCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FavoriteListingCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
