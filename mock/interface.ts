export interface IConfig<T> {
	url: string
	type: 'POST' | 'GET'
	body: T
}

export interface ILoginResponse {
  params: {
    account: string;
    password: string;
    captcha: string;
  }
}
