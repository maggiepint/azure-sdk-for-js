import { ServiceClientCredentials, RequestOptionsBase } from "@azure/ms-rest-js";
import { AzureServiceClientOptions } from "@azure/ms-rest-azure-js";
import * as Models from "./models";
import { KeyVaultClient } from "./keyVaultClient";

export class SecretsClient {
  public readonly vaultBaseUrl: string;

  protected readonly client: KeyVaultClient;

  constructor(
    url: string,
    credential: ServiceClientCredentials,
    options?: AzureServiceClientOptions
  ) {
    this.vaultBaseUrl = url;
    this.client = new KeyVaultClient(credential, options);
  }

  /**
   * The SET operation adds a secret to the Azure Key Vault. If the named secret already exists,
   * Azure Key Vault creates a new version of that secret. This operation requires the secrets/set
   * permission.
   * @summary Sets a secret in a specified key vault.
   * @param secretName The name of the secret.
   * @param value The value of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async setSecret(
    secretName: string,
    value: string,
    options?: Models.KeyVaultClientSetSecretOptionalParams
  ) {
    const response = await this.client.setSecret(this.vaultBaseUrl, secretName, value, options);
    if (response._response.status !== 200) {
      throw new Error(response._response.bodyAsText);
    }
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a secret. This operation requires the secrets/delete permission.
   * @summary Deletes a secret from a specified key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<DeletedSecret>
   */
  public async deleteSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<DeletedSecret> {
    const response = await this.client.deleteSecret(this.vaultBaseUrl, secretName, options);
    if (response._response.status !== 200) {
      throw new Error(response._response.bodyAsText);
    }
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The UPDATE operation changes specified attributes of an existing stored secret. Attributes that
   * are not specified in the request are left unchanged. The value of a secret itself cannot be
   * changed. This operation requires the secrets/set permission.
   * @summary Updates the attributes associated with a specified secret in a given key vault.
   * @param secretName The name of the secret.
   * @param secretVersion The version of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async updateSecret(
    secretName: string,
    secretVersion: string,
    options?: Models.KeyVaultClientUpdateSecretOptionalParams
  ): Promise<Secret> {
    const response = await this.client.updateSecret(
      this.vaultBaseUrl,
      secretName,
      secretVersion,
      options
    );
    if (response._response.status !== 200) {
      throw new Error(response._response.bodyAsText);
    }
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires
   * the secrets/get permission.
   * @summary Get a specified secret from a given key vault.
   * @param secretName The name of the secret.
   * @param secretVersion The version of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async getSecret(
    secretName: string,
    secretVersion: string,
    options: RequestOptionsBase = {}
  ): Promise<Secret> {
    const response = await this.client.getSecret(
      this.vaultBaseUrl,
      secretName,
      secretVersion,
      options
    );
    if (response._response.status !== 200) {
      throw new Error(response._response.bodyAsText);
    }
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The Get Deleted Secret operation returns the specified deleted secret along with its attributes.
   * This operation requires the secrets/get permission.
   * @summary Gets the specified deleted secret.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<DeletedSecret>
   */
  public async getDeletedSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<DeletedSecret> {
    const response = await this.client.getDeletedSecret(this.vaultBaseUrl, secretName, options);
    if (response._response.status !== 200) {
      throw new Error(response._response.bodyAsText);
    }
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The purge deleted secret operation removes the secret permanently, without the possibility of
   * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
   * requires the secrets/purge permission.
   * @summary Permanently deletes the specified secret.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<void>
   */
  public async purgeDeletedSecret(secretName: string, options?: RequestOptionsBase): Promise<void> {
    const response = await this.client.purgeDeletedSecret(this.vaultBaseUrl, secretName, options);
    if (response._response.status !== 200) {
      throw new Error(response._response.bodyAsText || undefined);
    }
  }

  /**
   * Recovers the deleted secret in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault. This operation requires the secrets/recover permission.
   * @summary Recovers the deleted secret to the latest version.
   * @param secretName The name of the deleted secret.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async recoverDeletedSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<Secret> {
    const response = await this.client.recoverDeletedSecret(this.vaultBaseUrl, secretName, options);
    if (response._response.status !== 200) {
      throw new Error(response._response.bodyAsText || undefined);
    }
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * Requests that a backup of the specified secret be downloaded to the client. All versions of the
   * secret will be downloaded. This operation requires the secrets/backup permission.
   * @summary Backs up the specified secret.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Uint8Array | undefined>
   */
  public async backupSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<Uint8Array | undefined> {
    const response = await this.client.backupSecret(this.vaultBaseUrl, secretName, options);
    if (response._response.status !== 200) {
      throw new Error(response._response.bodyAsText);
    }
    return response.value;
  }

  /**
   * Restores a backed up secret, and all its versions, to a vault. This operation requires the
   * secrets/restore permission.
   * @summary Restores a backed up secret to a vault.
   * @param secretBundleBackup The backup blob associated with a secret bundle.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async restoreSecret(
    secretBundleBackup: Uint8Array,
    options?: RequestOptionsBase
  ): Promise<Secret> {
    const response = await this.client.restoreSecret(
      this.vaultBaseUrl,
      secretBundleBackup,
      options
    );
    if (response._response.status !== 200) {
      throw new Error(response._response.bodyAsText);
    }
    return this.getSecretFromSecretBundle(response);
  }

  private getSecretIdFromVersion(id: string | undefined) {
    if (!id) {
      return undefined;
    }
    const lastIndex = id.lastIndexOf("/");
    return lastIndex > 0 && lastIndex < id.length - 1 ? id.substring(lastIndex + 1) : undefined;
  }

  private getSecretFromSecretBundle(secretBundle: Models.SecretBundle): Secret {
    return {
      ...secretBundle,
      version: this.getSecretIdFromVersion(secretBundle.id)
    };
  }
}

export interface Secret extends Models.SecretBundle {
  version?: string;
}

export interface DeletedSecret extends Models.DeletedSecretBundle {
  version?: string;
}
