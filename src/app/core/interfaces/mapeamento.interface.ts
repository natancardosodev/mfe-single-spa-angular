import { Dados } from 'lib-vox-shared-codes';

export interface DadosEquipeI {
    key: string;
    value: Array<Dados>;
}

export interface DataProjectsI {
    title: string;
    filenameLibs: string;
    branch: string;
    colorPrimary: string;
    colorSecondary: string;
    projects?: Array<ProjectI>;
}

export interface ProjectI {
    title: string;
    id: number;
    libs: Array<any>;
    details: Array<DetailI>;
}

export interface DetailI {
    title: string;
    description: string;
}
