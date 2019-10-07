const FF = require('./src/fairfight.js');
new FF({ shardCount: 1, totalShardCount: 1, messageCacheLifetime: 1, messageSweepInterval: 300 });