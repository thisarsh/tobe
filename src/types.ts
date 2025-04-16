export interface Milestone {
  step: number;
  content: string;
  links?: string[];
  timeline?: string;
  skills?: string[];
}

export interface ApiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
