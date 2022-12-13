import {
  ScrollRise,
} from "../lib/index";

const versionEl = document.getElementById('version');
versionEl!.textContent = ScrollRise.version();
