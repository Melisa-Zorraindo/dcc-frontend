<script lang="ts">
  import { enhance } from "$app/forms";
  let { form } = $props();

  let dismissed = $state(false);
  let copied = $state(false);

  let firstError = $derived.by(() => {
    if (!form || form.success || !form.errors) return undefined;
    const entry = Object.entries(form.errors)[0];
    return entry ? `${entry[0]} ${entry[1]}` : undefined;
  });

  async function copyKey() {
    await navigator.clipboard.writeText(form.key);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<svelte:head>
  <title>Dungeon Crawler Carl - Reference Dictionary</title>
  <meta
    name="description"
    content="A REST API for Dungeon Crawler Carl books, characters and references."
  />
</svelte:head>

<div class="min-h-screen bg-white font-sans leading-relaxed text-[#14181f]">
  <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
    <span class="font-bold tracking-tight">
      &#9670; Sinistris
      <small class="ml-1 font-normal text-gray-500">Archives</small>
    </span>
    <a
      href="http://localhost:8080/swagger-ui/index.html"
      class="text-sm text-[#14181f] no-underline hover:text-[#c62828]">Docs</a
    >
  </nav>

  <header class="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
    <p
      class="mb-6 inline-block rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500"
    >
      Free to use
    </p>
    <h1
      class="text-4xl leading-[1.08] font-bold tracking-tighter sm:text-5xl md:text-6xl"
    >
      Dungeon Crawler Carl - Reference Dictionary
    </h1>
    <p class="mx-auto mt-6 max-w-xl text-lg text-gray-600">
      One simple API for every book, character and reference in the series.
      Fast, reliable and entirely free of consequences.*
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <a
        href="#key"
        class="rounded-lg border border-[#14181f] bg-[#14181f] px-6 py-3 text-sm font-semibold text-white no-underline transition hover:border-[#c62828] hover:bg-[#c62828]"
      >
        Get an API key
      </a>
      <a
        href="http://localhost:8080/swagger-ui/index.html"
        class="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-[#14181f] no-underline transition hover:border-[#c62828] hover:bg-[#c62828] hover:text-white"
      >
        Read the docs
      </a>
    </div>
    <p class="mt-4 text-[0.7rem] text-gray-400">
      *Sinistris Archives is not liable for consequences.
    </p>
  </header>

  <main>
    <section class="mx-auto max-w-5xl px-6 py-14">
      <h2 class="mb-5 text-3xl font-bold tracking-tight">
        Built for scale. Built to keep you here.
      </h2>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article class="rounded-xl border border-gray-200 p-6">
          <h3 class="mb-1 font-bold">References</h3>
          <p class="text-gray-600">
            Every song, brand and pop-culture nod in the series, catalogued.
            Some were funnier before the apocalypse.
          </p>
        </article>
        <article class="rounded-xl border border-gray-200 p-6">
          <h3 class="mb-1 font-bold">Characters</h3>
          <p class="text-gray-600">
            Searchable and filterable. Some are still alive.
          </p>
        </article>
        <article class="rounded-xl border border-gray-200 p-6">
          <h3 class="mb-1 font-bold">Books</h3>
          <p class="text-gray-600">
            The full catalogue, every floor, always up to date.
          </p>
        </article>
      </div>
    </section>

    <section
      class="mx-auto grid max-w-5xl items-center gap-8 px-6 py-14 md:grid-cols-2"
    >
      <div>
        <h2 class="mb-5 text-3xl font-bold tracking-tight">Simple by design</h2>
        <p class="text-gray-600">
          One header. JSON in, JSON out. Limits are generous: 5 requests per
          minute and 200 per day. We do not notice if you exceed them. We do
          notice.
        </p>
      </div>
      <pre
        class="overflow-x-auto rounded-xl bg-[#14181f] p-5 font-mono text-sm text-emerald-200">GET /api/characters?name=donut
X-API-Key: your-key-here

200 OK</pre>
    </section>

    <section id="key" class="relative mx-auto max-w-5xl px-6 py-14">
      <div class="rounded-2xl bg-[#f8f9fb] px-6 py-14 text-center">
        <h2 class="mb-5 text-3xl font-bold tracking-tight">
          Start in under a minute
        </h2>
        <p class="mb-6 text-gray-600">
          Enter your email to get an API key. No payment required. The terms
          below are another matter.
        </p>

        <form
          method="POST"
          action="/"
          class="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          use:enhance={() => {
            dismissed = false; // reopen the popup for each new submission
          }}
        >
          <label for="email" class="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autocomplete="email"
            placeholder="you@example.com"
            class="w-full flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#c62828] focus:outline-none"
          />
          <button
            type="submit"
            class="cursor-pointer rounded-lg border border-[#14181f] bg-[#14181f] px-6 py-3 text-sm font-semibold whitespace-nowrap text-white transition hover:border-[#c62828] hover:bg-[#c62828]"
          >
            Get an API key
          </button>
        </form>
      </div>

      {#if form && !dismissed}
        <div
          class="absolute inset-x-6 inset-y-14 z-10 flex items-center justify-center rounded-2xl bg-white/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-live="polite"
        >
          <div
            class="w-full max-w-md rounded-xl border bg-white p-6 text-left shadow-lg
      {form.success ? 'border-gray-200' : 'border-red-300'}"
          >
            {#if form.success}
              <h3 class="mb-2 font-bold">Your API key</h3>
              <div class="flex items-center gap-2">
                <code
                  class="flex-1 overflow-x-auto rounded-lg bg-[#14181f] px-3 py-2 font-mono text-sm text-emerald-200"
                >
                  {form.key}
                </code>
                <button
                  type="button"
                  onclick={copyKey}
                  class="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold hover:border-[#c62828] hover:bg-[#c62828] hover:text-white"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p class="mt-3 text-sm text-gray-600">
                Copy this key and store it somewhere safe. It cannot be
                retrieved again.
              </p>
            {:else}
              <h3 class="mb-2 font-bold text-[#c62828]">
                Something went wrong
              </h3>
              <p class="text-sm text-gray-600">
                {form.message}{#if firstError}: &nbsp;{firstError}{/if}
              </p>
            {/if}

            <button
              type="button"
              onclick={() => (dismissed = true)}
              class="mt-4 cursor-pointer rounded-lg border border-[#14181f] bg-[#14181f] px-4 py-2 text-sm font-semibold text-white hover:border-[#c62828] hover:bg-[#c62828]"
            >
              Close
            </button>
          </div>
        </div>
      {/if}
    </section>

    <section class="mx-auto max-w-5xl px-6 pt-8 pb-14 font-elite">
      <h4 class="mb-1 text-[0.7rem] tracking-widest text-gray-400 uppercase">
        Terms &amp; Conditions
      </h4>
      <p class="text-[0.62rem] leading-snug text-zinc-400">
        By clicking any button on this page you acknowledge that you have read,
        understood and surrendered all rights under Section 14(b). Your API key
        remains the property of Sinistris Archives Ltd. Sinistris may reassign,
        revoke or relocate you to a lower floor without notice. Reading these
        terms is optional. Not reading them is also optional. Past performance
        is not an indicator of survival.
      </p>
    </section>
  </main>

  <footer
    class="mx-auto max-w-5xl border-t border-gray-200 px-6 py-8 text-center text-sm"
  >
    <p>
      <strong>Melisa Zorraindo</strong> &lt;/backend developer&gt; &middot;
      <a href="mailto:melisa@example.com" class="text-[#c62828]"
        >melisazorraindo@gmail.com</a
      >
    </p>
    <p class="mt-1 text-xs text-gray-400 font-elite">
      Unofficial fan project, not affiliated with the author or any corporation,
      intergalactic or otherwise.
    </p>
  </footer>
</div>
