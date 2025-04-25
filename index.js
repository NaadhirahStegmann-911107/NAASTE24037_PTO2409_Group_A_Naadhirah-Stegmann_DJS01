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

const d2 = d + (vel*time) //calcultes new distance 
const rf = fbr*time //calculates remaining fuel
const vel2 = calcNewVel(acc, vel, time) //calculates new velocity based on acceleration

// Pick up an error with how the function below is called and make it robust to such errors
calcNewVel = (vel, acc, time) => { 
  return vel + (acc*time)
}

console.log(`Corrected New Velocity: ${vel2} km/h`);
console.log(`Corrected New Distance: ${d2} km`);
console.log(`Corrected Remaining Fuel: ${rf} kg`);






