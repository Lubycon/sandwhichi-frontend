import Cookie from 'js-cookie';
import Base64Service from '@/services/Base64.service';

class CookieService {
    Cookie: any;
    constructor () {
        this.Cookie = Cookie;
    }

    public save ({ key, value }): void {
        const KEY: string = this.encodeKey(key);
        const VALUE: string = this.encodeValue(value);
        this.Cookie.set(KEY, VALUE);
    }

    public get (key): any {
        const KEY: string = this.encodeKey(key);
        const VALUE: string = Cookie.get(KEY);
        return this.decode(VALUE);
    }

    public clear (key): void {
        const KEY: string = this.encodeKey(key);
        Cookie.remove(KEY);
    }

    public encodeKey (key: string = null): string {
        if (!key) {
            return null;
        }
        else {
            return Base64Service.encode(`lubycon-${key}`).split('').reverse().join('');
        }
    }

    public encodeValue (value: any): string {
        if (!value) {
            return null;
        }
        else {
            const encodedValue: string = JSON.stringify(value);
            return Base64Service.encode(encodedValue);
        }
    }

    public decode (encodedValue: string): any {
        if (!encodedValue) {
            return null;
        }
        else {
            const decodedValue: string = Base64Service.decode(encodedValue);
            return JSON.parse(decodedValue);
        }
    }
}

const instance = new CookieService();
export default instance;
