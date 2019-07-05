/*
 * @Description: 设置babel插件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 14:57:12
 * @LastEditors: Charles
 * @LastEditTime: 2019-07-05 15:37:45
 */


/**
 * @description: 获取插件绝对路径
 * @param1: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:13:44
 */ 
function resolvePlugin(plugins) {
    return plugins.filter(Boolean).map((plugin) => {
        if (Array.isArray(plugin)) {
            const [pluginName, ...args] = plugin;
            return [require.resolve(pluginName), ...args];
        }
        return require.resolve(plugin);
    });
}

module.exports = () => {
    const path = require('path');
    const absoluteRuntime=path.dirname(require.resolve('@babel/runtime/package.json'));
    return {
        
        babelrc: false,
        presets: resolvePlugin([
            [
                '@babel/preset-env',
                {
                    ignoreBrowserslistConfig: true,
                    // If users import all core-js they're probably not concerned with
                    // bundle size. We shouldn't rely on magic to try and shrink it.
                    useBuiltIns: false,
                    // Do not transform modules to CJS
                    modules: false,
                    // Exclude transforms that make all code slower
                    exclude: ['transform-typeof-symbol'],
                },
            ],
            ['@babel/preset-react'],
            ['@babel/preset-typescript']
        ]),
        plugins: resolvePlugin([
            // Stage 0
            '@babel/plugin-proposal-function-bind',
            // Stage 1
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-proposal-logical-assignment-operators',
            ['@babel/plugin-proposal-optional-chaining', {
                loose: false
            }],
            ['@babel/plugin-proposal-object-rest-spread',{
                useBuiltIns: true,
            }]
            ['@babel/plugin-transform-destructuring',{
                loose: false,
                selectiveLoose: [
                  'useState',
                  'useEffect',
                  'useContext',
                  'useReducer',
                  'useCallback',
                  'useMemo',
                  'useRef',
                  'useImperativeHandle',
                  'useLayoutEffect',
                  'useDebugValue'
            ]}],
            ['@babel/plugin-proposal-pipeline-operator', {
                proposal: 'minimal'
            }],
            ['@babel/plugin-proposal-nullish-coalescing-operator', {
                loose: true
            }],
            '@babel/plugin-proposal-do-expressions',
            // Stage 2
            ['@babel/plugin-proposal-decorators', {
                legacy: true
            }],
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',
            // Stage 3
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            ['@babel/plugin-proposal-class-properties', {
                loose: true
            }],
            '@babel/plugin-proposal-json-strings',
            [
             "@babel/plugin-transform-runtime",
                {
                    "absoluteRuntime":absoluteRuntime,
                    "corejs": false,
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false
                }
            ],
            ["babel-plugin-import", { "libraryName": "antd", "libraryDirectory": "lib"}, "ant"],
            ["babel-plugin-import", { "libraryName": "ant-mobile", "libraryDirectory": "lib"}, "ant-mobile"]
            ["babel-plugin-import", { "libraryName": "ant-design-vue", "libraryDirectory": "lib"}, "ant-design-vue"]
        
        ]),
    };
};