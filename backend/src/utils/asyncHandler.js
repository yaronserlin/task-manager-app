/**
 * Local asyncHandler
 * ------------------
 * Wrap any async Express route/controller so unhandled
 * rejections are forwarded to the next() error middleware.
 *
 * Usage:
 *   const asyncHandler = require('../utils/asyncHandler');
 *   router.get('/', asyncHandler(async (req, res) => { ... }));
 */
module.exports = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
