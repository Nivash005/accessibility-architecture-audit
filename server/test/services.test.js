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

  it('does not publish placeholder hash links as working destinations', () => {
    for (const service of listServices()) {
      expect(service.href).toBeUndefined();
    }
  });
});
