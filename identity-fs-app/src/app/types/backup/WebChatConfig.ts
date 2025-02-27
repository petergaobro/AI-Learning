interface WebChatConfig {
  /**
   * The integration ID of your web chat integration. This is exposed as a UUID.
   */
  integrationID: string;

  /**
   * Which data center your integration was created in. e.g. 'us-south', 'us-east', 'jp-tok' 'au-syd', 'eu-gb',
   * 'eu-de', etc.
   */
  region: 'local' | 'dev' | 'staging' | 'us-south' | 'us-east' | 'jp-tok' | 'au-syd' | 'eu-gb' | 'eu-de' | 'kr-seo';

  /**
   * The service instance ID of the Assistant hosting your web chat integration.
   */
  serviceInstanceID?: string;

  /**
   * If you have a premium account, this is ID of your subscription and it is required. If you need this, it will be
   * provided in the snippet for you to copy and paste. If you don't need this, you won't see it.
   */
  subscriptionID?: string;

  /**
   * This library allows loading multiple different versions of web chat.
   */
  [key: string]: any;
}

export type { WebChatConfig };
