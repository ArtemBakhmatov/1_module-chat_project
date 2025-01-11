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
  
  public getApiUrl(): string {
    return this.apiUrl;
  }
  
  get(url: string, options: OptionsWithoutMethod = {}): Promise<Response> {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.GET });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<Response> {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.POST });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<Response> {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.PUT });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<Response> {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.DELETE });
  }

  async request(url: string, options: Options = { method: METHOD.GET }): Promise<Response> {
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

    
    return response; // это тут я долго работал с аватаром при отправке на сервер
  }
}