/// <reference path="{%= jsname %}"/>

"use strict";

/* import-block */
import mod = require("{%= jsname %}");
let {%= jsname %} = mod.{%= jsname %};
/* end-import-block */

let {% if (widget) { %}widget{% } else { %}operator{% }%} = new {%= jsname %}();
document.addEventListener("DOMContentLoaded", () => {% if (widget) { %}widget{% } else { %}operator{% }%}.init(), false);
