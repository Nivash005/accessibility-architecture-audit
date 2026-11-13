import { describe, expect, it } from 'vitest';
import { listServices } from '../src/services.js';

describe('service catalogue data', () => {
  it('contains sample records', () => {
    expect(listServices().length).toBeGreaterThan(0);
  });

  it('gives every record a stable ID, a name and a description', () => {
    for (const service of listServices()) {
      expect(service.id).toBeTruthy();
      expect(service.name).toBeTruthy();
      expect(service.description).toBeTruthy();
    }
  });

  it('uses working HTTPS destinations on the official portal', () => {
    for (const service of listServices()) {
      const destination = new URL(service.href);
      expect(destination.protocol).toBe('https:');
      expect(destination.hostname).toBe('www.tn.gov.in');
    }
  });
});
