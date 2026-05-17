const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const androidBuildFoldersBlockList = new RegExp(
  [
    'android[\\\\/]app[\\\\/]\\.cxx[\\\\/].*',
    'android[\\\\/]\\.gradle[\\\\/].*',
    'android[\\\\/]build[\\\\/].*',
    'android[\\\\/]app[\\\\/]build[\\\\/].*',
  ].join('|'),
);

const config = {
  resolver: {
    blockList: androidBuildFoldersBlockList,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);