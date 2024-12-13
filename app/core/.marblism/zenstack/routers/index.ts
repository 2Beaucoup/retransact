/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createBrokerageDetailsRouter from "./BrokerageDetails.router";
import createAgentProfileRouter from "./AgentProfile.router";
import createBuyerPreferencesRouter from "./BuyerPreferences.router";
import createPropertyRecommendationRouter from "./PropertyRecommendation.router";
import createSavedSearchRouter from "./SavedSearch.router";
import createFavoriteListingRouter from "./FavoriteListing.router";
import createOfferTemplateRouter from "./OfferTemplate.router";
import createTransactionFeeRouter from "./TransactionFee.router";
import createUserRouter from "./User.router";
import createPropertyRouter from "./Property.router";
import createClientRouter from "./Client.router";
import createTransactionRouter from "./Transaction.router";
import createTransactionParticipantRouter from "./TransactionParticipant.router";
import createDocumentRouter from "./Document.router";
import createAppointmentRouter from "./Appointment.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import createAddressRouter from "./Address.router";
import createAnalyticsLocalMetricRouter from "./AnalyticsLocalMetric.router";
import { ClientType as BrokerageDetailsClientType } from "./BrokerageDetails.router";
import { ClientType as AgentProfileClientType } from "./AgentProfile.router";
import { ClientType as BuyerPreferencesClientType } from "./BuyerPreferences.router";
import { ClientType as PropertyRecommendationClientType } from "./PropertyRecommendation.router";
import { ClientType as SavedSearchClientType } from "./SavedSearch.router";
import { ClientType as FavoriteListingClientType } from "./FavoriteListing.router";
import { ClientType as OfferTemplateClientType } from "./OfferTemplate.router";
import { ClientType as TransactionFeeClientType } from "./TransactionFee.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as PropertyClientType } from "./Property.router";
import { ClientType as ClientClientType } from "./Client.router";
import { ClientType as TransactionClientType } from "./Transaction.router";
import { ClientType as TransactionParticipantClientType } from "./TransactionParticipant.router";
import { ClientType as DocumentClientType } from "./Document.router";
import { ClientType as AppointmentClientType } from "./Appointment.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";
import { ClientType as AddressClientType } from "./Address.router";
import { ClientType as AnalyticsLocalMetricClientType } from "./AnalyticsLocalMetric.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        brokerageDetails: createBrokerageDetailsRouter(router, procedure),
        agentProfile: createAgentProfileRouter(router, procedure),
        buyerPreferences: createBuyerPreferencesRouter(router, procedure),
        propertyRecommendation: createPropertyRecommendationRouter(router, procedure),
        savedSearch: createSavedSearchRouter(router, procedure),
        favoriteListing: createFavoriteListingRouter(router, procedure),
        offerTemplate: createOfferTemplateRouter(router, procedure),
        transactionFee: createTransactionFeeRouter(router, procedure),
        user: createUserRouter(router, procedure),
        property: createPropertyRouter(router, procedure),
        client: createClientRouter(router, procedure),
        transaction: createTransactionRouter(router, procedure),
        transactionParticipant: createTransactionParticipantRouter(router, procedure),
        document: createDocumentRouter(router, procedure),
        appointment: createAppointmentRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
        address: createAddressRouter(router, procedure),
        analyticsLocalMetric: createAnalyticsLocalMetricRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    brokerageDetails: BrokerageDetailsClientType<AppRouter>;
    agentProfile: AgentProfileClientType<AppRouter>;
    buyerPreferences: BuyerPreferencesClientType<AppRouter>;
    propertyRecommendation: PropertyRecommendationClientType<AppRouter>;
    savedSearch: SavedSearchClientType<AppRouter>;
    favoriteListing: FavoriteListingClientType<AppRouter>;
    offerTemplate: OfferTemplateClientType<AppRouter>;
    transactionFee: TransactionFeeClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    property: PropertyClientType<AppRouter>;
    client: ClientClientType<AppRouter>;
    transaction: TransactionClientType<AppRouter>;
    transactionParticipant: TransactionParticipantClientType<AppRouter>;
    document: DocumentClientType<AppRouter>;
    appointment: AppointmentClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
    address: AddressClientType<AppRouter>;
    analyticsLocalMetric: AnalyticsLocalMetricClientType<AppRouter>;
}
