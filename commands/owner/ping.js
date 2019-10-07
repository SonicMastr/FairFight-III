module.exports = {
    config: {
        name: 'ping',
        description: 'Returns Ping of the Bot',
        owner: true,
    },
    run: async (ff, m) => {
        const embed = new ff.embed.MessageEmbed();
		embed.setAuthor('Shard Pings', ff.user.avatarURL());
		embed.setDescription('Results');
		embed.setColor('3099F0');
		for (let i = 0; i < ff.ws.shards.size; i++) {
			let ping = ff.ws.shards.get(i).ping;
			embed.addField(`Shard ${i}`, '```js\n' + Math.floor(ping) + 'ms```', true);
		}
		return m.channel.send({ embed });
    },
};