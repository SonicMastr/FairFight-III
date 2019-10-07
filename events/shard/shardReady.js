module.exports = (ff, id) => {
    ff.info(`Started Shard ${id}`);
    ff.hook.send('', {
        'username': 'FairFight™ III',
        'embeds': [{
            'color': 16777215,
            'timestamp': new Date(),
            'fields': [{
                'name': `Shard ${id}`,
                'value': 'Shard Started',
            }],
        }],
    })
}