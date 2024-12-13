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

        createMany: procedure.input($Schema.BuyerPreferencesInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).buyerPreferences.createMany(input as any))),

        create: procedure.input($Schema.BuyerPreferencesInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).buyerPreferences.create(input as any))),

        deleteMany: procedure.input($Schema.BuyerPreferencesInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).buyerPreferences.deleteMany(input as any))),

        delete: procedure.input($Schema.BuyerPreferencesInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).buyerPreferences.delete(input as any))),

        findFirst: procedure.input($Schema.BuyerPreferencesInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).buyerPreferences.findFirst(input as any))),

        findMany: procedure.input($Schema.BuyerPreferencesInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).buyerPreferences.findMany(input as any))),

        findUnique: procedure.input($Schema.BuyerPreferencesInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).buyerPreferences.findUnique(input as any))),

        updateMany: procedure.input($Schema.BuyerPreferencesInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).buyerPreferences.updateMany(input as any))),

        update: procedure.input($Schema.BuyerPreferencesInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).buyerPreferences.update(input as any))),

        count: procedure.input($Schema.BuyerPreferencesInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).buyerPreferences.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.BuyerPreferencesCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BuyerPreferencesCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BuyerPreferencesCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BuyerPreferencesCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.BuyerPreferencesCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BuyerPreferencesCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BuyerPreferencesGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BuyerPreferencesGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BuyerPreferencesCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BuyerPreferencesCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BuyerPreferencesGetPayload<T>, Context>) => Promise<Prisma.BuyerPreferencesGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.BuyerPreferencesDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BuyerPreferencesDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BuyerPreferencesDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BuyerPreferencesDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.BuyerPreferencesDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BuyerPreferencesDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BuyerPreferencesGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BuyerPreferencesGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BuyerPreferencesDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BuyerPreferencesDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BuyerPreferencesGetPayload<T>, Context>) => Promise<Prisma.BuyerPreferencesGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.BuyerPreferencesFindFirstArgs, TData = Prisma.BuyerPreferencesGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.BuyerPreferencesFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BuyerPreferencesGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BuyerPreferencesFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.BuyerPreferencesFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BuyerPreferencesGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BuyerPreferencesGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.BuyerPreferencesFindManyArgs, TData = Array<Prisma.BuyerPreferencesGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.BuyerPreferencesFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.BuyerPreferencesGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BuyerPreferencesFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.BuyerPreferencesFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.BuyerPreferencesGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.BuyerPreferencesGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.BuyerPreferencesFindUniqueArgs, TData = Prisma.BuyerPreferencesGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.BuyerPreferencesFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BuyerPreferencesGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BuyerPreferencesFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.BuyerPreferencesFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BuyerPreferencesGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BuyerPreferencesGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.BuyerPreferencesUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BuyerPreferencesUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BuyerPreferencesUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BuyerPreferencesUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.BuyerPreferencesUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BuyerPreferencesUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BuyerPreferencesGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BuyerPreferencesGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BuyerPreferencesUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BuyerPreferencesUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BuyerPreferencesGetPayload<T>, Context>) => Promise<Prisma.BuyerPreferencesGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.BuyerPreferencesCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.BuyerPreferencesCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.BuyerPreferencesCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.BuyerPreferencesCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.BuyerPreferencesCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.BuyerPreferencesCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.BuyerPreferencesCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.BuyerPreferencesCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
