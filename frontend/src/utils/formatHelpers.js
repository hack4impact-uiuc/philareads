function URLParamToString(param) {
  if (param === 'middle' || param === 4) {
    return 'Middle School';
  }
  if (param === 'intermediate' || param === 8) {
    return 'Intermediate Level';
  }
}

function URLParamToQueryParam(param) {
  if (param === 'middle') {
    return 4;
  }
  if (param === 'intermediate') {
    return 8;
  }
}

export { URLParamToString, URLParamToQueryParam };
