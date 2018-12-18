export default () => (
  <Router>
    <ScrollRestoration>
      <div>
        <h1>App</h1>

        <RestoredScroll id="bunny">
          <div style={{ height: "200px", overflow: "auto" }}>I will overflow</div>
        </RestoredScroll>
      </div>
    </ScrollRestoration>
  </Router>
);