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

        createMany: procedure.input($Schema.OfferTemplateInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).offerTemplate.createMany(input as any))),

        create: procedure.input($Schema.OfferTemplateInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).offerTemplate.create(input as any))),

        deleteMany: procedure.input($Schema.OfferTemplateInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).offerTemplate.deleteMany(input as any))),

        delete: procedure.input($Schema.OfferTemplateInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).offerTemplate.delete(input as any))),

        findFirst: procedure.input($Schema.OfferTemplateInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).offerTemplate.findFirst(input as any))),

        findMany: procedure.input($Schema.OfferTemplateInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).offerTemplate.findMany(input as any))),

        findUnique: procedure.input($Schema.OfferTemplateInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).offerTemplate.findUnique(input as any))),

        updateMany: procedure.input($Schema.OfferTemplateInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).offerTemplate.updateMany(input as any))),

        update: procedure.input($Schema.OfferTemplateInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).offerTemplate.update(input as any))),

        count: procedure.input($Schema.OfferTemplateInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).offerTemplate.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.OfferTemplateCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OfferTemplateCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OfferTemplateCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OfferTemplateCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.OfferTemplateCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OfferTemplateCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OfferTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OfferTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OfferTemplateCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OfferTemplateCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OfferTemplateGetPayload<T>, Context>) => Promise<Prisma.OfferTemplateGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.OfferTemplateDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OfferTemplateDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OfferTemplateDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OfferTemplateDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.OfferTemplateDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OfferTemplateDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OfferTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OfferTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OfferTemplateDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OfferTemplateDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OfferTemplateGetPayload<T>, Context>) => Promise<Prisma.OfferTemplateGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.OfferTemplateFindFirstArgs, TData = Prisma.OfferTemplateGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.OfferTemplateFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.OfferTemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OfferTemplateFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.OfferTemplateFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.OfferTemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.OfferTemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.OfferTemplateFindManyArgs, TData = Array<Prisma.OfferTemplateGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.OfferTemplateFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.OfferTemplateGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OfferTemplateFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.OfferTemplateFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.OfferTemplateGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.OfferTemplateGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.OfferTemplateFindUniqueArgs, TData = Prisma.OfferTemplateGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.OfferTemplateFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.OfferTemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OfferTemplateFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.OfferTemplateFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.OfferTemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.OfferTemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.OfferTemplateUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OfferTemplateUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OfferTemplateUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OfferTemplateUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.OfferTemplateUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OfferTemplateUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OfferTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OfferTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OfferTemplateUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OfferTemplateUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OfferTemplateGetPayload<T>, Context>) => Promise<Prisma.OfferTemplateGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.OfferTemplateCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.OfferTemplateCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.OfferTemplateCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.OfferTemplateCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.OfferTemplateCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.OfferTemplateCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.OfferTemplateCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.OfferTemplateCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
