import { describe, it, expect } from 'vitest';
import { calculateDiscount } from '../src/calculateDiscount.js'
import { parseISO } from 'date-fns';

const eventDate = parseISO('2025-08-20');

describe('Diferencia de dias para descuento', () => {
  it('Mayor a 15 dias', () => {
    const today = parseISO('2025-08-01');
    expect(calculateDiscount(today, eventDate)).toBe(30);
  });

  it('Entre 3 y 15 dias', () => {
    const today = parseISO('2025-08-14');
    expect(calculateDiscount(today, eventDate)).toBe(15);
  });

  it('Menor a 3 dias', () => {
    const today = parseISO('2025-08-18');
    expect(calculateDiscount(today, eventDate)).toBe(0);
  });
});