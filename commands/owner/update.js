const util = require('util');
const exec = util.promisify(require('child_process').exec);
module.exports = {
    config: {
        name: 'update',
	    description: 'Updates the Bot Files',
	    owner: true,
    },
	run: async (ff, m, args) => {
		const msg = await m.channel.send('Updating...');
		m.channel.startTyping();
		const { stdout, stderr } = await exec('git pull origin master');
		if (stdout.includes('Already up to date.')) return msg.edit('FairFight™ III is already the latest version!').then(m.channel.stopTyping());
		await exec('npm install');
		msg.edit('Successfully Updated to the Latest Version!');
		m.channel.stopTyping();
        let promise = ff.loadCMDs();
		m.channel.send(promise);
	},
};