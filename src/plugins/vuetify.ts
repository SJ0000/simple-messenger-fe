import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import {createVuetify} from 'vuetify'
import {aliases, mdi} from "vuetify/iconsets/mdi-svg";

export default createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  icons:{
    defaultSet: 'mdi',
    aliases,
    sets:{
      mdi,
    }
  }
})
