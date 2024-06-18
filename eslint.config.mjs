import withNuxt from './.nuxt/eslint.config.mjs'
import antfu from '@antfu/eslint-config'

export default withNuxt(
    antfu({
      // ...@antfu/eslint-config options
    }),
    // ...your other rules
  )