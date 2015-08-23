#!/usr/bin/env node

require('babel/register')({
  ignore: /cavn/
});
require('../index.js');
