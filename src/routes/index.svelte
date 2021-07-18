<script>
	import { onMount } from "svelte";
	import error from "images/tenor.gif";

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

	//Handle Img Error
	function handleImgError() {
		this.src = error;
	}
</script>

<svelte:head>
	<title>Sapper RSS Reader</title>
</svelte:head>

<div class="container">
	<div class="feed-container">
		{#each feedsContent as feed}
			<div class="feed">
				<h2>{feed.title}</h2>
				<ul>
					{#each feed.items as item}
						<li>
							<a href={item.link} target="_blank">{item.title}<span class="arrow"/></a>

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

<style>
	/* Styles */
	.container,
	.feed {
		display: flex;
	}
	.feed {
		margin-top: 0;
		margin-bottom: 2em;
		padding: 10px;
	}

	.feed-container {
		width: 100%;
	}
	.feed {
		display: flex;
		flex-direction: column;
	}
	.feed h2 {
		font-size: 14px;
		text-transform: uppercase;
	}
	.feed ul {
		list-style: none;
		column-count: 2;
		padding: 0;
		column-gap: 32px;
		/* height: 60vh; */
	}
	.feed li {
		padding: 12px 0;
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
		font-size: 14px;
		flex: 1;
		color: #2b2b2b;
		transform: color .3s ease;
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
		opacity: .5;
	}

	.feed li a:hover .arrow:before {
		right: -28px;
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
		right: -28px;
		/* right: -30px; */
	}

	@media (min-width: 480px) {
	}
</style>
