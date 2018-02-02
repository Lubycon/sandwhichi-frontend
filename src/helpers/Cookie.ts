import JSCookie from 'js-cookie';
import Base64 from '@/helpers/Base64';

class Cookie {
    Cookie: any;
    constructor () {
        this.Cookie = JSCookie;
    }

    public save ({ key, value }): void {
        const KEY: string = this.encodeKey(key);
        const VALUE: string = this.encodeValue(value);
        this.Cookie.set(KEY, VALUE);
    }

    public get (key): any {
        const KEY: string = this.encodeKey(key);
        const VALUE: string = this.Cookie.get(KEY);
        return this.decode(VALUE);
    }

    public clear (key): void {
        const KEY: string = this.encodeKey(key);
        this.Cookie.remove(KEY);
    }

    public encodeKey (key: string = null): string {
        if (!key) {
            return null;
        }
        else {
            return Base64.encode(`lubycon-${key}`).split('').reverse().join('');
        }
    }

    public encodeValue (value: any): string {
        if (!value) {
            return null;
        }
        else {
            const encodedValue: string = JSON.stringify(value);
            return Base64.encode(encodedValue);
        }
    }

    public decode (encodedValue: string): any {
        if (!encodedValue) {
            return null;
        }
        else {
            const decodedValue: string = Base64.decode(encodedValue);
            return JSON.parse(decodedValue);
        }
    }
}

const instance = new Cookie();
export default instance;
