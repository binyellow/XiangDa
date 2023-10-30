export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateError(givenValue, inputValue) {
  const errorPercentage =
    (Math.abs(givenValue - inputValue) / givenValue) * 100;
  return errorPercentage;
}

export function onPrecision(givenValue, inputValue, precision = 2) {
  const error = calculateError(givenValue, inputValue);
  const isErrorWithin2Percent = error <= precision;

  return isErrorWithin2Percent;
}
