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

        createMany: procedure.input($Schema.PropertyRecommendationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).propertyRecommendation.createMany(input as any))),

        create: procedure.input($Schema.PropertyRecommendationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).propertyRecommendation.create(input as any))),

        deleteMany: procedure.input($Schema.PropertyRecommendationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).propertyRecommendation.deleteMany(input as any))),

        delete: procedure.input($Schema.PropertyRecommendationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).propertyRecommendation.delete(input as any))),

        findFirst: procedure.input($Schema.PropertyRecommendationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).propertyRecommendation.findFirst(input as any))),

        findMany: procedure.input($Schema.PropertyRecommendationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).propertyRecommendation.findMany(input as any))),

        findUnique: procedure.input($Schema.PropertyRecommendationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).propertyRecommendation.findUnique(input as any))),

        updateMany: procedure.input($Schema.PropertyRecommendationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).propertyRecommendation.updateMany(input as any))),

        update: procedure.input($Schema.PropertyRecommendationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).propertyRecommendation.update(input as any))),

        count: procedure.input($Schema.PropertyRecommendationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).propertyRecommendation.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PropertyRecommendationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyRecommendationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyRecommendationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyRecommendationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PropertyRecommendationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyRecommendationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PropertyRecommendationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PropertyRecommendationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyRecommendationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyRecommendationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PropertyRecommendationGetPayload<T>, Context>) => Promise<Prisma.PropertyRecommendationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PropertyRecommendationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyRecommendationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyRecommendationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyRecommendationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PropertyRecommendationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyRecommendationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PropertyRecommendationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PropertyRecommendationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyRecommendationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyRecommendationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PropertyRecommendationGetPayload<T>, Context>) => Promise<Prisma.PropertyRecommendationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PropertyRecommendationFindFirstArgs, TData = Prisma.PropertyRecommendationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PropertyRecommendationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PropertyRecommendationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PropertyRecommendationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PropertyRecommendationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PropertyRecommendationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PropertyRecommendationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PropertyRecommendationFindManyArgs, TData = Array<Prisma.PropertyRecommendationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PropertyRecommendationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PropertyRecommendationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PropertyRecommendationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PropertyRecommendationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PropertyRecommendationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PropertyRecommendationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PropertyRecommendationFindUniqueArgs, TData = Prisma.PropertyRecommendationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PropertyRecommendationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PropertyRecommendationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PropertyRecommendationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PropertyRecommendationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PropertyRecommendationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PropertyRecommendationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PropertyRecommendationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyRecommendationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyRecommendationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyRecommendationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PropertyRecommendationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PropertyRecommendationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PropertyRecommendationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PropertyRecommendationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PropertyRecommendationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PropertyRecommendationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PropertyRecommendationGetPayload<T>, Context>) => Promise<Prisma.PropertyRecommendationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PropertyRecommendationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PropertyRecommendationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PropertyRecommendationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PropertyRecommendationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PropertyRecommendationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PropertyRecommendationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PropertyRecommendationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PropertyRecommendationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
