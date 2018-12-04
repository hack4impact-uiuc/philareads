function URLParamToString(param) {
  // param's possible values:
  // - In our BE we store it as "Middle" or "Intermediate"
  // - In our app router we route as "/middle" or "/intermediate"
  if (param.toLowerCase && param.toLowerCase() === 'middle') {
    return 'Middle School';
  }
  if (param.toLowerCase && param.toLowerCase() === 'intermediate') {
    return 'Intermediate';
  }
}

function URLParamToQueryParam(param) {
  // Desired return value should match BE
  // - In our BE we store it as "Middle" or "Intermediate"
  if (param.toLowerCase && param.toLowerCase() === 'middle') {
    return 'Middle';
  }
  if (param.toLowerCase && param.toLowerCase() === 'intermediate') {
    return 'Intermediate';
  }
}

export { URLParamToString, URLParamToQueryParam };
