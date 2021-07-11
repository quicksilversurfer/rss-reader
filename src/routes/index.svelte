<script>
	import { onMount } from "svelte";

	import successkid from "images/successkid.jpg";
	let rssUrl = "https://news.ycombinator.com/rss";
	let rssList = [];
	let feedsContent = [];

	//On load, maintain RSS list
	onMount(async () => {
		const content = await fetch("api/").then((r) => r.json());
		feedsContent = content;
	});

	//Refresh RSS feed
	const refreshFeeds = async () => {
		const content = await fetch("api/").then((r) => r.json());
		feedsContent = content;
	};
</script>

<svelte:head>
	<title>Sapper RSS Reader</title>
</svelte:head>

<div class="feed-list">
	<!-- <button on:click={refreshFeeds}>Reload</button> -->
	<ul>
		{#each rssList as feed}
			<li>{feed}</li>
		{/each}
	</ul>
</div>

<div class="container">
	<div class="feed-container">
		{#each feedsContent as feed}
			<ul class="feed">
				<h2>{feed.title}</h2>
				{#each feed.items as item}
					<li>
						<a href={item.link}>{item.title}</a>
						<!-- <img src={item.enclosure.url} alt={item.title}> -->
						<!-- <p>{@html item.content}</p> -->
						<!-- <caption>{item.isoDate}</caption> -->
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>

<style>
	/* h1 {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	} */

	/* figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	} */

	/* Styles */
	.container,
	.feed-list,
	.feed {
		display: flex;
	}
	.feed-list,
	.feed {
		padding: 10px;
	}
	.feed-list {
		flex-direction: column;
	}
	.feed-container {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.feed {
		flex: 1;
		flex-direction: column;
		list-style: none;
	}
	.feed h2 {
		font-size: 14px;
		text-transform: uppercase;
	}
	.feed li {
		padding: 12px 0;
		border-bottom: 1px solid rgba(20, 20, 20, 0.08);
	}
	.feed li:before {
		border: 1px solid #ccc;
	}
	.feed li a{
		text-decoration: none ;
		font-family: inconsolata, monospace;
		font-size: 14px;
	}

	@media (min-width: 480px) {
		/* h1 {
			font-size: 4em;
		} */
	}
</style>
