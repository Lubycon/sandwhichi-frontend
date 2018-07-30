/**
 * @class APIProject
 * @desc 프로젝트 관련 API 모듈
 */
import { APICore } from '@/api/APICore';
import { API_BASE_URL } from '@/constants/env.constant';
import { Project } from '@/interfaces/Project.interface';
import { ISelectbox } from "@/interfaces/utils/Selectbox.interface";

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
                if (res.results) {
                    const questions = res.results.reduce((questions, question) => {
                        questions.push({
                            value: question.id,
                            text: question.content
                        });
                        return questions;
                    }, new Array());
                    return Promise.resolve(questions);
                } else {
                    throw new Error(res.message);
                }
            });
    }

    public fetchRecurringtypes (): Promise<ISelectbox[]> {
        const endpoint: string = '/schedules/recurringtypes/';
        return this.get(endpoint)
            .then(res => {
                if (res.results) {
                    const defaultRecurringType = [{ value: '', text: '스케줄 반복 주기를 선택해주세요.' }];
                    const recurringTypes = res.results.reduce((items, item) => {
                        items.push({
                            value: item.id,
                            text: item.name
                        });
                        return items;
                    }, defaultRecurringType);
                    return Promise.resolve(recurringTypes);
                } else {
                    throw new Error(res.message);
                }
            });
    }

}

export const apiProject = new APIProject();
