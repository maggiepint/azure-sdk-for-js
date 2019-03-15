/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import { BaseResource, CloudError, AzureServiceClientOptions } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";

export { BaseResource, CloudError };


/**
 * Contains the possible cases for ImageTemplateSource.
 */
export type ImageTemplateSourceUnion = ImageTemplateSource | ImageTemplateIsoSource | ImageTemplatePlatformImageSource;

/**
 * @interface
 * An interface representing ImageTemplateSource.
 */
export interface ImageTemplateSource {
  /**
   * @member {string} type Polymorphic Discriminator
   */
  type: "ImageTemplateSource";
}

/**
 * Contains the possible cases for ImageTemplateCustomizer.
 */
export type ImageTemplateCustomizerUnion = ImageTemplateCustomizer | ImageTemplateShellCustomizer;

/**
 * @interface
 * An interface representing ImageTemplateCustomizer.
 */
export interface ImageTemplateCustomizer {
  /**
   * @member {string} type Polymorphic Discriminator
   */
  type: "ImageTemplateCustomizer";
  /**
   * @member {string} [name] Friendly Name to provide context on what this
   * customization step does
   */
  name?: string;
}

/**
 * Contains the possible cases for ImageTemplateDistributor.
 */
export type ImageTemplateDistributorUnion = ImageTemplateDistributor | ImageTemplateManagedImageDistributor | ImageTemplateSharedImageDistributor;

/**
 * @interface
 * An interface representing ImageTemplateDistributor.
 * Generic distribution object
 *
 */
export interface ImageTemplateDistributor {
  /**
   * @member {string} type Polymorphic Discriminator
   */
  type: "ImageTemplateDistributor";
  /**
   * @member {string} runOutputName The name to be used for the associated
   * RunOutput.
   */
  runOutputName: string;
  /**
   * @member {{ [propertyName: string]: string }} [artifactTags] Tags that will
   * be applied to the artifact once it has been created/updated by the
   * distributor.
   */
  artifactTags?: { [propertyName: string]: string };
}

/**
 * @interface
 * An interface representing ProvisioningError.
 */
export interface ProvisioningError {
  /**
   * @member {ProvisioningErrorCode} [provisioningErrorCode] Error code of the
   * provisioning failure. Possible values include: 'BadSourceType',
   * 'BadPIRSource', 'BadISOSource', 'BadCustomizerType',
   * 'NoCustomizerShellScript', 'ServerError', 'Other'
   */
  provisioningErrorCode?: ProvisioningErrorCode;
  /**
   * @member {string} [message] Verbose error message about the provisioning
   * failure
   */
  message?: string;
}

/**
 * @interface
 * An interface representing ImageTemplateLastRunStatus.
 */
export interface ImageTemplateLastRunStatus {
  /**
   * @member {Date} [startTime] Start time of the last run (UTC)
   */
  startTime?: Date;
  /**
   * @member {Date} [endTime] End time of the last run (UTC)
   */
  endTime?: Date;
  /**
   * @member {RunState} [runState] State of the last run. Possible values
   * include: 'ready', 'running', 'succeeded', 'partiallySucceeded', 'failed'
   */
  runState?: RunState;
  /**
   * @member {RunSubState} [runSubState] Sub state of the last run. Possible
   * values include: 'queued', 'building', 'customizing', 'distributing'
   */
  runSubState?: RunSubState;
  /**
   * @member {string} [message] Verbose information about the last run state
   */
  message?: string;
}

/**
 * @interface
 * An interface representing Resource.
 * The Resource model definition.
 *
 * @extends BaseResource
 */
export interface Resource extends BaseResource {
  /**
   * @member {string} [id] Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly id?: string;
  /**
   * @member {string} [name] Resource name
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly name?: string;
  /**
   * @member {string} [type] Resource type
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly type?: string;
  /**
   * @member {string} location Resource location
   */
  location: string;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Resource tags
   */
  tags?: { [propertyName: string]: string };
}

/**
 * @interface
 * An interface representing ImageTemplate.
 * @extends Resource
 */
