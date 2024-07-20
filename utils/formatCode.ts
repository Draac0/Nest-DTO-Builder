// utils/formatCode.js
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel'; // Adjust parser based on the language
import estreePlugin from 'prettier/plugins/estree';
import typescriptPlugin from 'prettier/plugins/typescript'

export const formatCode = (code: string, language: string) => {
  try {
    return prettier.format(code, {
      parser: language === 'javascript' ? 'babel' : language, // Adjust parser based on the language
      plugins: [parserBabel, estreePlugin, typescriptPlugin],
    });
  } catch (error) {
    console.error('Error formatting code:', error);
    return code; // Return original code if formatting fails
  }
};
