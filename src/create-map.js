
import { Map } from 'immutable';

const  createMap = (obj) => { 

  var keys = Object.keys(obj).concat(Object.getOwnPropertySymbols(obj));
  var i = 0;
  var _l = keys.length;
  var key;
  var args = [];

  for ( ; i!==_l; i++) { 
    key = keys[i];
    args[i] = [key, obj[key]]
  }

  return Map(args);
}

export default createMap;