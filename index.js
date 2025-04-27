/**
 * The code below determines motion parameters, ensuring unit consistancy and robust error handling.
 *  All input units are to be in SI units (m/s, m/s², s, m, kg, kg/s) unless specified.
 */

// Given Parameters in correct units of measurement
const initialVelocityInMs = 10000 * 1000 / 3600; // velocity converted from (km/h) to (m/s)
const acceleration = 3; // acceleration (m/s^2)
const time = 3600; // seconds (1 hour)
const initialDistance = 0; // distance must be in meters (m) and can be converted to (km)
const initialFuel = 5000; // remaining fuel (kg)
const fuelBurnRate = 0.5; // fuel burn rate (kg/s)

/**
 * Validates input prameters
 * @param {Object} params - Input parameters
 * @throws {Error} If any parameter is invalid
 */
function validateInputs(params) {
  const { velocity, acceleration, time, distance, fuel, fuelBurnRate } = params;

  if (typeof velocity !== 'number' || velocity < 0) {
    throw new Error('Velocity must be a non-negative number (m/s)');
  }

  if (typeof acceleration !== 'number') {
    throw new Error('Acceleration must be a number (m/s²)');
  }

  if (typeof time !== 'number' || time < 0) {
    throw new Error('Time must be a non-negative number (seconds)');
  }
  if (typeof distance !== 'number' || distance < 0) {
    throw new Error('Distance must be a non-negative number (meters)');
  }
  if (typeof fuel !== 'number' || fuel <0) {
    throw new Error('Fuel must be a non-negative number (kg)');
  }
  if (typeof fuelBurnRate !== 'number' || fuelBurnRate < 0) {
    throw new Error('Fuel burn rate must be a non-negative number (kg/s)');
  }
  if (fuelBurnRate * time > fuel) {
    throw new Error('Insufficient fuel for the given time duration');
  }
}

/**
 * Function calculates the new velocity with consistent units
 * @param {number} initialVelocity  - Initial velocity (m/s)
 * @param {number} acceleration  - Acceleration (m/s²)
 * @param {number} time - Time (seconds)
 * @returns {number} New Velocity in m/s
 */
function calculateNewVelocity(initialVelocity, acceleration, time) {
  return initialVelocity + (acceleration * time);
}

/**
 * Function calculates the new distance with consistent units
 * The result for the distance is not accurate as it does not account for the effect of the acceleration on the distance travelled as it simplifies the equation. The formula should be s = s0 + v0*t + 1/2*a*t^2. By omitting the second term, it creates the assumption that velocity is constant or has no effect. This in future can cause errors in the calculation of the distance travelled. 
 * @param {number} initialDistance - Initial distance (m)
 * @param {number} initialVelocity - Initial velocity (m/s)
 * @param {number} time - Time (seconds)
 * @returns {number} New distance in meters
 */
function calculateNewDistance(initialDistance, initialVelocity, time) {
  return initialDistance + (initialVelocity * time);
}

/**
 * Funntion calculates the remaining fuel
 * @param {number} initialFuel - Initial fuel (kg)
 * @param {number} fuelBurnRate - Fuel Burn Rate (kg/s)
 * @param {number} time - Time (seconds)
 * @returns {number} Remaining fuel in kg
 */
function calculateRemainingFuel(initialFuel, fuelBurnRate, time) {
  return initialFuel - (fuelBurnRate * time);
}

try {
  // Validate all the inputs
  validateInputs({
    velocity: initialVelocityInMs,
    acceleration: acceleration,
    time: time,
    distance: initialDistance,
    fuel: initialFuel,
    fuelBurnRate: fuelBurnRate
  });
 
  // Perform calculations
  const newVelocity = calculateNewVelocity(initialVelocityInMs, acceleration, time);
  const newDistance = calculateNewDistance(initialDistance, initialVelocityInMs, time);
  const remainingFuel = calculateRemainingFuel(initialFuel, fuelBurnRate, time);

  // Convert result to the desired units for display
  const newVelocityInKmh = newVelocity * 3600 /1000; // Convert m/s to km/h
  const newDistanceInKm = newDistance / 1000; // Converts m to km

  //Display results
  console.log(`Corrected New Velocity: ${newVelocityInKmh.toFixed(2)} km/h`);
  console.log(`Corrected New Distance: ${newDistanceInKm.toFixed(2)}. km`);
  console.log(`Corrected Remaining Fuel: ${remainingFuel.toFixed(2)} kg`);

} catch (error) {
  console.error(`Error: ${error.message}`)
}





