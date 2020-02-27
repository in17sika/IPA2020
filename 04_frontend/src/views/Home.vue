<!-- ANCHOR CSS code. -->
<style>
	* {
		font-family: "Montserrat";
	}

	.landing {
		height: 100%;
		background-color: #ffffff;
	}

	p {
		font-size: 18px;
	}
</style>

<!-- ANCHOR Template with the compontents. -->
<template>
	<div class="home">
		<v-container class="my-0">
			<v-layout row wrap height="100vh">

				<v-flex xs12 md6 height="100%">
					<v-img class="mt-12" src="../assets/quitting.svg"></v-img>
				</v-flex>

				<v-flex xs12 md6>
					<v-card flat width="100%" tile class="mt-10">
						<div class="pa-2">
							<h1 class="pa-5">WAS MACHT EIN INFORMATIKER?</h1>
						</div>
						<div class="pa-2">
							<p class="pa-5">
								Du bastelst gerne mit Computern oder fragst dich wie so ein
								Computer-Progromm funktioniert?
							</p>
							<p class="pa-5">
								Dann besuche uns und wirf einen Blick in die Spannende Welt der
								Informatik.
							</p>
							<v-btn x-large class="ma-5" color="blue white--text" to="/apply">Anmelden</v-btn>
							<v-btn x-large class="ma-5" color="grey white--text" to="/about">info</v-btn>
						</div>
					</v-card>
				</v-flex>

			</v-layout>
		</v-container>
	</div>
</template>

<!-- ANCHOR JS code. -->
<script>
export default {
	
	// ANCHOR Sets the compontents name.
	name: "Home",
	
	// ANCHOR Sets data.
	data() {
		return {};
	}
};
</script>