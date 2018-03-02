
import { Map } from 'immutable';


const createMapDeep = (obj) => { 

  var keys = Object.keys(obj).concat(Object.getOwnPropertySymbols(obj));
  let i = 0;
  let _l = keys.length;
  let key;
  const args = [];
  const childArgSet = [];
  let childArgs;

  for ( ; i!==_l; i++) { 
    key = keys[i];
    if (typeof obj[key] ==='object') { 
      childArgSet.push([key, obj[key]]);
    } else { 
      args[i] = [key, obj[key]]
    }
    
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

export default createMapDeep;


