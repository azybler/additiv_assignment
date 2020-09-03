const lookupTable = {};
const dedupeTable = {};

const index = (employeeNames) => {
  // Construct reverse lookup table
  for (let i = 0; i < employeeNames.length; i++) {
    const employeeName = employeeNames[i].trim();

    for (let j = 1; j <= employeeName.length; j++) {
      const partialEmployeeName = employeeName.substring(0, j).toLowerCase();
      if (lookupTable[partialEmployeeName] === undefined) {
        lookupTable[partialEmployeeName] = [];
        dedupeTable[partialEmployeeName] = {};
      }
      if (dedupeTable[partialEmployeeName][employeeName] === undefined) {
        lookupTable[partialEmployeeName].push(employeeName);
        dedupeTable[partialEmployeeName][employeeName] = 1;
      }
    }

    const tokens = employeeName.split(' ');
    for (let j = 0; j < tokens.length; j++) {
      const token = tokens[j];
      for (let k = 1; k <= token.length; k++) {
        const partialToken = token.substring(0, k).toLowerCase();
        if (lookupTable[partialToken] === undefined) {
          lookupTable[partialToken] = [];
          dedupeTable[partialToken] = {};
        }
        if (dedupeTable[partialToken][employeeName] === undefined) {
          lookupTable[partialToken].push(employeeName);
          dedupeTable[partialToken][employeeName] = 1;
        }
      }
    }

    let initials = '';
    for (let j = 0; j < tokens.length; j++) {
      initials += tokens[j][0].toLowerCase();
    }
    if (lookupTable[initials] === undefined) {
      lookupTable[initials] = [];
      dedupeTable[initials] = {};
    }
    if (dedupeTable[initials][employeeName] === undefined) {
      lookupTable[initials].push(employeeName);
      dedupeTable[initials][employeeName] = 1;
    }
  }

  // sort each key's value alphabetically
  const allObjectKeys = Object.keys(lookupTable);
  for (let i = 0; i < allObjectKeys.length; i++) {
    const key = allObjectKeys[i];
    lookupTable[key].sort();
  }
};

const search = (keywords) => {
  const results = lookupTable[keywords.toLowerCase()] || [];
  return results;
};

module.exports = { index, search };
