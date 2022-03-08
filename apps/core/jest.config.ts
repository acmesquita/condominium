import jestConfig from 'jest/jest.config'

export default {
  ...jestConfig,
    setupFilesAfterEnv: ['./main/config/setupTest.ts'],
}