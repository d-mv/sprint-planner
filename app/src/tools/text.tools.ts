import { path } from 'ramda';
import { Person } from '../entities';

import { RecordObject } from '../models';

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
 * @param {String} template template with %1,%2,... placeholders
 * @param {String|Array} params array of strings or numbers
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
