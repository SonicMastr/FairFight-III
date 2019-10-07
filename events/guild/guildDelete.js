module.exports = (ff, g) => {
    ff.info('Left Server: ' + g.name)
    ff.hook.send('', {
		'username': 'FairFight™ III',
		'avatarURL': ff.user.avatarURL(),
		'embeds': [{
			'color': 16777215,
			'description': 'Left a ff :(',
			'timestamp': new Date(),
			'fields': [{
				'name': 'Guild Name',
				'value': g.name,
			}],
		}],
	});
};