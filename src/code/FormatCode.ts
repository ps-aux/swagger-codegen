import prettier from 'prettier'
import { CodeFormatOpts } from 'src/types'

export type FormatCode = (code: string) => string

export const CodeFormatter = (opts: CodeFormatOpts): FormatCode => code =>
    prettier.format(code, {
        semi: opts.semicolons,
        parser: 'babel',
        singleQuote: opts.singleQuote
    })
