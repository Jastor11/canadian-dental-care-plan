import type { HealthCheck } from '@dts-stn/health-checks';
import type { Newable } from 'inversify';

import type { BearerTokenResolver, TokenRolesExtractor } from '~/.server/auth';
import type { RaoidcService } from '~/.server/auth/raoidc.service';
import type { ClientConfig, ServerConfig } from '~/.server/configs';
import type { BuildInfoService } from '~/.server/core';
import type { RedisService } from '~/.server/data';
import type {
  AddressValidationDtoMapper,
  ApplicantDtoMapper,
  ApplicationStatusDtoMapper,
  ApplicationYearDtoMapper,
  BenefitApplicationDtoMapper,
  BenefitRenewalDtoMapper,
  ClientApplicationDtoMapper,
  ClientFriendlyStatusDtoMapper,
  CountryDtoMapper,
  DemographicSurveyDtoMapper,
  FederalGovernmentInsurancePlanDtoMapper,
  LetterDtoMapper,
  LetterTypeDtoMapper,
  MaritalStatusDtoMapper,
  PreferredCommunicationMethodDtoMapper,
  ProvinceTerritoryStateDtoMapper,
  ProvincialGovernmentInsurancePlanDtoMapper,
  VerificationCodeDtoMapper,
} from '~/.server/domain/mappers';
import type {
  AddressValidationRepository,
  ApplicantRepository,
  ApplicationStatusRepository,
  ApplicationYearRepository,
  BenefitApplicationRepository,
  BenefitRenewalRepository,
  ClientApplicationRepository,
  ClientFriendlyStatusRepository,
  CountryRepository,
  DemographicSurveyRepository,
  GovernmentInsurancePlanRepository,
  LetterRepository,
  LetterTypeRepository,
  MaritalStatusRepository,
  PreferredCommunicationMethodRepository,
  ProvinceTerritoryStateRepository,
  VerificationCodeRepository,
} from '~/.server/domain/repositories';
import type {
  AddressValidationService,
  ApplicantService,
  ApplicationStatusService,
  ApplicationYearService,
  AuditService,
  BenefitApplicationService,
  BenefitRenewalService,
  ClientApplicationService,
  ClientFriendlyStatusService,
  CountryService,
  DemographicSurveyService,
  FederalGovernmentInsurancePlanService,
  LetterService,
  LetterTypeService,
  MaritalStatusService,
  PreferredCommunicationMethodService,
  ProvinceTerritoryStateService,
  ProvincialGovernmentInsurancePlanService,
  VerificationCodeService,
} from '~/.server/domain/services';
import type { HttpClient } from '~/.server/http';
import type { InstrumentationService } from '~/.server/observability';
import type { BenefitApplicationStateMapper, BenefitRenewalStateMapper } from '~/.server/routes/mappers';
import type { SecurityHandler } from '~/.server/routes/security';
import type { AddressValidatorFactory, HomeAddressValidatorFactory, MailingAddressValidatorFactory } from '~/.server/routes/validators';
import { assignServiceIdentifiers, serviceIdentifier as serviceId } from '~/.server/utils/service-identifier.utils';
import type { HCaptchaDtoMapper } from '~/.server/web/mappers';
import type { DynatraceDtoMapper } from '~/.server/web/mappers/dynatrace.dto.mapper';
import type { DynatraceRepository, HCaptchaRepository } from '~/.server/web/repositories';
import type { DynatraceService, HCaptchaService } from '~/.server/web/services';
import type { CsrfTokenValidator, HCaptchaValidator, RaoidcSessionValidator } from '~/.server/web/validators';

/**
 * Represents a service identifier for dependency injection purposes.
 * The identifier restricts the use of `string` and `symbol` types, allowing only specific types
 * from `ServiceIdentifier` to be used for registering and resolving dependencies.
 *
 * @template T - The type associated with the service identifier.
 * @example
 * ```typescript
 * const identifier: ServiceIdentifier<ExampleService> = serviceIdentifier('ExampleService');
 * ```
 */
