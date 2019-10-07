module.exports = {
	config: {
		name: 'rc',
		description: 'Reloads Commands',
		owner: true,
	},
	run: async (ff, m, args) => {
		let promise = ff.loadCMDs();
		m.channel.send(promise);
	},
};