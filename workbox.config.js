module.exports = (options) => ({
	...options,
	cleanupOutdatedCaches: true,
	cacheId: JSON.stringify(`scaffold`),
});
