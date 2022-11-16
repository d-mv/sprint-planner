import { path } from 'ramda';

import { RecordObject } from '..';

function buildPath(sectionOrPath: string | string[], keyOrPath: string | string[]) {
  const pathToValue = typeof sectionOrPath === 'string' ? [sectionOrPath] : sectionOrPath;

  return typeof keyOrPath === 'string' ? [...pathToValue, keyOrPath] : [...pathToValue, ...keyOrPath];
}

export function setupText(textData: RecordObject) {
  return function setSection(sectionOrPath: string | string[]) {
    return function get(keyOrPath: string | string[]) {
      return (path(buildPath(sectionOrPath, keyOrPath), textData) as string) ?? '';
    };
  };
}

export function buildId(module: string, id: string) {
  return `${module}-${id}`;
}

/**
 * Substitute %1 placeholders in template with provided data
 *
 * @param {string} template template with %1,%2,... placeholders
 * @param {string | Array} params array of strings or numbers
 * @returns string message
 */
export function fromTemplate(template: string, params: (string | number)[]): string {
  let result = template;

  if (!params) return template;

  params.forEach((param: string | number, key: number) => {
    result = result.replace(new RegExp(`%${key + 1}`, 'g'), String(param));
  });
  return result;
}

export function makeString(context?: string) {
  const withContext = (message: string) => (context ? `[${context}] ${message}` : message);

  return function call(template: string, params: (string | number | boolean)[]): string {
    if (!params?.length) return withContext(template);

    let result = template;

    params.forEach((param, key) => {
      result = result.replace(new RegExp(`%${key + 1}`, 'g'), String(param));
    });

    if (!context) return result;

    return withContext(result);
  };
}
