<!-- ANCHOR CSS code. -->
<style>
.about {
  height: 100%;
  background-color: #ffffff;
}
</style>

<!-- ANCHOR Template with the compontents. -->
<template blue>
  <div class="about">
    <v-container class="my-0">
      <v-layout row wrap height="100vh">
        <v-flex xs12 md6>
          <v-img class="ma-5" src="../assets/factory.svg"></v-img>
        </v-flex>

        <v-flex xs12 md6>
          <v-card flat width="100%" tile>
            <div class="pa-5">
              <h1 class="pa-5" align="center">DIE TF BERN</h1>
            </div>
            <div class="pa-5">
              <p class="pl-5" align="center">
                Die TF Bern früher (vor 2014) auch bekannt als die "Lädere" ist
                ein "Ausbildungszentrum" in Bern.
              </p>
              <p class="pa-5" align="center">
                Die Schule bietet viele Lehrstellen in verschiedenen Bereichen
                an und begleitet die Lernenden durch die ganze Lehre hindurch.
                Wichtig ist auch, dass die TF Bern einen eher schulischen /
                akademischen Ansatz hat als andere Betriebe. Somit wird der
                Einstieg in das Berufsleben etwas erleichtert.
              </p>
              <p class="pa-5" align="center">
                Wenn du Interesse hast an einer Lehrstelle, warte nicht und
                sende uns deine Bewerbung!
              </p>
            </div>
          </v-card>
        </v-flex>

        <v-flex xs12 md6>
          <v-img class="ma-5" src="../assets/accountant.svg"></v-img>
        </v-flex>

        <v-flex xs12 md6>
          <v-card flat width="100%" tile>
            <div class="pa-5">
              <h1 class="pa-5" align="center">BRAUCHST DU HILFE?</h1>
            </div>
            <div class="pa-5">
              <p class="pl-5 pb-5" align="center">
                Wenn du mehr über die Schule erfahren möchtest oder einen Termin
                abmachen möchtest für einen Schnuppertag, melde dich bei Frau
                Bönzli. Sie wird dir gerne helfen mit deinen Anliegen. Unten
                findest du die Kontaktdaten.
              </p>

              <v-row justify="center" align="center">
                <v-chip
                  x-large
                  label
                  class="ma-2 primary white--text"
                  align="center"
                >
                  pia.bönzli@tfbern.ch
                </v-chip>
                <v-chip
                  x-large
                  label
                  class="ma-2 primary white--text"
                  align="center"
                >
                  031 333 22 22</v-chip
                >
              </v-row>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
