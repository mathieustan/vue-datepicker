<template>
  <v-container>
    <div class="d-flex flex-column align-start">
      <div class="d-flex align-center p-b-16">
        <v-select
          v-model="locale.lang"
          :items="langsList"
          item-text="name"
          item-value="value"
          label="Choose a lang"
          filled
          dense
        />
      </div>

      <VueDatePicker
        v-model="date"
        :locale="locale"
      />
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    locale: { lang: 'fr' },
    langsList: [
      { name: 'French', value: 'fr' },
      { name: 'English', value: 'en' },
      { name: 'Spanish', value: 'es' },
      { name: 'Deutsh', value: 'de' },
      {
        name: 'Custom Italian',
        value: {
          name: 'it',
          weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
          weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
          weekStart: 1,
          months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
          monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
          formats: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
          },
          ordinal: n => `${n}º`,
          buttonCancel: 'Annulla',
          buttonValidate: 'Ok',
          rangeHeaderText: 'Dalle %d Alle 13',
        },
      },
    ],
  }),
};
</script>
