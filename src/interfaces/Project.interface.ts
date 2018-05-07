interface ProjectSchedule {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
    isNegotiable: boolean,
    scheduleRecurringId: boolean,
    startTime: string,
    endTime: string,
}

interface ProjectContact {
    typeId: string,
    information: string,
}

interface ProjectMedia {
    typeId: string,
    url: string,
}
export interface Project {
    title: string,
    description: string,
    profileImageUrl: string,
    startedAt: string,
    endsAt: string,
    locationId: string,
    schedule: ProjectSchedule,
    contacts: ProjectContact,
    keywords: string[],
    abilities: string[],
    media: ProjectMedia,
}
