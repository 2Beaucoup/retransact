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

        createMany: procedure.input($Schema.TransactionParticipantInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionParticipant.createMany(input as any))),

        create: procedure.input($Schema.TransactionParticipantInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionParticipant.create(input as any))),

        deleteMany: procedure.input($Schema.TransactionParticipantInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionParticipant.deleteMany(input as any))),

        delete: procedure.input($Schema.TransactionParticipantInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionParticipant.delete(input as any))),

        findFirst: procedure.input($Schema.TransactionParticipantInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).transactionParticipant.findFirst(input as any))),

        findMany: procedure.input($Schema.TransactionParticipantInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).transactionParticipant.findMany(input as any))),

        findUnique: procedure.input($Schema.TransactionParticipantInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).transactionParticipant.findUnique(input as any))),

        updateMany: procedure.input($Schema.TransactionParticipantInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionParticipant.updateMany(input as any))),

        update: procedure.input($Schema.TransactionParticipantInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transactionParticipant.update(input as any))),

        count: procedure.input($Schema.TransactionParticipantInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).transactionParticipant.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TransactionParticipantCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionParticipantCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionParticipantCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionParticipantCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TransactionParticipantCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionParticipantCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TransactionParticipantGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TransactionParticipantGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionParticipantCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionParticipantCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TransactionParticipantGetPayload<T>, Context>) => Promise<Prisma.TransactionParticipantGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TransactionParticipantDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionParticipantDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionParticipantDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionParticipantDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TransactionParticipantDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionParticipantDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TransactionParticipantGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TransactionParticipantGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionParticipantDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionParticipantDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TransactionParticipantGetPayload<T>, Context>) => Promise<Prisma.TransactionParticipantGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TransactionParticipantFindFirstArgs, TData = Prisma.TransactionParticipantGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TransactionParticipantFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TransactionParticipantGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TransactionParticipantFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TransactionParticipantFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TransactionParticipantGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TransactionParticipantGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TransactionParticipantFindManyArgs, TData = Array<Prisma.TransactionParticipantGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TransactionParticipantFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TransactionParticipantGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TransactionParticipantFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TransactionParticipantFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TransactionParticipantGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TransactionParticipantGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TransactionParticipantFindUniqueArgs, TData = Prisma.TransactionParticipantGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TransactionParticipantFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TransactionParticipantGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TransactionParticipantFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TransactionParticipantFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TransactionParticipantGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TransactionParticipantGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TransactionParticipantUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionParticipantUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionParticipantUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionParticipantUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TransactionParticipantUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TransactionParticipantUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TransactionParticipantGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TransactionParticipantGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TransactionParticipantUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TransactionParticipantUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TransactionParticipantGetPayload<T>, Context>) => Promise<Prisma.TransactionParticipantGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TransactionParticipantCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TransactionParticipantCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TransactionParticipantCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TransactionParticipantCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TransactionParticipantCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TransactionParticipantCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TransactionParticipantCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TransactionParticipantCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
