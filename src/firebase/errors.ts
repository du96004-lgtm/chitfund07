
export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  constructor(context: SecurityRuleContext) {
    const intro = 'FirestoreError: Missing or insufficient permissions.';
    const help =
      'This is a contextual error to help with debugging Security Rules. It should only be thrown in a development environment.';
    const contextString = JSON.stringify(context, null, 2);

    super(`${intro}\n\n${help}\n\nContext:\n${contextString}`);
    this.name = 'FirestorePermissionError';
  }
}
