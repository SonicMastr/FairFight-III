module.exports = (ff, g) => {
	ff.info('Joined Server: ' + g.name)
	ff.hook.send('', {
		'username': 'FairFight™ III',
		'avatarURL': ff.user.avatarURL(),
		'embeds': [{
			'color': 16777215,
			'description': 'Joined a ff!',
			'timestamp': new Date(),
			'fields': [{
				'name': 'Guild Name',
				'value': g.name,
			}],
		}],
	});
};