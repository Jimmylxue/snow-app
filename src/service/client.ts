import { Toast } from 'native-base';
import { removeAuthToken } from '../utils';

// const serverUrl = 'https://api.jimmyxuexue.top';
const serverUrl = 'http://127.0.0.1:9999';

type CustomrHeader = {
  Authorization?: string | null;
};

class AuthHeader {
  header: CustomrHeader = {};

  setToken(token: string) {
    this.header = {
      ...this.header,
      Authorization: 'Bearer ' + token,
    };
  }

  setHeader(header: CustomrHeader) {
    this.header = {
      ...this.header,
      ...header,
    };
  }

  clear() {
    this.header = {};
  }
}

export const authHeader = new AuthHeader();

type RequestMethod =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

function getRequestUrl(url: string) {
  if (/^http:|^https:/.test(url)) {
    return url;
  }

  return `${serverUrl}${url}`;
}

class Client {
  channel = 2;

  emitter = 'pos';

  setChannel(val: 2 | 4) {
    this.channel = val;
  }

  setEmitter(val: 'pos' | 'app') {
    this.emitter = val;
  }

  makeAuthHeader() {
    return {
      ...authHeader.header,
      channel: this.channel,
    } as any;
  }

  async request({
    url,
    data,
    method = 'GET',
  }: {
    url: string;
    data?: any;
    method?: RequestMethod;
  }) {
    let body: any = null;
    let params = '';

    if (method == 'GET') {
      const search = new URLSearchParams(data);
      params = search ? '?' + search : '';
    } else if (method == 'POST' && data) {
      body = Object.keys(data).length > 0 ? JSON.stringify(data) : null;
    }

    return fetch(getRequestUrl(url) + params, {
      method,
      body,
      headers: {
        ...this.makeAuthHeader(),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 401) {
          removeAuthToken();
        } else {
          return response.json();
        }
      })
      .then(result => {
        if (result.code != 200) {
          throw new FetchError(result.message || result.result, result.code);
        }
        return result.result;
      });
  }
  async requestWithOutHeader({
    url,
    data,
    method = 'GET',
  }: {
    url: string;
    data?: any;
    method?: RequestMethod;
  }) {
    let body: any = null;
    let params = '';

    if (method == 'GET') {
      const search = new URLSearchParams(data);
      params = search ? '?' + search : '';
    } else if (method == 'POST' && data) {
      body = Object.keys(data).length > 0 ? JSON.stringify(data) : null;
    }

    return fetch(getRequestUrl(url) + params, {
      method,
      body,
      headers: {
        'user-token': this.makeAuthHeader()['user-token'],
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 401) {
          removeAuthToken();
        } else {
          return response.json();
        }
      })
      .then(result => {
        if (result.code != 200) {
          throw new FetchError(result.message || result.result, result.code);
        }
        return result.result;
      });
  }
}

export const client = new Client();

export function get(url: string, data?: any) {
  return client.request({
    url,
    data,
  });
}

export function post(url: string, data?: any) {
  return client.request({
    url,
    data,
    method: 'POST',
  });
}

export function getWithOutHeader(url: string, data?: any) {
  return client.requestWithOutHeader({
    url,
    data,
  });
}

export function postWithOutHeader(url: string, data?: any) {
  return client.requestWithOutHeader({
    url,
    data,
    method: 'POST',
  });
}

export type ClientError = {
  code: number;
  message: string;
};

class FetchError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.show(message);
  }

  show(message: string) {
    Toast.show({ title: message });
  }
}
