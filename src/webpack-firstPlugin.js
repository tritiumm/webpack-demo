class firstPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback)=>{
      let str= '';
      for (let filename in compilation.assets) {
        str += `file: ${filename} size: ${compilation.assets[filename]['size']()} \n`;
      }
      compilation.assets['fileSize.md'] = {
        source: function() {
          return str;
        },
        size: function() {
          return str.length;
        }
      }
      callback();
    })
  }
}
module.exports = firstPlugin;