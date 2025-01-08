enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
  
  type Options = {
    method: METHOD;
    data?: any;
  };
  
  type OptionsWithoutMethod = Omit<Options, 'method'>;
  
export class HTTPTransport {
  private apiUrl: string = '';
  
  constructor(apiPath: string) {
    this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
    // this.apiUrl = `local${apiPath}`;
  }
  
  get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.GET });
  }
  
  post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.POST });
  }
  
  put<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.PUT });
  }
  
  delete<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.DELETE });
  }

  async request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    const { method, data } = options;
  
    const headers: HeadersInit = {};
  
    // Устанавливаем заголовки только если данные не являются FormData
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      method,
      credentials: 'include',
      mode: 'cors',
      headers,
      body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : null,
    });

    // @ts-expect-error: Игнорируем ошибку return response;
    return response; // это тут я долго работал с аватаром при отправке на сервер
  }
}


/* enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
  private apiUrl: string = '';

  constructor(apiPath: string) {
    this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
  }

  get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.GET });
  }

  post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.POST });
  }

  put<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.PUT });
  }

  delete<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.DELETE });
  }

  request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response as TResponse);
        } else {
          reject(xhr.statusText);
        }
      };

      xhr.onerror = function () {
        reject(xhr.statusText);
      };

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.send(data ? (data instanceof FormData ? data : JSON.stringify(data)) : null);
    });
  }
} */


// enum METHOD {
//   GET = 'GET',
//   POST = 'POST',
//   PUT = 'PUT',
//   PATCH = 'PATCH',
//   DELETE = 'DELETE',
// }
    
//     type Options = {
//       method: METHOD;
//       data?: any;
//     };
    
//     type OptionsWithoutMethod = Omit<Options, 'method'>;
    
// export class HTTPTransport {
//   private apiUrl: string = '';
    
//   constructor(apiPath: string) {
//     this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
//     // this.apiUrl = `local${apiPath}`;
//   }
    
//   get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
//     return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.GET });
//   }
    
//   post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
//     return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.POST });
//   }
    
//   put<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
//     return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.PUT });
//   }
    
//   delete<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
//     return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.DELETE });
//   }
  
//   async request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
//     const { method, data } = options;
    
//     const headers: HeadersInit = {};
    
//     // Устанавливаем заголовки только если данные не являются FormData
//     if (!(data instanceof FormData)) {
//       headers['Content-Type'] = 'application/json';
//     }
  
//     const response = await fetch(url, {
//       method,
//       credentials: 'include',
//       mode: 'cors',
//       headers,
//       body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : null,
//     });
  
//     // @ts-expect-error: Игнорируем ошибку return response;
//     return response; // это тут я долго работал с аватаром при отправке на сервер
//   }
// }

// enum METHOD {
//   GET = 'GET',
//   POST = 'POST',
//   PUT = 'PUT',
//   DELETE = 'DELETE',
// }

// type Options = {
//   method: METHOD;
//   data?: any;
// };

// type OptionsWithoutMethod = Omit<Options, 'method'>;

// export class HTTPTransport {
//   private apiUrl: string = '';

//   constructor(apiPath: string) {
//     this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
//   }

//   get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
//     return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.GET });
//   }

//   post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
//     return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.POST });
//   }

//   put<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
//     return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.PUT });
//   }

//   delete<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
//     return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.DELETE });
//   }

//   request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
//     const { method, data } = options;

//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open(method, url);

//       xhr.withCredentials = true;
//       xhr.responseType = 'json';

//       xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//           resolve(xhr.response as TResponse);
//         } else {
//           reject(new Error(xhr.statusText || 'Request failed'));
//         }
//       };

//       xhr.onerror = function () {
//         reject(new Error('Network error'));
//       };

//       if (!(data instanceof FormData)) {
//         xhr.setRequestHeader('Content-Type', 'application/json');
//       }

//       xhr.send(data ? (data instanceof FormData ? data : JSON.stringify(data)) : null);
//     });
//   }
// }