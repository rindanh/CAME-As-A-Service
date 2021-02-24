import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import { users } from './users';
import { characteristics } from './characteristics';
import { dimensions } from './dimension';
import { alert } from './alert';
import { projects } from './projects';
import { methodchunksrec } from './methodchunksrec';
import { configs } from './config'
import { tenantSettings } from './tenantSettings';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  characteristics,
  dimensions,
  alert,
  projects,
  methodchunksrec,
  configs,
  tenantSettings
});

export default rootReducer;