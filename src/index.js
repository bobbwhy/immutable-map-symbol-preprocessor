

import { Map } from 'immutable';

export const  createMap = (object) => { 

  var keys = Object.keys(object).concat(Object.getOwnPropertySymbols(object));
  var i = 0;
  var _l = keys.length;
  var key;
  var args = [];

  for ( ; i!==_l; i++) { 
    key = keys[i];
    args[i] = [key, object[key]]
  }

  console.log('::::', args);
  return Map(args);
}

export const  createMapDeep = (object) => { 

  var keys = Object.keys(object).concat(Object.getOwnPropertySymbols(object));
  let i = 0;
  let _l = keys.length;
  let key;
  const args = [];
  const childArgSet = [];
  let childArgs;

  for ( ; i!==_l; i++) { 

    key = keys[i];
    if (typeof object[key] ==='object') { 
      childArgSet.push([key, object[key]]);
      break;
    }
    args[i] = [key, object[key]]
  }  
  let map = Map(args);
  let db;

  if (childArgSet.length === 0) {
    return map;
  }

  i = 0;
  _l = childArgSet.length;

  for ( ; i !== _l; i++ ) { 
    childArgs = childArgSet[i];
    const subMap = createMapDeep(childArgs[1]);
    map = map.set(childArgs[0], subMap);
    db = childArgs[0];
  }

  return map;
}



