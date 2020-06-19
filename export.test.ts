import { createModelFiles, createModels } from 'src'

const imports = [createModelFiles, createModels]

it('declared imports are defined', () => {
    imports.forEach(i => {
        expect(i).toBeDefined()
    })
})
