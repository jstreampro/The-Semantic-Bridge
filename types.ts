
export enum ConflictDomain {
  INTERNATIONAL = 'International/Geopolitical',
  INTERPERSONAL = 'Interpersonal/Social',
  MEDIA = 'Media/Propaganda',
  PROFESSIONAL = 'Professional/Corporate'
}

export interface AnalysisLayer {
  literal: string;
  emotionalState: string;
  culturalMarkers: string[];
  powerSignaling: string;
  inferredIntent: string;
  confidence: number; // 0-1
}

export interface ReExpression {
  message: string;
  culturalNote: string;
  alternatives: string[];
}

export interface BridgeResult {
  original: string;
  analysis: AnalysisLayer;
  reExpression: ReExpression;
  domain: ConflictDomain;
}

export interface UserAdjustments {
  intensity: number; // 0-100
  formality: number; // 0-100
  directness: number; // 0-100
}
