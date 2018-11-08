function URLParamToString(param) {
  if (param === 'middle') {
    return 'Middle School';
  }
  if (param === 'intermediate') {
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
