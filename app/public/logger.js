function parseJson(message) {
  try {
    if (typeof message === 'string') return JSON.parse(message);

    return message;
  } catch {
    return message;
  }
}

function splitJoin(message) {
  const split = message.split(';');

  if (split.length < 2) return message;

  return split.join(' | ');
}

function parseMessage(message) {
  let maybeJson = parseJson(message);

  if (Array.isArray(maybeJson)) return maybeJson.map(splitJoin).join(' | ');

  if (typeof maybeJson === 'object') return message;

  return splitJoin(message);
}

function logMessage(detail) {
  let d = detail;

  if (typeof d === 'string') d = JSON.parse(detail);

  const message = parseMessage(d.message);

  if (d.type === 'dir') console.dir(d.message);

  if (d.type === 'info')
    console.log(`%c[INFO] ${d.message}`, 'background-color:#d7e464;color:#444;padding:3px 8px;border-radius: 3px;');

  if (d.type === 'metrics') {
    console.log(`%c[METRICS] ${message}`, 'background-color:#cce8f9;color:#444;padding:3px 8px;border-radius: 3px;');
  }

  if (d.type === 'warn')
    console.log(`%c[WARN] ${d.message}`, 'background-color:#fec67c;color:#444;padding:3px 8px;border-radius: 3px;');

  if (d.type === 'error') {
    if (typeof message === 'object') {
      let mess = 'message' in message ? ' ' + message['message'] : '';

      if ('traceId' in message) mess = mess + ' ' + message['traceId'];

      console.log(
        `%c[ERROR]${mess}`,
        'background-color:#e5130e;color:#444;padding:3px 8px;border-radius: 3px;',
        message,
      );
    } else
      console.log(`%c[ERROR] ${d.message}`, 'background-color:#e5130e;color:#444;padding:3px 8px;border-radius: 3px;');
  }
}

function logger(enable = true) {
  if (enable) {
    document.addEventListener('log', data => logMessage(data.detail));
    console.log('Logging enabled');
  } else {
    document.removeEventListener('log', data => logMessage(data.detail));
    // eslint-disable-next-line no-console
    console.log('Logging disabled');
  }
}

window['logger'] = logger;
window.logger();
