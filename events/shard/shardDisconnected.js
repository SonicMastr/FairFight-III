module.exports = (ff, reason, id) => {
    ff.error(`Shard ${id} Disconnected: ${reason.code}`);
    ff.setImmediate(() => {
        ff.ws.shards.get(id)
            .connect()
            .then(() => {
                ff.info(`Shard ${id} Reconnected after Disconnection`, true);
            })
            .catch((error) => ff.error(`Shard ${id} Failed to Reconnect`));
    });
};