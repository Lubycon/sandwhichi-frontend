/**
 * @class APIProject
 * @desc 프로젝트 관련 API 모듈
 */
import { APICore } from '@/api/APICore';
import { API_BASE_URL } from '@/constants/env.constant';
import { Project } from '@/interfaces/Project.interface';

class APIProject extends APICore {
    constructor () {
        super({
            baseURL: API_BASE_URL,
        });
    }

    public createProject (data: Project): Promise<any> {
        const endpoint: string = '/project';
        return this.post(endpoint, data);
    }

    public registKeyword (keyword: string): Promise<any> {
        const endpoint: string = `/keywords/${keyword}`;
        return this.post(endpoint);
    }

    public registAbility (ability: string): Promise<any> {
        const endpoint: string = `/abilities/${ability}`;
        return this.post(endpoint);
    }

    public fetchQuestionSet (): Promise<any> {
        const endpoint: string = `/projects/questions/`;
        return this.get(endpoint)
            .then(res => {
                if (res) {
                    const questions = res.reduce((questions, question) => {
                        questions.push({
                            value: question.id,
                            text: question.content
                        });
                        return questions;
                    }, new Array());
                    return Promise.resolve(questions);
                } else {
                    return Promise.reject(res.message);
                }
            });
    }

}

const instance = new APIProject();
export default instance;
