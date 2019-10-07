const Discord = require('discord.js');
const { prefix, token, ownerID, webhookID, webhookToken } = require('../config.json');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os-utils');

class FF extends Discord.Client {
	constructor(options) {
		super(options);
		// Define Commands
		this.commands = new Discord.Collection();
		this.aliases = new Discord.Collection();
		// config
		this.ownerID = ownerID;
		this.prefix = prefix;
		// OS Resource Uses Stats
		this.os = os;
		// webhook
		this.hook = new Discord.WebhookClient(webhookID, webhookToken);
		// Other Stuff
		this.embed = Discord;

		this._init();
	}
	// Command Handler
	loadCMDs() {
		// Counts Failed Command Loading Attempts for Reference
		let failed = 0;
		const load = dir => {
			const commands = fs.readdirSync(`./commands/${dir}/`).filter(d => d.endsWith('.js'));
			for (let file of commands) {
				const cache = require.resolve(`../commands/${dir}/${file}`);
				delete require.cache[cache];
				let pull;
				try {
					pull = require(`../commands/${dir}/${file}`);
				} catch (e) {
					this.error(`Failed to load Command File: ${file}`);
					this.error(e);
					failed = failed++
					continue;
				};
				this.commands.set(pull.config.name, pull);
				if (pull.config.aliases) pull.config.aliases.forEach(a => this.aliases.set(a, pull.config.name));
				this.info(`Loaded Command: ${pull.config.name}`);
			}
		};
		['main', 'misc', 'moderation', 'owner'].forEach(a => load(a));
		if (failed == 0) {
			this.info('All Commands Successfully Loaded', true);
			return ('Reloaded all Commands');
		}
		this.warning(`${failed} Commands Failed to Load`);
		return (`${failed} Commands Failed to Load`);
	}
	// Event Handler
	_loadEvents() {
		const load = dir => {
			const events = fs.readdirSync(`./events/${dir}/`).filter(d => d.endsWith('.js'));
			for (let file of events) {
				const evt = require(`../events/${dir}/${file}`);
				let eName = file.split('.')[0];
				if (eName === 'ready') {
					this.once(eName, evt.bind(null, this));
					continue;
				}
				this.on(eName, evt.bind(null, this));
				this.info(`Loaded Event: ${eName}`);
			}
		};
		['client', 'guild', 'shard'].forEach(a => load(a));
		this.info('All Events Successfully loaded', true);
	}
	// Console Logging
	error(error) {
		console.log(new Date().toLocaleTimeString(), `[${chalk.bold.red('Error')}]:`, chalk.bold.red(error));
	}
	warning(warning) {
		console.log(new Date().toLocaleTimeString(), `[${chalk.bold.yellow('Warning')}]:`, chalk.bold.yellow(warning));
	}
	info(info, success) {
		if (success) return console.log(new Date().toLocaleTimeString(), `[${chalk.bold.green('Success')}]:`, chalk.bold.green(info));

		console.log(new Date().toLocaleTimeString(), `[${chalk.whiteBright('Info')}]:`, chalk.whiteBright(info));
	}

	async _init() {
		process.on('unhandledRejection', console.error);
		process.on('uncaughtException', console.error);
		this._loadEvents();
		this.loadCMDs();
		await this.login(token).catch(this.error);
		this.info(this.ws.shards.size);
	}

}

module.exports = FF;