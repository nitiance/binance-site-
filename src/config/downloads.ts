export type DownloadPlatform = {
  platform: "Android" | "Windows" | "macOS" | "Linux" | "iOS";
  label: string;
  githubReleaseUrl: string;
  version?: string;
  sha256?: string;
  notesUrl?: string;
};

export type DownloadApp = {
  id: string;
  name: string;
  description: string;
  platforms: DownloadPlatform[];
};

// Empty by default. Populate with real GitHub Releases URLs when public builds exist.
export const downloads: DownloadApp[] = [];
