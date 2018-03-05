import { Validator } from 'vee-validate';

class Validate {
    private regex: any;

    constructor () {
        this.regex = {
            name: /^[^!@#$%^&*.,`"'\s]+$/,
            password: {
                specialChars: /[?!@#$%^*+\-_.,`]/,
                minlength: /^.{8,}$/,
                repeat: /^(?:(.)(?!\1\1))*$/,
            },
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            number: /[0-9]/,
        };
    }

    public getRegex (name: string): any {
        return this.regex[name];
    }

    public getValidateMsgs (): any {
        return {
            en: {
                custom: {
                    email: {
                        required: '이메일을 입력해주세요',
                        email: '올바르지 않은 형식의 이메일 입니다',
                    },
                    password: {
                        required: '비밀번호를 입력해주세요',
                    },
                    passwordRepeat: {
                        is: '비밀번호가 일치하지 않습니다',
                    },
                    name: {
                        required: '이름을 입력해주세요',
                        regex: '이름에는 -나 _를 제외한 특수문자를 사용하실 수 없습니다',
                    },
                },
            },
        };
    }

    public getPasswordTotalScore (): number {
        return this.getPasswordTestList().map(v => v.score).reduce((p, v) => p + v);
    }

    public getPasswordLevel (score: number) {
        if (score >= 100) {
            return 'perfect';
        }
        else if (score > 80) {
            return 'high';
        }
        else if (score > 30) {
            return 'warning';
        }
        else {
            return 'invalid';
        }
    }

    public calcPasswordScore (password: string, max: number): number {
        let score = 0;

        if (password && password.length > 0) {
            // console.log('================== REGX ================');
            this.getPasswordTestList().forEach(v => {
                // console.log(password, v.regex, v.score, v.regex.test(password));
                if (v.regex.test(password)) {
                    score += v.score;
                }
                else {
                    score -= v.score;
                }
            });
            // console.log('========================================');
            // console.log('FINAL SCORE =>', score);
        }
        else {
            score = 0;
        }

        score = score > 0 ? (score / max) * 100 : 0;

        return score;
    }

    private getPasswordTestList (): any {
        return [{
            score: 1,
            regex: this.regex.lowercase,
        }, {
            score: 1,
            regex: this.regex.uppercase,
        }, {
            score: 1,
            regex: this.regex.number,
        }, {
            score: 2,
            regex: this.regex.password.specialChars,
        }, {
            score: 5,
            regex: this.regex.password.repeat,
        }, {
            score: 10,
            regex: this.regex.password.minlength,
        }];
    }
}

const instance = new Validate();
export default instance;

Validator.localize(instance.getValidateMsgs());
