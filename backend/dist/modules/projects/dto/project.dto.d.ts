export declare enum ProjectStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    DEPLOYED = "DEPLOYED",
    PRODUCTION = "PRODUCTION"
}
export type ProjectDto = {
    id: string;
    name: string;
    tech: string[];
    description?: string;
    status: ProjectStatus;
    link?: string;
    github?: string;
    views?: number;
};
