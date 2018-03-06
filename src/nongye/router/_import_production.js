module.exports = (file, name) => {r => require.ensure([], () => r(require(`../views/${file}`)), `nongye/nongye-${name}`)}
