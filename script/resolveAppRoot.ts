import path from 'path'

export const resolveAppRoot = (relativePath: string) => path.resolve(process.cwd(), relativePath)
