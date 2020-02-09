 const { override, fixBabelImports, addLessLoader,addDecoratorsLegacy,addWebpackAlias } = require('customize-cra');

 const { resolve } = require('path')
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
   '$comp':resolve(__dirname,'./src/components'),
   '$cont':resolve(__dirname,'./src/containers'),
   '$api':resolve(__dirname,'./src/api'),
   '$utils':resolve(__dirname,'./src/utils'),
   '$conf':resolve(__dirname,'./src/config'),
   '$redux':resolve(__dirname,'./src/redux')


 })
); 