export type ServiceIdentifier<TInstance = unknown> = Newable<TInstance>;

/**
 * Recursive type defining the structure of the service identifier registry.
 * Allows nesting of `Types` objects to create hierarchical structures.
 *
 * @template T - Type associated with each key in the registry.
 * @example
 * ```typescript
 * const exampleRegistry: Types = {
 *   ExampleService: serviceId<ExampleService>(),
 *   nested: {
 *     NestedService: serviceId<NestedService>()
 *   }
 * };
 * ```
 */
export type TypesContant<T = unknown> = Readonly<{
  // The index signature ensures that the registry can hold a string key with either a
  // service identifier or another nested `Types` object.
  [key: string]: ServiceIdentifier<T> | TypesContant<T>;
}>;

/**
 * Contains service identifiers for dependency injection, structured by categories for easier organization.
 * This constant provides unique identifiers for each service, repository, and mapper used in the application.
 *
 * @example
 * ```typescript
 * const addressValidationService = container.get(TYPES.AddressValidationService);
 * const applicantDtoMapper = container.get(TYPES.ApplicantDtoMapper);
 * ```
 */
export const TYPES = assignServiceIdentifiers({
  auth: {
    BearerTokenResolver: serviceId<BearerTokenResolver>(),
    HealthTokenRolesExtractor: serviceId<TokenRolesExtractor>('HealthTokenRolesExtractor'),
    RaoidcService: serviceId<RaoidcService>('RaoidcService'),
  },
  configs: {
    ClientConfig: serviceId<ClientConfig>(),
    ServerConfig: serviceId<ServerConfig>(),
  },
  core: {
    BuildInfoService: serviceId<BuildInfoService>(),
  },
  data: {
    services: {
      RedisService: serviceId<RedisService>(),
    },
  },
  domain: {
    mappers: {
      AddressValidationDtoMapper: serviceId<AddressValidationDtoMapper>(),
      ApplicantDtoMapper: serviceId<ApplicantDtoMapper>(),
      ApplicationStatusDtoMapper: serviceId<ApplicationStatusDtoMapper>(),
      BenefitApplicationDtoMapper: serviceId<BenefitApplicationDtoMapper>(),
      ApplicationYearDtoMapper: serviceId<ApplicationYearDtoMapper>(),
      BenefitRenewalDtoMapper: serviceId<BenefitRenewalDtoMapper>(),
      ClientApplicationDtoMapper: serviceId<ClientApplicationDtoMapper>(),
      ClientFriendlyStatusDtoMapper: serviceId<ClientFriendlyStatusDtoMapper>(),
      CountryDtoMapper: serviceId<CountryDtoMapper>(),
      DemographicSurveyDtoMapper: serviceId<DemographicSurveyDtoMapper>(),
      FederalGovernmentInsurancePlanDtoMapper: serviceId<FederalGovernmentInsurancePlanDtoMapper>(),
      LetterDtoMapper: serviceId<LetterDtoMapper>(),
      LetterTypeDtoMapper: serviceId<LetterTypeDtoMapper>(),
      MaritalStatusDtoMapper: serviceId<MaritalStatusDtoMapper>(),
      PreferredCommunicationMethodDtoMapper: serviceId<PreferredCommunicationMethodDtoMapper>(),
      ProvinceTerritoryStateDtoMapper: serviceId<ProvinceTerritoryStateDtoMapper>(),
      ProvincialGovernmentInsurancePlanDtoMapper: serviceId<ProvincialGovernmentInsurancePlanDtoMapper>(),
      VerificationCodeDtoMapper: serviceId<VerificationCodeDtoMapper>(),
    },
    repositories: {
      AddressValidationRepository: serviceId<AddressValidationRepository>(),
      ApplicantRepository: serviceId<ApplicantRepository>(),
      ApplicationStatusRepository: serviceId<ApplicationStatusRepository>(),
      BenefitApplicationRepository: serviceId<BenefitApplicationRepository>(),
      ApplicationYearRepository: serviceId<ApplicationYearRepository>(),
      BenefitRenewalRepository: serviceId<BenefitRenewalRepository>(),
      ClientApplicationRepository: serviceId<ClientApplicationRepository>(),
      ClientFriendlyStatusRepository: serviceId<ClientFriendlyStatusRepository>(),
      CountryRepository: serviceId<CountryRepository>(),
      DemographicSurveyRepository: serviceId<DemographicSurveyRepository>(),
      GovernmentInsurancePlanRepository: serviceId<GovernmentInsurancePlanRepository>(),
      LetterRepository: serviceId<LetterRepository>(),
      LetterTypeRepository: serviceId<LetterTypeRepository>(),
      MaritalStatusRepository: serviceId<MaritalStatusRepository>(),
      PreferredCommunicationMethodRepository: serviceId<PreferredCommunicationMethodRepository>(),
      ProvinceTerritoryStateRepository: serviceId<ProvinceTerritoryStateRepository>(),
      VerificationCodeRepository: serviceId<VerificationCodeRepository>(),
    },
    services: {
      AddressValidationService: serviceId<AddressValidationService>(),
      ApplicantService: serviceId<ApplicantService>(),
      ApplicationStatusService: serviceId<ApplicationStatusService>(),
      ApplicationYearService: serviceId<ApplicationYearService>(),
      AuditService: serviceId<AuditService>(),
      BenefitApplicationService: serviceId<BenefitApplicationService>(),
      BenefitRenewalService: serviceId<BenefitRenewalService>(),
      ClientApplicationService: serviceId<ClientApplicationService>(),
      ClientFriendlyStatusService: serviceId<ClientFriendlyStatusService>(),
      CountryService: serviceId<CountryService>(),
      DemographicSurveyService: serviceId<DemographicSurveyService>(),
      FederalGovernmentInsurancePlanService: serviceId<FederalGovernmentInsurancePlanService>(),
      LetterService: serviceId<LetterService>(),
      LetterTypeService: serviceId<LetterTypeService>(),
      MaritalStatusService: serviceId<MaritalStatusService>(),
      PreferredCommunicationMethodService: serviceId<PreferredCommunicationMethodService>(),
      ProvinceTerritoryStateService: serviceId<ProvinceTerritoryStateService>(),
      ProvincialGovernmentInsurancePlanService: serviceId<ProvincialGovernmentInsurancePlanService>(),
      VerificationCodeService: serviceId<VerificationCodeService>(),
    },
  },
  health: {
    HealthCheck: serviceId<HealthCheck>(),
  },
  http: {
    HttpClient: serviceId<HttpClient>(),
  },
  observability: {
    InstrumentationService: serviceId<InstrumentationService>(),
  },
  routes: {
    mappers: {
      BenefitApplicationStateMapper: serviceId<BenefitApplicationStateMapper>(),
      BenefitRenewalStateMapper: serviceId<BenefitRenewalStateMapper>(),
    },
    security: {
      SecurityHandler: serviceId<SecurityHandler>(),
    },
    validators: {
      AddressValidatorFactory: serviceId<AddressValidatorFactory>(),
      MailingAddressValidatorFactory: serviceId<MailingAddressValidatorFactory>(),
      HomeAddressValidatorFactory: serviceId<HomeAddressValidatorFactory>(),
    },
  },
  web: {
    repositories: {
      DynatraceRepository: serviceId<DynatraceRepository>(),
      HCaptchaRepository: serviceId<HCaptchaRepository>(),
    },
    mappers: {
      DynatraceDtoMapper: serviceId<DynatraceDtoMapper>(),
      HCaptchaDtoMapper: serviceId<HCaptchaDtoMapper>(),
    },
    services: {
      DynatraceService: serviceId<DynatraceService>(),
      HCaptchaService: serviceId<HCaptchaService>(),
    },
    validators: {
      CsrfTokenValidator: serviceId<CsrfTokenValidator>(),
      HCaptchaValidator: serviceId<HCaptchaValidator>(),
      RaoidcSessionValidator: serviceId<RaoidcSessionValidator>(),
    },
  },
} as const satisfies TypesContant);

export default { TYPES };
