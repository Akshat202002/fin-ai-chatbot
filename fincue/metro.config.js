const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add web support
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Ensure react-native-web is resolved properly
config.resolver.alias = {
  'react-native': 'react-native-web',
};

// Add additional resolver options for better web compatibility
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;