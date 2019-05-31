import prettier from 'prettier'

type Opts = {
    semicolons: boolean,
}

export type FormatCode = (code: String) => String

export const CodeFormatter = (opts: Opts): FormatCode =>
    code => prettier.format(code,
        { semi: opts.semicolons, parser: 'babel', singleQuote: true })