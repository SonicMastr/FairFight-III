const time = require('../../src/TimeUtil');
const calc = require('../../src/Calculations');
module.exports = {
    config: {
        name: 'stats',
        description: 'Returns the Stats of the Bot',
        owner: true,
    },
    run: async (ff, m) => {
        const embed = new ff.embed.MessageEmbed();
        let seconds = Math.floor(ff.os.processUptime());
        let total = Math.ceil(ff.os.totalmem() * 100) / 100;
        let used = process.memoryUsage().rss
        embed.setAuthor('ff Stats');
        embed.setThumbnail(ff.user.avatarURL());
		embed.setDescription('Results');
		embed.setColor('3099F0');
        embed.addField('**Uptime**', time.formatSec(seconds), true);
        embed.addField('**Resource Usage**', `Memory Used: ${calc.convertBytes(used)}\nTotal Memory: ${calc.convertMBytes(total)}`, true);
        embed.addField('**Shard Pings**', ping(ff), true);
        embed.addField('**Discord Stats**', `${ff.guilds.size} Guilds\n${ff.users.size} Users\n${ff.ws.shards.size} Shards`, true);
		return m.channel.send({ embed });
    }
};
function ping(ff) {
    let pings = [];
	for (let i = 0; i < ff.ws.shards.size; i++) {
		let ping = ff.ws.shards.get(i).ping;
		pings.push(`Shard ${i}: ${Math.floor(ping)}ms`);
	}
	return pings;
};