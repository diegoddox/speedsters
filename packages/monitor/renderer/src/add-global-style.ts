(function createGlobalStyle() {
  const style = document.getElementById('global-style');
  style.innerHTML = `
    * {
      margin: 0;
      padding: 0;
      list-style-type: none;
      font-family: Open sans, Verdana, Geneva, sans-serif;
    }
    
    [class^="icon-"], [class*=" icon-"] {
      height: 1em;
      width: 1em;
      display: inline-flex;
      align-self: center;
      fill: currentColor;
      position: relative;
    }
    
    .icon-top-space {
      top: .125em;
    }
    
    html {
      box-sizing: border-box;
    }

    html, body {
      height: 100%;
      overflow: hidden;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }
  `;
})();