export interface ImageTemplate extends Resource {
  /**
   * @member {ImageTemplateSourceUnion} source Specifies the properties used to
   * describe the source image.
   */
  source: ImageTemplateSourceUnion;
  /**
   * @member {ImageTemplateCustomizerUnion[]} [customize] Specifies the
   * properties used to describe the customization steps of the image, like
   * Image source etc
   */
  customize?: ImageTemplateCustomizerUnion[];
  /**
   * @member {ImageTemplateDistributorUnion[]} distribute The distribution
   * targets where the image output needs to go to.
   */
  distribute: ImageTemplateDistributorUnion[];
  /**
   * @member {ProvisioningState} [provisioningState] Provisioning state of the
   * resource. Possible values include: 'Creating', 'Succeeded', 'Failed',
   * 'Deleting'
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly provisioningState?: ProvisioningState;
  /**
   * @member {ProvisioningError} [provisioningError] Provisioning error, if any
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly provisioningError?: ProvisioningError;
  /**
   * @member {ImageTemplateLastRunStatus} [lastRunStatus] State of 'run' that
   * is currently executing or was last executed.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly lastRunStatus?: ImageTemplateLastRunStatus;
}

/**
 * @interface
 * An interface representing ImageTemplateIsoSource.
 * Describes an image source that is an installation ISO. Currently only
 * supports Red Hat Enterprise Linux 7.2-7.5 ISO's.
 *
 */
export interface ImageTemplateIsoSource {
  /**
   * @member {string} type Polymorphic Discriminator
   */
  type: "ISO";
  /**
   * @member {string} sourceURI URL to get the ISO image. This URL has to be
   * accessible to the resource provider at the time of the imageTemplate
   * creation.
   */
  sourceURI: string;
  /**
   * @member {string} sha256Checksum SHA256 Checksum of the ISO image.
   */
  sha256Checksum: string;
}

/**
 * @interface
 * An interface representing ImageTemplatePlatformImageSource.
 * Describes an image source from [Azure Gallery
 * Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages).
 *
 */
export interface ImageTemplatePlatformImageSource {
  /**
   * @member {string} type Polymorphic Discriminator
   */
  type: "PlatformImage";
  /**
   * @member {string} [publisher] Image Publisher in [Azure Gallery
   * Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages).
   */
  publisher?: string;
  /**
   * @member {string} [offer] Image offer from the [Azure Gallery
   * Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages).
   */
  offer?: string;
  /**
   * @member {string} [sku] Image sku from the [Azure Gallery
   * Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages).
   */
  sku?: string;
  /**
   * @member {string} [version] Image version from the [Azure Gallery
   * Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages).
   */
  version?: string;
}

/**
 * @interface
 * An interface representing ImageTemplateShellCustomizer.
 * Runs a shell script during the customization phase
 *
 */
export interface ImageTemplateShellCustomizer {
  /**
   * @member {string} type Polymorphic Discriminator
   */
  type: "shell";
  /**
   * @member {string} [name] Friendly Name to provide context on what this
   * customization step does
   */
  name?: string;
  /**
   * @member {string} [script] The shell script to be run for customizing. It
   * can be a github link, SAS URI for Azure Storage, etc
   */
  script?: string;
}

/**
 * @interface
 * An interface representing ImageTemplateManagedImageDistributor.
 * Distribute as a Managed Disk Image.
 *
 */
export interface ImageTemplateManagedImageDistributor {
  /**
   * @member {string} type Polymorphic Discriminator
   */
  type: "managedImage";
  /**
   * @member {string} runOutputName The name to be used for the associated
   * RunOutput.
   */
  runOutputName: string;
  /**
   * @member {{ [propertyName: string]: string }} [artifactTags] Tags that will
   * be applied to the artifact once it has been created/updated by the
   * distributor.
   */
  artifactTags?: { [propertyName: string]: string };
  /**
   * @member {string} imageId Resource Id of the Managed Disk Image
   */
  imageId: string;
  /**
   * @member {string} location Azure location for the image, should match if
   * image already exists
   */
  location: string;
}

/**
 * @interface
 * An interface representing ImageTemplateSharedImageDistributor.
 * Distribute via Shared Image Gallery.
 *
 */
export interface ImageTemplateSharedImageDistributor {
  /**
   * @member {string} type Polymorphic Discriminator
   */
  type: "sharedImage";
  /**
   * @member {string} runOutputName The name to be used for the associated
   * RunOutput.
   */
  runOutputName: string;
  /**
   * @member {{ [propertyName: string]: string }} [artifactTags] Tags that will
   * be applied to the artifact once it has been created/updated by the
   * distributor.
   */
  artifactTags?: { [propertyName: string]: string };
  /**
   * @member {string} galleryImageId Resource Id of the Shared Image Gallery
   * image
   */
  galleryImageId: string;
  /**
   * @member {string[]} replicationRegions
   */
  replicationRegions: string[];
}

/**
 * @interface
 * An interface representing ImageTemplateUpdateParameters.
 * Parameters for updating an image template.
 *
 */
export interface ImageTemplateUpdateParameters {
  /**
   * @member {{ [propertyName: string]: string }} [tags] The user-specified
   * tags associated with the image template.
   */
  tags?: { [propertyName: string]: string };
}

/**
 * @interface
 * An interface representing SubResource.
 * The Sub Resource model definition.
 *
 */
export interface SubResource {
  /**
   * @member {string} [id] Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly id?: string;
  /**
   * @member {string} name Resource name
   */
  name: string;
  /**
   * @member {string} [type] Resource type
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly type?: string;
}

/**
 * @interface
 * An interface representing RunOutput.
 * Represents an output that was created by running an image template.
 *
 * @extends SubResource
 */
export interface RunOutput extends SubResource {
  /**
   * @member {string} [artifactId] The resource id of the artifact.
   */
  artifactId?: string;
  /**
   * @member {ProvisioningState1} [provisioningState] Provisioning state of the
   * resource. Possible values include: 'Creating', 'Succeeded', 'Failed',
   * 'Deleting'
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly provisioningState?: ProvisioningState1;
}

/**
 * @interface
 * An interface representing OperationDisplay.
 * @summary The object that describes the operation.
 *
 */
export interface OperationDisplay {
  /**
   * @member {string} [provider] Friendly name of the resource provider.
   */
  provider?: string;
  /**
   * @member {string} [operation] The operation type. For example: read, write,
   * delete, or listKeys/action
   */
  operation?: string;
  /**
   * @member {string} [resource] The resource type on which the operation is
   * performed.
   */
  resource?: string;
  /**
   * @member {string} [description] The friendly name of the operation.
   */
  description?: string;
}

/**
 * @interface
 * An interface representing Operation.
 * @summary A REST API operation
 *
 */
export interface Operation {
  /**
   * @member {string} [name] The operation name. This is of the format
   * {provider}/{resource}/{operation}
   */
  name?: string;
  /**
   * @member {OperationDisplay} [display] The object that describes the
   * operation.
   */
  display?: OperationDisplay;
  /**
   * @member {string} [origin] The intended executor of the operation.
   */
  origin?: string;
  /**
   * @member {any} [properties] Properties of the operation.
   */
  properties?: any;
}

/**
 * @interface
 * An interface representing ApiErrorBase.
 * Api error base.
 *
 */
export interface ApiErrorBase {
  /**
   * @member {string} [code] The error code.
   */
  code?: string;
  /**
   * @member {string} [target] The target of the particular error.
   */
  target?: string;
  /**
   * @member {string} [message] The error message.
   */
  message?: string;
}

/**
 * @interface
 * An interface representing InnerError.
 * Inner error details.
 *
 */
export interface InnerError {
  /**
   * @member {string} [exceptiontype] The exception type.
   */
  exceptiontype?: string;
  /**
   * @member {string} [errordetail] The internal error message or exception
   * dump.
   */
  errordetail?: string;
}

/**
 * @interface
 * An interface representing ApiError.
 * Api error.
 *
 */
export interface ApiError {
  /**
   * @member {ApiErrorBase[]} [details] The Api error details
   */
  details?: ApiErrorBase[];
  /**
   * @member {InnerError} [innererror] The Api inner error
   */
  innererror?: InnerError;
  /**
   * @member {string} [code] The error code.
   */
  code?: string;
  /**
   * @member {string} [target] The target of the particular error.
   */
  target?: string;
  /**
   * @member {string} [message] The error message.
   */
  message?: string;
}

/**
 * @interface
 * An interface representing ImageBuilderClientOptions.
 * @extends AzureServiceClientOptions
 */
export interface ImageBuilderClientOptions extends AzureServiceClientOptions {
  /**
   * @member {string} [baseUri]
   */
  baseUri?: string;
}


/**
 * @interface
 * An interface representing the ImageTemplateListResult.
 * @extends Array<ImageTemplate>
 */
export interface ImageTemplateListResult extends Array<ImageTemplate> {
  /**
   * @member {string} [nextLink] The continuation token.
   */
  nextLink?: string;
}

/**
 * @interface
 * An interface representing the RunOutputCollection.
 * @extends Array<RunOutput>
 */
export interface RunOutputCollection extends Array<RunOutput> {
  /**
   * @member {string} [nextLink] The continuation token.
   */
  nextLink?: string;
}

/**
 * @interface
 * An interface representing the OperationListResult.
 * @summary Result of the request to list REST API operations. It contains a
 * list of operations and a URL nextLink to get the next set of results.
 *
 * @extends Array<Operation>
 */
export interface OperationListResult extends Array<Operation> {
  /**
   * @member {string} [nextLink]
   */
  nextLink?: string;
}

/**
 * Defines values for ProvisioningErrorCode.
 * Possible values include: 'BadSourceType', 'BadPIRSource', 'BadISOSource', 'BadCustomizerType',
 * 'NoCustomizerShellScript', 'ServerError', 'Other'
 * @readonly
 * @enum {string}
 */
export type ProvisioningErrorCode = 'BadSourceType' | 'BadPIRSource' | 'BadISOSource' | 'BadCustomizerType' | 'NoCustomizerShellScript' | 'ServerError' | 'Other';

/**
 * Defines values for RunState.
 * Possible values include: 'ready', 'running', 'succeeded', 'partiallySucceeded', 'failed'
 * @readonly
 * @enum {string}
 */
export type RunState = 'ready' | 'running' | 'succeeded' | 'partiallySucceeded' | 'failed';

/**
 * Defines values for RunSubState.
 * Possible values include: 'queued', 'building', 'customizing', 'distributing'
 * @readonly
 * @enum {string}
 */
export type RunSubState = 'queued' | 'building' | 'customizing' | 'distributing';

/**
 * Defines values for ProvisioningState.
 * Possible values include: 'Creating', 'Succeeded', 'Failed', 'Deleting'
 * @readonly
 * @enum {string}
 */
export type ProvisioningState = 'Creating' | 'Succeeded' | 'Failed' | 'Deleting';

/**
 * Defines values for ProvisioningState1.
 * Possible values include: 'Creating', 'Succeeded', 'Failed', 'Deleting'
 * @readonly
 * @enum {string}
 */
export type ProvisioningState1 = 'Creating' | 'Succeeded' | 'Failed' | 'Deleting';

/**
 * Contains response data for the list operation.
 */
export type VirtualMachineImageTemplateListResponse = ImageTemplateListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ImageTemplateListResult;
    };
};

/**
 * Contains response data for the listByResourceGroup operation.
 */
export type VirtualMachineImageTemplateListByResourceGroupResponse = ImageTemplateListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ImageTemplateListResult;
    };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type VirtualMachineImageTemplateCreateOrUpdateResponse = ImageTemplate & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ImageTemplate;
    };
};

