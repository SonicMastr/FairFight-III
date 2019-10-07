module.exports = (server) => {
    server.user.setActivity('My Father Hates Me');
    server.info(`Logged in and Ready on ${server.readyAt}`, true);
}