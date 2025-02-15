import { Merge } from 'type-fest'
import { DateString } from '../generic'
import { SubmissionResponseDto } from '../submission'
import { FormDto } from './form'

export type SubmitFormFeedbackBodyDto = {
  isPreview?: boolean
  rating: number
  comment?: string
}

/**
 * Typing for individual form feedback
 */
export type FormFeedbackBase = {
  rating: number
  comment?: string
  formId: FormDto['_id']
  created?: Date
  lastModified?: Date
  // TODO #3964: Update to not optional once we fully migrate to /submissions/{submissionId}/feedback endpoint
  submissionId?: SubmissionResponseDto['submissionId']
}

// Convert to serialized version.
export type FormFeedbackDto = Merge<
  FormFeedbackBase,
  { created?: DateString; lastModified?: DateString }
>

export type ProcessedFeedbackMeta = {
  index: number
  timestamp: number
  rating: number
  comment: string
  // Note that this date is not a DateString, it is actually "D MMM YYYY"
  // format.
  date: string
  dateShort: string
}

export type FormFeedbackMetaDto = {
  average?: string
  count: number
  feedback: ProcessedFeedbackMeta[]
}
