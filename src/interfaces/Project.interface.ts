import { Answer } from '@/interfaces/Form.interface';

type ProjectSchedule = {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    isNegotiable: boolean;
    scheduleRecurringId: boolean;
    startTime: string;
    endTime: string;
};

type ProjectContact = {
    typeId: string;
    information: string;
};

type ProjectMedia = {
    typeId: string;
    url: string;
};

export type ProejctInfo = {
    title: string;
    description: Answer[];
    profileImageUrl: string;
    media: ProjectMedia[];
}

export type Project = {
    title: string;
    description: string; // JSON.stringify
    profileImageUrl: string;
    startedAt: string;
    endsAt: string;
    locationId: string;
    schedule: ProjectSchedule;
    contacts: ProjectContact;
    keywords: string[];
    abilities: string[];
    media: ProjectMedia[];
};
