// Human-readable text
const middleDisplayText = 'Middle school';
const intermediateDisplayText = 'Intermediate';

// URL params
const middleURLParam = 'middle';
const intermediateURLParam = 'intermediate';

// BE Storage/Return Values
const middleDatabaseValue = 'Middle';
const intermediateDatabaseValue = 'Intermediate';

function URLParamToString(param) {
  if (param === middleURLParam || param === middleDatabaseValue) {
    return middleDisplayText;
  }
  if (param === intermediateURLParam || param === intermediateDatabaseValue) {
    return intermediateDisplayText;
  }
}

function URLParamToQueryParam(param) {
  // Desired return value should match BE
  if (param === middleURLParam) {
    return middleDatabaseValue;
  }
  if (param === intermediateURLParam) {
    return intermediateDatabaseValue;
  }
}

export { URLParamToString, URLParamToQueryParam };
