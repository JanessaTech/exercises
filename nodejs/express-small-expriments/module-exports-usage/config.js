const _ = require("lodash");
console.log(
    _.merge({ cpp: "12" }, { java: "23" },
        { python:"35" })
);
console.log('' || 'hello world')
console.log('aa' || 'hello world')

const nodePath = process.env.NODE_ENV || 'local'  // system env variable. If you didn't define it, env will be 'local'
const defaultConfig = {
    node : nodePath
}
const newConfig = {
    aaa : 'hello world'
}

const mergedConfig = _.merge(defaultConfig, newConfig)
console.log(mergedConfig)



