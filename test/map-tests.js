
import Bunyan from 'bunyan';
const  log = Bunyan.createLogger({name: "CoreMethodOMatTest"});

import 'mocha';
import { expect } from 'chai';

import { fromJS, Map } from 'immutable';

const codePath
        = process.env.NODE_ENV === "PRODUCTION"
          ? 'lib' : 'src';

const createMapMethods = require(`../${codePath}/index`);
const { createMap, createMapDeep } = createMapMethods;

describe('test of methods to create immutable maps from js objects with symbols',
  () => { 

    var FEELING = Symbol('FEELING');
    var PURE = Symbol('PURE');
    var MORE = Symbol('MORE');

    var testData = { 
      name: 'John Silver',
      age: 103,
      birthplace: 'Croatia',
      voice: 'Flat',
      eyes: 'sensitive',
      [FEELING]: 'groovy',
      [PURE]: 'no'
    };

    var testDataDeep = { 
      name: 'John Silver',
      age: 103,
      birthplace: 'Croatia',
      voice: 'Flat',
      eyes: 'sensitive',
      [FEELING]: 'groovy',
      [PURE]: 'no',
      more: { 
        virtue: 'Fun',
        height: 72,
        [FEELING]: { 
          mood: 'fine',
          temperament: 'mellow'
        }
      },
      [MORE]: { 
        spouse: 'Grace Hopper',
        age: 24, 
        birthplace: 'Riga'
      }
    };

    var map;

    it(`should be able to create a map from a flat object with the createMap method`,
      () => { 
        
        const map = createMap(testData);

        const name = map.get('name');
        expect(name).to.equal('John Silver');

        const age = map.get('age');
        expect(age).to.equal(103);

        const birthplace = map.get('birthplace');
        expect(birthplace).to.equal('Croatia');

        const voice = map.get('voice');
        expect(voice).to.equal('Flat');

        const eyes = map.get('eyes');
        expect(eyes).to.equal('sensitive');

        const feeling = map.get(FEELING);
        expect(feeling).to.equal('groovy');

        const pure = map.get(PURE);
        expect(pure).to.equal('no');
      }
    );

    it(`should be able to create a map from a flat object with the createMapDeep method`,
      () => { 
        map = createMapDeep(testData);
        const name = map.get('name');
        expect(name).to.equal('John Silver');

        const age = map.get('age');
        expect(age).to.equal(103);

        const birthplace = map.get('birthplace');
        expect(birthplace).to.equal('Croatia');

        const voice = map.get('voice');
        expect(voice).to.equal('Flat');

        const eyes = map.get('eyes');
        expect(eyes).to.equal('sensitive');

        const feeling = map.get(FEELING);
        expect(feeling).to.equal('groovy');

        const pure = map.get(PURE);
        expect(pure).to.equal('no');
      }
    );

    it(`should be able to create a map from a nested object with the createMapDeep method`,
      () => { 
        map = createMapDeep(testDataDeep);
        const name = map.get('name');
        expect(name).to.equal('John Silver');

        const age = map.get('age');
        expect(age).to.equal(103);

        const birthplace = map.get('birthplace');
        expect(birthplace).to.equal('Croatia');

        const voice = map.get('voice');
        expect(voice).to.equal('Flat');

        const eyes = map.get('eyes');
        expect(eyes).to.equal('sensitive');

        const feeling = map.get(FEELING);
        expect(feeling).to.equal('groovy');

        const pure = map.get(PURE);
        expect(pure).to.equal('no');

        const more = map.get('more');
        expect(Map.isMap(more)).to.equal(true);
        expect(more.get('virtue')).to.equal('Fun');
        expect(map.get('more').get('virtue')).to.equal('Fun');
        expect(map.getIn(['more', 'virtue'])).to.equal('Fun');


        const moreS = map.get(MORE);
        expect(Map.isMap(moreS)).to.equal(true);
        expect(moreS.get('spouse')).to.equal('Grace Hopper');
        expect(map.getIn([MORE, 'spouse'])).to.equal('Grace Hopper');
        
        expect(map.getIn(['more', FEELING, 'mood'])).to.equal('fine');
      }
    );
  }  
);

