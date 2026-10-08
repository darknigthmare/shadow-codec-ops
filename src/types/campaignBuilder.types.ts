import type { EraId } from './codec.types';
import type {
  CampaignChapterDefinition,
  CampaignDefinition,
  CampaignNodeDefinition
} from './campaign.types';

export interface CampaignBuilderDocument extends Omit<CampaignDefinition, 'source' | 'published' | 'chapters'> {
  schemaVersion: 2;
  author: string;
  version: string;
  published: boolean;
  chapters: CampaignChapterDefinition[];
  createdAt: string;
  updatedAt: string;
}

export interface CampaignBuilderLibrary {
  schemaVersion: 2;
  activeDocumentId?: string;
  documents: CampaignBuilderDocument[];
}

export type CampaignBuilderIssueSeverity = 'error' | 'warning' | 'info';

export interface CampaignBuilderValidationIssue {
  id: string;
  severity: CampaignBuilderIssueSeverity;
  message: string;
  nodeId?: string;
  chapterId?: string;
}

export interface CampaignContentPackManifest {
  schemaVersion: 2;
  packId: string;
  name: string;
  version: string;
  author: string;
  description: string;
  exportedAt: string;
  campaigns: CampaignBuilderDocument[];
  dependencies: {
    missions: string[];
    vrMissions: string[];
    tapes: string[];
    contacts: string[];
    lore: string[];
  };
}

export interface CampaignBuilderExportResult {
  fileName: string;
  payload: CampaignContentPackManifest;
}

export type CampaignBuilderNode = CampaignNodeDefinition;
export type CampaignBuilderChapter = CampaignChapterDefinition;
export type CampaignBuilderEra = EraId | 'multi';
