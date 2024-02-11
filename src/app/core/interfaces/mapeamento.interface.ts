export interface Dados {
    key: string | number | boolean;
    value: string | number | boolean;
    name?: string;
}

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
    libs: Array<Dados>;
    details: Array<DetailI>;
}

export interface DetailI {
    title: string;
    description: string;
}

export interface LibsI {
    dependencies?: string;
    devDependencies?: string;
    require?: string;
    'require-dev'?: string;
}

export interface IndexI {
    id: number;
    label: string;
    route: string;
    color: string;
}
