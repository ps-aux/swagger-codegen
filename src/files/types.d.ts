import { CodeFormatOpts } from '../code/types'
import { ModelsParsingResult } from '../model-parsing/types'

export type Api = {
    version: string
}

export type GenerateModelFilesOpts = {
    codeFormat: CodeFormatOpts
    log?: (a: any) => void
}

export type CodeFile = {
    content: string
    name: string
}

export type CreateModelFiles = (
    parsed: ModelsParsingResult,
    apiInfo: {
        version: string
    },
    opts: {
        format: CodeFormatOpts
        removeDefaults: boolean
    }
) => CodeFile[]
