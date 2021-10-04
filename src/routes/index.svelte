<script>
	import { onMount } from "svelte";
	import error from "images/tenor.gif";

	let rssUrl = "https://news.ycombinator.com/rss";
	let rssList = [];
	let feedsContent = [];

	let ready = false;

	//On load, maintain RSS list
	onMount(async () => {
		const content = await fetch("api/").then((r) => r.json());
		feedsContent = content;
		ready = true;
	});

	//Refresh RSS feed
	const refreshFeeds = async () => {
		const content = await fetch("api/").then((r) => r.json());
		feedsContent = content;
	};

	//Handle Img Error
	function handleImgError() {
		this.src = error;
	}
</script>

<svelte:head>
	<title>RSS Reader</title>
</svelte:head>

<!-- Loading -->
{#if !ready}
	<div id="spinner" />
{/if}

<!-- Content -->
{#if ready}
	<div class="container">
		<div class="feed-container">
			{#each feedsContent as feed}
				<div class="feed">
					<h2>{feed.title}</h2>
					<ul>
						{#each feed.items as item}
							<li>
								<a href={item.link} target="_blank"
									>{item.title}<span class="arrow" /></a
								>

								{#if item.enclosure}
									<img
										src={item.enclosure.url}
										alt={item.title}
										on:error={handleImgError}
									/>
								{/if}
								<!-- <p>{@html item.content}</p> -->
								<!-- <caption>{item.isoDate}</caption> -->
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	/* Styles */
	.container,
	.feed {
		display: flex;
	}
	.feed {
		margin-top: 0;
		margin-bottom: 2em;
	}

	.feed-container {
		width: 100%;
	}
	.feed {
		display: flex;
		flex-direction: column;
	}
	.feed h2 {
		font-size: 1em;
		text-transform: uppercase;
	}
	.feed ul {
		list-style: none;
		column-count: 2;
		padding: 0;
		column-gap: 2em;
		/* height: 60vh; */
	}
	.feed li {
		padding: 0.75em 0;
		border-bottom: 1px solid rgba(20, 20, 20, 0.04);
		display: flex;
		flex-direction: row;
	}
	.feed li:before {
		border: 1px solid #ccc;
	}
	.feed li a {
		text-decoration: none;
		font-family: inconsolata, monospace;
		font-size: 0.875em;
		flex: 1;
		color: #2b2b2b;
		padding-right: 1em;
		transform: color 0.3s ease;
	}
	.feed li a:visited {
		color: #b2b2b2;
	}
	.feed li a:hover {
		color: #000;
	}
	.feed li img {
		max-height: 40px;
	}

	/* link arrow */
	.arrow {
		position: relative;
		/* top: 30%;
		left: 60%; */
		height: 60px;
		width: 100px;
		opacity: 0;
		transition: all 0.4s ease;
	}

	.arrow:before {
		content: "";
		width: 15px;
		height: 2px;
		background: #2b2b2b;
		position: absolute;
		top: 50%;
		margin-top: -1px;
		right: -20px;
		transition: all 0.3s ease;
	}

	.feed li a:hover .arrow {
		opacity: 0.2;
	}

	.feed li a:hover .arrow:before {
		right: -29px;
		width: 20px;
	}

	.feed li a:hover .arrow:after {
		content: "";
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 5px 0 5px 5px;
		border-color: transparent transparent transparent #2b2b2b;
		position: absolute;
		top: 50%;
		margin-top: -5px;
		right: -20px;
		transition: all 0.3s ease;
	}

	.feed li a:hover .arrow:after {
		right: -30px;
		/* right: -30px; */
	}

	/* Spinnner */
	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}
	#spinner {
		height: 100vh;
	}

	#spinner:before {
		content: "";
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 20px;
		height: 20px;
		margin-top: -10px;
		margin-left: -10px;
		border-radius: 50%;
		border: 2px solid #ccc;
		border-top-color: #000;
		animation: spinner 0.6s linear infinite;
	}

	@media (max-width: 1199.98px) { 
		.feed ul {
			column-count: 1;
		}
	 }
</style>
