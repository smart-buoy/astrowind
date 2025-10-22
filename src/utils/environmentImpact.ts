import type { SmartBuoyStatistics } from './statistics';

export interface EnvironmentalImpact {
  co2SavedKg: number;
  fuelSavedLiters: number;
  seabedProtectedSqM: number;
  microplasticAvoidedKg: number;
}

const CO2_SAVED_PER_BOOKING_KG = 8.5;
const FUEL_SAVED_PER_BOOKING_LITERS = 4.2;
const SEABED_PROTECTED_PER_BOOKING_SQM = 18;
const MICROPLASTIC_REDUCTION_PER_BUOY_KG = 0.42;

export const calculateEnvironmentalImpact = (
  statistics: SmartBuoyStatistics | null
): EnvironmentalImpact => {
  const bookings = statistics?.numberOfBookings ?? 0;
  const buoys = statistics?.numberOfBuoys ?? 0;

  return {
    co2SavedKg: bookings * CO2_SAVED_PER_BOOKING_KG,
    fuelSavedLiters: bookings * FUEL_SAVED_PER_BOOKING_LITERS,
    seabedProtectedSqM: bookings * SEABED_PROTECTED_PER_BOOKING_SQM,
    microplasticAvoidedKg: buoys * MICROPLASTIC_REDUCTION_PER_BUOY_KG,
  };
};
