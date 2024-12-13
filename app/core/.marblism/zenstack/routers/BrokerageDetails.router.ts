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

        createMany: procedure.input($Schema.BrokerageDetailsInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).brokerageDetails.createMany(input as any))),

        create: procedure.input($Schema.BrokerageDetailsInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).brokerageDetails.create(input as any))),

        deleteMany: procedure.input($Schema.BrokerageDetailsInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).brokerageDetails.deleteMany(input as any))),

        delete: procedure.input($Schema.BrokerageDetailsInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).brokerageDetails.delete(input as any))),

        findFirst: procedure.input($Schema.BrokerageDetailsInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).brokerageDetails.findFirst(input as any))),

        findMany: procedure.input($Schema.BrokerageDetailsInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).brokerageDetails.findMany(input as any))),

        findUnique: procedure.input($Schema.BrokerageDetailsInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).brokerageDetails.findUnique(input as any))),

        updateMany: procedure.input($Schema.BrokerageDetailsInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).brokerageDetails.updateMany(input as any))),

        update: procedure.input($Schema.BrokerageDetailsInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).brokerageDetails.update(input as any))),

        count: procedure.input($Schema.BrokerageDetailsInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).brokerageDetails.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.BrokerageDetailsCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BrokerageDetailsCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BrokerageDetailsCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BrokerageDetailsCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.BrokerageDetailsCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BrokerageDetailsCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BrokerageDetailsGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BrokerageDetailsGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BrokerageDetailsCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BrokerageDetailsCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BrokerageDetailsGetPayload<T>, Context>) => Promise<Prisma.BrokerageDetailsGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.BrokerageDetailsDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BrokerageDetailsDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BrokerageDetailsDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BrokerageDetailsDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.BrokerageDetailsDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BrokerageDetailsDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BrokerageDetailsGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BrokerageDetailsGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BrokerageDetailsDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BrokerageDetailsDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BrokerageDetailsGetPayload<T>, Context>) => Promise<Prisma.BrokerageDetailsGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.BrokerageDetailsFindFirstArgs, TData = Prisma.BrokerageDetailsGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.BrokerageDetailsFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BrokerageDetailsGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BrokerageDetailsFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.BrokerageDetailsFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BrokerageDetailsGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BrokerageDetailsGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.BrokerageDetailsFindManyArgs, TData = Array<Prisma.BrokerageDetailsGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.BrokerageDetailsFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.BrokerageDetailsGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BrokerageDetailsFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.BrokerageDetailsFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.BrokerageDetailsGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.BrokerageDetailsGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.BrokerageDetailsFindUniqueArgs, TData = Prisma.BrokerageDetailsGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.BrokerageDetailsFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BrokerageDetailsGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BrokerageDetailsFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.BrokerageDetailsFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BrokerageDetailsGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BrokerageDetailsGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.BrokerageDetailsUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BrokerageDetailsUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BrokerageDetailsUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BrokerageDetailsUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.BrokerageDetailsUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BrokerageDetailsUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BrokerageDetailsGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BrokerageDetailsGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BrokerageDetailsUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BrokerageDetailsUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BrokerageDetailsGetPayload<T>, Context>) => Promise<Prisma.BrokerageDetailsGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.BrokerageDetailsCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.BrokerageDetailsCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.BrokerageDetailsCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.BrokerageDetailsCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.BrokerageDetailsCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.BrokerageDetailsCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.BrokerageDetailsCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.BrokerageDetailsCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
