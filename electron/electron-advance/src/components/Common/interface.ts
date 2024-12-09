export interface IStep {
    type: string;
    content: string;
    href?: string;
}

export type ISteps = Array<IStep>;