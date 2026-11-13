export function getServiceStatusMessage(status) {
  switch (status) {
    case 'loading':
      return 'Loading the service list…';
    case 'error':
      return 'The service list could not be loaded. Check the API and try again.';
    case 'empty':
      return 'There are no services to show yet.';
    case 'ready':
      return '';
    default:
      return 'The service list is not available right now.';
  }
}
