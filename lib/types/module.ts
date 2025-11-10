export interface Module {
  title: string;
  description: string;
  order_index: number;
}

export interface Theme {
  title: string;
  context: string;
  media_url: string;
  media_type: "image" | "video";
  question: string;
}

export interface Tutorial {
  order_index: number;
  good_story: string;
  good_media_url: string;
  bad_story: string;
  bad_media_url: string;
}

export interface Summary {
  order_index: number;
  summary_content: string;
  next_chapter_intro: string;
}

export interface Quiz {
  order_index: number;
  question: string;
  question_type: "multiple_choice";
  media_url: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export interface Concept {
  order_index: number;
  title: string;
  definition: string;
  why_it_works: string;
  tutorial: Tutorial;
  summary: Summary;
  quizzes: Quiz[];
}

export interface Reflection {
  module_summary: string;
  module_summary_media_url: string;
  learning_advice: string;
}

export interface ModuleData {
  module: Module;
  theme: Theme;
  concepts: Concept[];
  reflection: Reflection;
}

// API 响应类型
export interface APIModuleConcept {
  id: number;
  title: string;
  completed: boolean;
}

export interface APIModuleTheme {
  title: string;
  context: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  question: string;
}

export interface APIModule {
  id: number;
  title: string;
  theme: APIModuleTheme;
  progress: number;
  concepts: APIModuleConcept[];
}

export interface APIModulesResponse {
  modules: APIModule[];
}