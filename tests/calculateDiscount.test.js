import { describe, it, expect } from 'vitest';
import { calculateDiscount } from '../src/calculateDiscount.js'

describe('Diferencia de dias para descuento', () => {
  it('Mayor a 15 dias', () => {
    expect(calculateDiscount(16)).toBe(30);
  });

  it('Entre 3 y 15 dias', () => {
    expect(calculateDiscount(6)).toBe(15);
  });

  it('Menor a 3 dias', () => {
    expect(calculateDiscount(2)).toBe(0);
  });
});