module.exports = (ff, err, id) => {
    ff.error(`{Shard ${id}} ${err.toString()}`);
}