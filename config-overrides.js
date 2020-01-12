 const { override, fixBabelImports, addLessLoader,addDecoratorsLegacy,addWebpackAlias } = require('customize-cra');

module.exports = override(
  //按需加哉
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
   style: true,
  }),
  //自定义主题
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: { '@primary-color': '#1DA57A' },
 }),
 //es7装饰器语法
 addDecoratorsLegacy(),
 //webpack路劲别名
 addWebpackAlias({
   
 })
); 