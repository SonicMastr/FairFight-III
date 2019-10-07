module.exports = (ff, id) => {
    ff.info(`Shard ${id} Reconnected!`, true);
    ff.hook.send('', {
        'username': 'FairFight™ III',
        'embeds': [{
            'color': 16777215,
            'timestamp': new Date(),
            'fields': [{
                'name': `Shard ${id}`,
                'value': 'Shard Successfully Reconnected',
            }],
        }],
    })
}