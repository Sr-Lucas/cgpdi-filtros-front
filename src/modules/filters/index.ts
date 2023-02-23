import { api } from '@/services/api';

import { LogarithmicFilter } from './logarithmic-filter';
import { NegativeFilter } from './negative-filter';
import { InverseLogFilter } from './inverselogaritmic-filter'; 
import { nthPowerFilter as NthPowerFilter } from './nth-power-filter';
import { NthRootFilter as NthRootFilter } from './nth-root-filter';
import { HorizontalMirrorFilter } from './horizontal-mirror-filter';
import { verticalMirrorFilter } from './verticalmirror-filter';
import { rotation90ClockwiseFilter } from './rotation90clockwise-filter';
import { rotation90AnticlockwiseFilter } from './rotation90anticlockwise-filter';
import { Compression } from './compression';
import { Expansion } from './expansion';
import { maxFilter } from './max-filter';
import { minFilter } from './min-filter';
import { modaFilter } from './moda-filter';
import { pseudoMedianaFilter } from './pseudomediana-filter';
import { nnrAmpliation } from './nnr-ampliation';
import { birAmpliation } from './bir-ampliation';
import { kNearestNeighbour } from './knearest-neighbour';
import { makeHistogram } from './make-histogram';
import { equalizeImage } from './equalize-image';
import { sumImages } from './sum-images';
import { LaplacianoFilter } from './laplaciano';
import { HightBoostFilter } from './hightboost';
import { PrewittFilter } from './prewitt';
import { SobelFilter } from './sobel';


export const filters = {
  negativeFilter: new NegativeFilter(api),
  logarithmicFilter: new LogarithmicFilter(api),
  inverselogFilter: new InverseLogFilter(api),
  nthPowerFilter: new NthPowerFilter(api),
  nthRootFilter: new NthRootFilter(api),
  HorizontalMirrorFilter: new HorizontalMirrorFilter(api),
  verticalMirrorFilter: new verticalMirrorFilter(api),
  rotation90ClockwiseFilter: new rotation90ClockwiseFilter(api),
  rotation90AnticlockwiseFilter: new rotation90AnticlockwiseFilter(api),
  compression: new Compression(api),
  expansion: new Expansion(api),
  maxFilter: new maxFilter(api),
  minFilter: new minFilter(api),
  modaFilter: new modaFilter(api),
  pseudoMedianaFilter: new pseudoMedianaFilter(api),
  nnrAmpliation: new nnrAmpliation(api),
  birAmpliation: new birAmpliation(api),
  kNearestNeighbour: new kNearestNeighbour(api),
  makeHistogram: new makeHistogram(api),
  equalizeImage: new equalizeImage(api),
  sumImages: new sumImages(api),
  laplaciano: new LaplacianoFilter(api),
  HightBoostFilter: new HightBoostFilter(api),
  PrewittFilter: new PrewittFilter(api),
  SobelFilter: new SobelFilter(api)
  
};