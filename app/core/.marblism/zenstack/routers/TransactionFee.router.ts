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

        createMany: procedure.input($Schema.TransactionFeeInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionFee.createMany(input as any))),

        create: procedure.input($Schema.TransactionFeeInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionFee.create(input as any))),

        deleteMany: procedure.input($Schema.TransactionFeeInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionFee.deleteMany(input as any))),

        delete: procedure.input($Schema.TransactionFeeInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionFee.delete(input as any))),

        findFirst: procedure.input($Schema.TransactionFeeInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).transactionFee.findFirst(input as any))),

        findMany: procedure.input($Schema.TransactionFeeInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).transactionFee.findMany(input as any))),

        findUnique: procedure.input($Schema.TransactionFeeInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).transactionFee.findUnique(input as any))),

        updateMany: procedure.input($Schema.TransactionFeeInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionFee.updateMany(input as any))),

        update: procedure.input($Schema.TransactionFeeInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionFee.update(input as any))),

        count: procedure.input($Schema.TransactionFeeInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).transactionFee.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TransactionFeeCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionFeeCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionFeeCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionFeeCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TransactionFeeCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionFeeCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TransactionFeeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TransactionFeeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionFeeCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionFeeCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TransactionFeeGetPayload<T>, Context>) => Promise<Prisma.TransactionFeeGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TransactionFeeDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionFeeDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionFeeDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionFeeDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TransactionFeeDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionFeeDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TransactionFeeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TransactionFeeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionFeeDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionFeeDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TransactionFeeGetPayload<T>, Context>) => Promise<Prisma.TransactionFeeGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TransactionFeeFindFirstArgs, TData = Prisma.TransactionFeeGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TransactionFeeFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TransactionFeeGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TransactionFeeFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TransactionFeeFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TransactionFeeGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TransactionFeeGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TransactionFeeFindManyArgs, TData = Array<Prisma.TransactionFeeGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TransactionFeeFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TransactionFeeGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TransactionFeeFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TransactionFeeFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TransactionFeeGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TransactionFeeGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TransactionFeeFindUniqueArgs, TData = Prisma.TransactionFeeGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TransactionFeeFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TransactionFeeGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TransactionFeeFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TransactionFeeFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TransactionFeeGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TransactionFeeGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TransactionFeeUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionFeeUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionFeeUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionFeeUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TransactionFeeUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionFeeUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TransactionFeeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TransactionFeeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionFeeUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionFeeUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TransactionFeeGetPayload<T>, Context>) => Promise<Prisma.TransactionFeeGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TransactionFeeCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TransactionFeeCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TransactionFeeCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TransactionFeeCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TransactionFeeCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TransactionFeeCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TransactionFeeCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TransactionFeeCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
