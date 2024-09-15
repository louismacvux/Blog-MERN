const releaseNote = () => {
  return (
    <div>
      <h5 id="version-1-2">Version 1.2</h5>
      <ul>
        <li>Dark Mode enabled follows system preference.</li>
      </ul>
      <h5 id="version-1-1">Version 1.1</h5>
      <ul>
        <li>
          Some new changes including:{" "}
          <ul>
            <li>
              Fix Sidebar layout issue with option sub-menu and refine scrollbar
              behavior.{" "}
            </li>
            <li>
              Add more editing tools, including code format and horizontal
              divider.
            </li>
            <li>Add Shortcut to save note (Ctrl - S). </li>
            <li>Add this very place for Release Note. </li>
          </ul>
        </li>
      </ul>
      <h5 id="version-1-0">Version 1.0</h5>
      <ul>
        <li>First production version</li>
      </ul>
    </div>
  );
};

export default releaseNote;
