import firstPlaceStory from './first-place.json'
import secondPlaceStory from './second-place.json'
import thirdPlaceStory from './third-place.json'

export type WinnerStoryContent = {
  direction?: 'rtl' | 'ltr'
  lang?: string
  pages: string[]
}

export const winnerStories: Record<
  'First Place' | 'Second Place' | 'Third Place',
  WinnerStoryContent | undefined
> = {
  'First Place': firstPlaceStory as WinnerStoryContent,
  'Second Place': secondPlaceStory as WinnerStoryContent,
  'Third Place': thirdPlaceStory as WinnerStoryContent,
}
