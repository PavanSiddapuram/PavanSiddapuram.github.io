export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  description: string;
  body: string; // HTML
};

export const POSTS: BlogPost[] = [
  {
    slug: "rag-that-refuses",
    title: "Why I built a RAG system that refuses to answer",
    date: "2026-03-14",
    dateLabel: "Mar 2026",
    description: "On choosing silence over confident wrongness.",
    body: `
<p>Most retrieval-augmented systems treat the retriever as a hint and the language model as a writer. The retriever returns its best guess, the model dresses it up, and what comes out the other side is fluent, confident, and — disturbingly often — wrong.</p>
<p>I wanted the opposite. I wanted a system that, when its retriever cannot find anything sufficiently close to the question, simply says so. <em>HonestRAG</em> is the result.</p>
<h2>The threshold</h2>
<p>The mechanism is unglamorous. Each query is embedded, the top-<em>k</em> chunks are returned with their cosine similarities, and a single number — the maximum similarity score — is compared against a threshold. Below the threshold, generation never runs.</p>
<blockquote>The model never sees the prompt. It cannot hallucinate what it is not asked.</blockquote>
<p>This sounds trivial. In practice, choosing the threshold is the entire problem. Too low and the system answers from noise; too high and it refuses queries it could have handled. I tuned mine against a small set of <strong>golden test cases</strong> — questions I knew the corpus could answer and questions I knew it couldn't — and watched precision and recall trade against each other.</p>
<h2>What refusal sounds like</h2>
<p>The refusal message matters. "I don't know" is honest but unhelpful. "I don't have enough information about <em>X</em> in my sources" is better — it tells the user what failed.</p>
<pre><code>if max_similarity &lt; THRESHOLD:
    return refuse(query, top_chunks)
else:
    return generate(query, top_chunks)</code></pre>
<p>Five lines. The whole system pivots on them.</p>
<h2>What I learned</h2>
<p>People prefer being told "I don't know" to being told something false. This is obvious in the abstract and somehow controversial in the LLM industry. The discomfort, I think, is that refusal feels like a product failure. It isn't. A refusal is a calibrated estimate of confidence rendered as text. That is a feature.</p>
<p>The interesting failure mode is the <em>almost-relevant</em> chunk — the document that talks about the right entity but the wrong attribute. Threshold gating doesn't catch these; you need an additional check, often another model call, to verify alignment between question and evidence. I'm still working on that part.</p>
<p>For now: if you ask HonestRAG something it doesn't know, it will tell you. I find this restful.</p>
`,
  },
  {
    slug: "csg-in-the-browser",
    title: "CSG in the browser: a field report",
    date: "2026-02-08",
    dateLabel: "Feb 2026",
    description: "Booleans are easy until they aren't.",
    body: `
<p>Constructive solid geometry is one of those topics that looks settled in the textbook and falls apart the instant you try to ship it. Union, intersection, difference — three operations on watertight meshes. How hard could it be?</p>
<h2>The honest answer</h2>
<p>Hard. Real meshes are not watertight. Vertices that should coincide miss each other by the seventh decimal place. Coplanar faces produce degenerate triangles. The <em>epsilon</em> you pick to consider two points equal is the most consequential constant in the codebase.</p>
<p>For our 3D CAD platform we needed booleans that ran in the browser, on user-supplied STL files, at interactive rates. The constraints made the choice obvious: no server round-trip, no native binaries, no waiting.</p>
<h2>BVH or bust</h2>
<p>The naive algorithm is <em>O(n²)</em> in triangle pairs. For meshes with hundreds of thousands of triangles this is a non-starter. A bounding volume hierarchy collapses it to something tractable — usually <em>O(n log n)</em> for the broad phase — and lets you skip past the 99% of triangle pairs that obviously do not intersect.</p>
<blockquote>The BVH is not an optimization. It is the only reason the feature exists.</blockquote>
<h2>Decimation, in three stages</h2>
<p>Even with fast booleans, the resulting mesh is often absurd: two million triangles where fifty thousand would suffice. We decimate in three passes — quadric error metric for the bulk reduction, edge collapse for topology preservation, and a final cleanup pass that welds near-coincident vertices and removes degenerate faces.</p>
<p>The visible difference between 2M triangles and 50K, after decimation, is essentially zero. The performance difference is everything.</p>
<h2>Workers, and the cost of copying</h2>
<p>Booleans block the main thread. So we run them in a Web Worker. But the obvious approach — <code>postMessage</code> with the mesh data — copies the buffer, which for large meshes costs more than the boolean itself.</p>
<p>The fix is <code>Transferable</code> objects. You hand the buffer to the worker and lose access to it on the main thread. Zero copy, instant transfer. The mental model is unfamiliar — JavaScript developers are not used to ownership — but once you internalize it, the rest of the architecture follows.</p>
<p>We hold 60fps on meshes that, a year ago, would have crashed the tab.</p>
`,
  },
  {
    slug: "software-that-touches-atoms",
    title: "On building software that touches atoms",
    date: "2026-01-19",
    dateLabel: "Jan 2026",
    description: "When the bug is also a physical object.",
    body: `
<p>For most of my career, the worst case of a bug was a stack trace. A user saw the wrong number; a service returned a 500; an email went to the wrong address. Bad, sometimes embarrassing, almost always reversible.</p>
<p>Then I started writing software that drives 3D printers.</p>
<h2>The new failure mode</h2>
<p>A bug in slicer software is not a stack trace. It is a piece of plastic. It is six hours of machine time, a kilogram of filament, and a part that doesn't fit. The bug exists in the world.</p>
<blockquote>You cannot <code>git revert</code> an extruded layer.</blockquote>
<p>This changes how you write code. Defensive programming stops being a style and becomes a requirement. Every input is checked twice. Every transformation is reversible. The undo stack is sacred.</p>
<h2>The slowness of physics</h2>
<p>Software developers are used to feedback loops measured in milliseconds. Hardware feedback loops are measured in hours. You ship a fix, you start a print, you wait. If the fix was wrong, you find out tomorrow.</p>
<p>The discipline this imposes is — eventually — clarifying. You write more carefully because the cost of carelessness is higher. You read your own code as if a stranger wrote it, because by the time the print finishes, you might as well be a stranger.</p>
<h2>Respect for the medium</h2>
<p>What I did not expect was the <em>respect</em> that this kind of work induces. Bits are infinitely malleable; atoms are not. When your software shapes something physical, you cannot indulge the usual habits — moving fast, breaking things, fixing forward.</p>
<p>You learn, instead, to slow down. To consider. To ship less and verify more. The constraint is, in its way, a gift.</p>
`,
  },
  {
    slug: "zero-copy-and-respect-for-memory",
    title: "Zero-copy transfers and what they taught me about respect for memory",
    date: "2025-12-22",
    dateLabel: "Dec 2025",
    description: "An unexpected lesson in ownership from JavaScript.",
    body: `
<p>JavaScript is the language that taught a generation of developers not to think about memory. The garbage collector handles it; the engine handles it; you, the developer, are free to allocate with abandon. This is mostly a gift. Occasionally it is a curse.</p>
<h2>Where the abstraction breaks</h2>
<p>The abstraction breaks the moment your buffer is large enough that copying it costs real time. A 200MB <code>ArrayBuffer</code> sent to a Web Worker via the default <code>postMessage</code> path is serialized, copied, and deserialized. On modern hardware, this is on the order of fifty milliseconds. For interactive software at 60fps, you have sixteen.</p>
<p>The escape hatch is the <em>Transferable</em> protocol. You pass the buffer in the second argument of <code>postMessage</code>:</p>
<pre><code>worker.postMessage({ buffer }, [buffer]);</code></pre>
<p>The buffer is now owned by the worker. The main thread's reference is detached — its <code>byteLength</code> is zero, and any read returns nothing. The transfer itself is, effectively, free.</p>
<h2>The lesson</h2>
<blockquote>To pass cheaply, you must give up the right to use again.</blockquote>
<p>This is the first time I have written JavaScript and felt the language pushing me toward Rust's notion of ownership. Only one place can own the buffer. The system enforces it. If you want to share, you copy; if you want to move, you transfer.</p>
<h2>Why it matters beyond performance</h2>
<p>The performance benefit is the obvious story. The deeper benefit is architectural. Once you start thinking in terms of ownership, the data flow of your application becomes legible in a way it wasn't before. You stop asking "who has a reference to this?" and start asking "who owns this?" — and the answer is always exactly one party.</p>
<p>I now design my workers as if they were small services. They take ownership of their inputs, do their work, and transfer ownership of their outputs back. The main thread orchestrates; it does not share.</p>
<p>Memory, it turns out, deserves respect — even in a language that pretends otherwise.</p>
`,
  },
];