/**
 * Contains response data for the update operation.
 */
export type VirtualMachineImageTemplateUpdateResponse = ImageTemplate & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ImageTemplate;
    };
};

/**
 * Contains response data for the get operation.
 */
export type VirtualMachineImageTemplateGetResponse = ImageTemplate & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ImageTemplate;
    };
};

/**
 * Contains response data for the listRunOutputs operation.
 */
export type VirtualMachineImageTemplateListRunOutputsResponse = RunOutputCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: RunOutputCollection;
    };
};

/**
 * Contains response data for the getRunOutput operation.
 */
export type VirtualMachineImageTemplateGetRunOutputResponse = RunOutput & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: RunOutput;
    };
};

/**
 * Contains response data for the beginCreateOrUpdate operation.
 */
export type VirtualMachineImageTemplateBeginCreateOrUpdateResponse = ImageTemplate & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ImageTemplate;
    };
};

/**
 * Contains response data for the listNext operation.
 */
export type VirtualMachineImageTemplateListNextResponse = ImageTemplateListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ImageTemplateListResult;
    };
};

/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export type VirtualMachineImageTemplateListByResourceGroupNextResponse = ImageTemplateListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ImageTemplateListResult;
    };
};

/**
 * Contains response data for the listRunOutputsNext operation.
 */
export type VirtualMachineImageTemplateListRunOutputsNextResponse = RunOutputCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: RunOutputCollection;
    };
};

/**
 * Contains response data for the list operation.
 */
export type OperationsListResponse = OperationListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: OperationListResult;
    };
};

/**
 * Contains response data for the listNext operation.
 */
export type OperationsListNextResponse = OperationListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: OperationListResult;
    };
};