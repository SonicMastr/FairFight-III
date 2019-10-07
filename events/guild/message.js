module.exports = (ff, m) => {
    if (!m.content.startsWith(ff.prefix) || m.author.bot) return;
    if (m.channel.type === 'dm' && !m.content.startsWith(`${ff.prefix}help`)) return;
    let args = m.content.slice(ff.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile = ff.commands.get(cmd) || ff.commands.get(ff.aliases.get(cmd));
    if (commandfile) {
        if (commandfile.config.owner) {
            if (m.author.id !== `${ff.ownerID}`) return;
        }
        commandfile.run(ff, m, args);
        ff.info('Ran Command');
    }
}