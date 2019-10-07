let lastTime = 0;
module.exports = (ff, id) => {
    ff.warning(`Shard ${id} Lost Connection. Reconnecting...`);
    if(Date.now() - lastTime > 60000) {
        ff.hook.send('', {
            'username': 'FairFight™ III',
            'embeds': [{
                'color': 16777215,
                'timestamp': new Date(),
                'fields': [{
                    'name': `Shard ${id}`,
                    'value': 'Lost Connection. Reconnecting...',
                }],
            }],
        })
        lastTime = Date.now();
    };
    
}