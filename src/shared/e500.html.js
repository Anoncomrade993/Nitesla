module.exports = () => `

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>500 - Server Error | Nitesla</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<style>
		@keyframes electricity {
			0% {
				opacity: 0.4;
			}

			50% {
				opacity: 1;
			}

			100% {
				opacity: 0.4;
			}
		}

		.electricity-effect {
			animation: electricity 2s infinite;
		}

		.bg-tesla-pattern {
			background-image: linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
				linear-gradient(-45deg, #1a1a1a 25%, transparent 25%),
				linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
				linear-gradient(-45deg, transparent 75%, #1a1a1a 75%);
			background-size: 20px 20px;
			background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
		}

		.text-glow {
			text-shadow: 0 0 10px rgba(75, 104, 255, 0.5);
		}

		@keyframes spark {
			0% {
				transform: scale(1);
				opacity: 1;
			}

			50% {
				transform: scale(1.2);
				opacity: 0.8;
			}

			100% {
				transform: scale(1);
				opacity: 1;
			}
		}

		.spark-effect {
			animation: spark 3s infinite;
		}
	</style>
</head>

<body class="bg-gray-900 text-gray-300 min-h-screen font-sans">
	<div class="fixed w-full h-full bg-tesla-pattern opacity-10"></div>

	<main class="relative min-h-screen flex items-center justify-center p-4">
		<div class="text-center z-10">
			<!-- Tesla Coil SVG Animation -->
			<div class="flex justify-center mb-8">
				<svg class="w-40 h-40" viewBox="0 0 100 100">
					<!-- Coil Base -->
					<rect x="35" y="70" width="30" height="20" fill="#4B68FF" class="electricity-effect" />
					<!-- Coil Middle -->
					<rect x="40" y="40" width="20" height="30" fill="#4B68FF" class="electricity-effect" />
					<!-- Coil Top -->
					<circle cx="50" cy="35" r="10" fill="#4B68FF" class="spark-effect" />
					<!-- Lightning Bolts -->
					<path d="M50 25 L30 15" stroke="#4B68FF" stroke-width="2" class="electricity-effect" />
					<path d="M50 25 L70 15" stroke="#4B68FF" stroke-width="2" class="electricity-effect" />
					<path d="M50 25 L50 5" stroke="#4B68FF" stroke-width="2" class="electricity-effect" />
				</svg>
			</div>

			<h1 class="text-8xl font-bold mb-4 text-white text-glow">500</h1>
			<p class="text-2xl mb-8 text-gray-400">Power Surge Detected</p>

			<div class="space-y-4">

				<div class="mt-8 space-x-4">
					<button onclick="window.location.reload()" class="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105">
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
						<span>Recalibrate System</span>
					</button>
					<a href="/" class="inline-flex items-center space-x-2 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-full transition-all transform hover:scale-105">
						<span>Return to Safety</span>
					</a>
				</div>
			</div>

			<div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
				<div class="bg-gray-800 p-6 rounded-lg">
					<div class="mb-4 electricity-effect">
						<svg class="w-8 h-8 text-blue-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
						</svg>
					</div>
					<h3 class="font-bold text-white mb-2">System Overload</h3>
					<p class="text-sm text-gray-400">Our servers experienced a power surge</p>
				</div>

				<div class="bg-gray-800 p-6 rounded-lg">
					<div class="mb-4 electricity-effect">
						<svg class="w-8 h-8 text-blue-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
						</svg>
					</div>
					<h3 class="font-bold text-white mb-2">Protected</h3>
					<p class="text-sm text-gray-400">Your data remains safe and secure</p>
				</div>

				<div class="bg-gray-800 p-6 rounded-lg">
					<div class="mb-4 electricity-effect">
						<svg class="w-8 h-8 text-blue-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M23 12a11 11 0 11-22 0 11 11 0 0122 0z" />
							<path d="M12 16v-4" />
							<path d="M12 8h.01" />
						</svg>
					</div>
					<h3 class="font-bold text-white mb-2">Status</h3>
					<p class="text-sm text-gray-400">Our engineers are investigating</p>
				</div>
			</div>
		</div>
	</main>
</body>

</html>`