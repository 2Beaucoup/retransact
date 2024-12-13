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

        createMany: procedure.input($Schema.AgentProfileInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agentProfile.createMany(input as any))),

        create: procedure.input($Schema.AgentProfileInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agentProfile.create(input as any))),

        deleteMany: procedure.input($Schema.AgentProfileInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agentProfile.deleteMany(input as any))),

        delete: procedure.input($Schema.AgentProfileInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agentProfile.delete(input as any))),

        findFirst: procedure.input($Schema.AgentProfileInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).agentProfile.findFirst(input as any))),

        findMany: procedure.input($Schema.AgentProfileInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).agentProfile.findMany(input as any))),

        findUnique: procedure.input($Schema.AgentProfileInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).agentProfile.findUnique(input as any))),

        updateMany: procedure.input($Schema.AgentProfileInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agentProfile.updateMany(input as any))),

        update: procedure.input($Schema.AgentProfileInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).agentProfile.update(input as any))),

        count: procedure.input($Schema.AgentProfileInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).agentProfile.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AgentProfileCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentProfileCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentProfileCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentProfileCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AgentProfileCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentProfileCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AgentProfileGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AgentProfileGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentProfileCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentProfileCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AgentProfileGetPayload<T>, Context>) => Promise<Prisma.AgentProfileGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AgentProfileDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentProfileDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentProfileDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentProfileDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AgentProfileDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentProfileDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AgentProfileGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AgentProfileGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentProfileDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentProfileDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AgentProfileGetPayload<T>, Context>) => Promise<Prisma.AgentProfileGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AgentProfileFindFirstArgs, TData = Prisma.AgentProfileGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.AgentProfileFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AgentProfileGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AgentProfileFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.AgentProfileFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AgentProfileGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AgentProfileGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AgentProfileFindManyArgs, TData = Array<Prisma.AgentProfileGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.AgentProfileFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AgentProfileGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AgentProfileFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.AgentProfileFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AgentProfileGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AgentProfileGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AgentProfileFindUniqueArgs, TData = Prisma.AgentProfileGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AgentProfileFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AgentProfileGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AgentProfileFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AgentProfileFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AgentProfileGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AgentProfileGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AgentProfileUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentProfileUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentProfileUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentProfileUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AgentProfileUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AgentProfileUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AgentProfileGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AgentProfileGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AgentProfileUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AgentProfileUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AgentProfileGetPayload<T>, Context>) => Promise<Prisma.AgentProfileGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.AgentProfileCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.AgentProfileCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.AgentProfileCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.AgentProfileCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.AgentProfileCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.AgentProfileCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.AgentProfileCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.AgentProfileCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
