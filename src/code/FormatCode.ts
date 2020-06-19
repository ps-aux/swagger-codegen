import prettier from 'prettier'
import { CodeFormatOpts } from './types'

export type FormatCode = (code: string) => string

export const CodeFormatter = (opts: CodeFormatOpts): FormatCode => code =>
    prettier.format(code, {
        semi: opts.semicolons,
        parser: 'typescript',
        singleQuote: opts.singleQuote
    })
