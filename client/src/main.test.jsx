import { describe, expect, it } from 'vitest';
import { getServiceStatusMessage } from './serviceStatus.js';

describe('service list feedback', () => {
  it('tells the visitor when the list is loading', () => {
    expect(getServiceStatusMessage('loading')).toMatch(/loading/i);
  });

  it('explains what to do when the API request fails', () => {
    expect(getServiceStatusMessage('error')).toMatch(/try again/i);
  });

  it('handles an empty service list without presenting an empty page', () => {
    expect(getServiceStatusMessage('empty')).toMatch(/no services/i);
  });

  it('does not show a status message after a successful load', () => {
    expect(getServiceStatusMessage('ready')).toBe('');
  });
});
