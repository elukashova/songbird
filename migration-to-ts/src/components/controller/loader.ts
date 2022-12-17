import { ILoader, Options, Errors, RespBundle, Callback } from './loader.types';
import { ResponseArticles } from '../app/app.types';

class Loader implements ILoader {
    constructor(private baseLink: string, private options: Options) {}

    public getResp(
        { endpoint, options = {} }: Partial<RespBundle>,
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        if (endpoint) {
            this.load('GET', endpoint, callback, options);
        }
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === Errors.Unauthorized || res.status === Errors.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint: string): string {
        const urlOptions: Options = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Callback<ResponseArticles>, options: Options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: ResponseArticles) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
