module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    // Requis par react-native-reanimated v4 / react-native-worklets, même si
    // l'app ne les utilise pas directement : babel-preset-expo s'attend à ce
    // que ce plugin soit configuré dès que le paquet est présent (il est tiré
    // par la New Architecture). Doit rester le DERNIER plugin de la liste.
    plugins: ['react-native-worklets/plugin'],
  };
};
