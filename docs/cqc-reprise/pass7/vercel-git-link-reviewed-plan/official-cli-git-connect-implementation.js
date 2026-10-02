// src/util/git/connect-git-provider.ts
var import_chalk15 = __toESM(require_source(), 1);
import { URL } from "url";

// ../../node_modules/.pnpm/@inquirer+select@2.2.2/node_modules/@inquirer/select/dist/esm/index.mjs
var import_chalk14 = __toESM(require_source3(), 1);
var import_figures3 = __toESM(require_figures(), 1);
var import_ansi_escapes3 = __toESM(require_ansi_escapes(), 1);
var selectTheme = {
  icon: { cursor: import_figures3.default.pointer },
  style: { disabled: (text) => import_chalk14.default.dim(`- ${text}`) }
};
function isSelectable2(item) {
  return !Separator.isSeparator(item) && !item.disabled;
}
var esm_default3 = createPrompt((config, done) => {
  const { choices: items, loop = true, pageSize = 7 } = config;
  const firstRender = useRef(true);
  const theme = makeTheme(selectTheme, config.theme);
  const prefix = usePrefix({ theme });
  const [status, setStatus] = useState("pending");
  const searchTimeoutRef = useRef(void 0);
  const bounds = useMemo(() => {
    const first = items.findIndex(isSelectable2);
    const last = items.length - 1 - [...items].reverse().findIndex(isSelectable2);
    if (first < 0)
      throw new ValidationError("[select prompt] No selectable choices. All choices are disabled.");
    return { first, last };
  }, [items]);
  const defaultItemIndex = useMemo(() => {
    if (!("default" in config))
      return -1;
    return items.findIndex((item) => isSelectable2(item) && item.value === config.default);
  }, [config.default, items]);
  const [active, setActive] = useState(defaultItemIndex === -1 ? bounds.first : defaultItemIndex);
  const selectedChoice = items[active];
  useKeypress((key, rl) => {
    clearTimeout(searchTimeoutRef.current);
    if (isEnterKey(key)) {
      setStatus("done");
      done(selectedChoice.value);
    } else if (isUpKey(key) || isDownKey(key)) {
      rl.clearLine(0);
      if (loop || isUpKey(key) && active !== bounds.first || isDownKey(key) && active !== bounds.last) {
        const offset = isUpKey(key) ? -1 : 1;
        let next = active;
        do {
          next = (next + offset + items.length) % items.length;
        } while (!isSelectable2(items[next]));
        setActive(next);
      }
    } else if (isNumberKey(key)) {
      rl.clearLine(0);
      const position = Number(key.name) - 1;
      const item = items[position];
      if (item != null && isSelectable2(item)) {
        setActive(position);
      }
    } else if (isBackspaceKey(key)) {
      rl.clearLine(0);
    } else {
      const searchTerm = rl.line.toLowerCase();
      const matchIndex = items.findIndex((item) => {
        if (Separator.isSeparator(item) || !isSelectable2(item))
          return false;
        return String(item.name || item.value).toLowerCase().startsWith(searchTerm);
      });
      if (matchIndex >= 0) {
        setActive(matchIndex);
      }
      searchTimeoutRef.current = setTimeout(() => {
        rl.clearLine(0);
      }, 700);
    }
  });
  const message = theme.style.message(config.message);
  let helpTip;
  if (firstRender.current && items.length <= pageSize) {
    firstRender.current = false;
    helpTip = theme.style.help("(Use arrow keys)");
  }
  const page = usePagination({
    items,
    active,
    renderItem({ item, isActive }) {
      if (Separator.isSeparator(item)) {
        return ` ${item.separator}`;
      }
      const line = item.name || item.value;
      if (item.disabled) {
        const disabledLabel = typeof item.disabled === "string" ? item.disabled : "(disabled)";
        return theme.style.disabled(`${line} ${disabledLabel}`);
      }
      const color = isActive ? theme.style.highlight : (x) => x;
      const cursor = isActive ? theme.icon.cursor : ` `;
      return color(`${cursor} ${line}`);
    },
    pageSize,
    loop,
    theme
  });
  if (status === "done") {
    const answer = selectedChoice.name || // TODO: Could we enforce that at the type level? Name should be defined for non-string values.
    String(selectedChoice.value);
    return `${prefix} ${message} ${theme.style.answer(answer)}`;
  }
  const choiceDescription = selectedChoice.description ? `
${selectedChoice.description}` : ``;
  return `${[prefix, message, helpTip].filter(Boolean).join(" ")}
${page}${choiceDescription}${import_ansi_escapes3.default.cursorHide}`;
});

// src/util/input/list.ts
var import_strip_ansi2 = __toESM(require_strip_ansi(), 1);
function getLength(input) {
  let biggestLength = 0;
  for (const line of input.split("\n")) {
    const str = (0, import_strip_ansi2.default)(line);
    if (str.length > biggestLength) {
      biggestLength = str.length;
    }
  }
  return biggestLength;
}
async function list(client, {
  message = "the question",
  // eslint-disable-line no-unused-vars
  choices: _choices = [
    {
      name: "something\ndescription\ndetails\netc",
      value: "something unique",
      short: "generally the first line of `name`"
    }
  ],
  pageSize = 15,
  // Show 15 lines without scrolling (~4 credit cards)
  separator = false,
  // Puts a blank separator between each choice
  cancel = "end",
  // Whether the `cancel` option will be at the `start` or the `end`,
  eraseFinalAnswer = false
  // If true, the line with the final answer that inquirer prints will be erased before returning
}) {
  let biggestLength = 0;
  let selected;
  for (const choice of _choices) {
    if ("name" in choice) {
      const length = getLength(choice.name);
      if (length > biggestLength) {
        biggestLength = length;
      }
    }
  }
  const choices = _choices.map((choice) => {
    if (choice instanceof Separator) {
      return choice;
    }
    if ("separator" in choice) {
      const prefix = `\u2500\u2500 ${choice.separator} `;
      const suffix = "\u2500".repeat(biggestLength - getLength(prefix));
      return new Separator(`${prefix}${suffix}`);
    }
    if ("short" in choice) {
      if (choice.selected) {
        if (selected)
          throw new Error("Only one choice may be selected");
        selected = choice.short;
      }
      return choice;
    }
    throw new Error("Invalid choice");
  });
  if (separator) {
    for (let i = 0; i < choices.length; i += 2) {
      choices.splice(i, 0, new Separator(" "));
    }
  }
  const cancelSeparator = new Separator("\u2500".repeat(biggestLength));
  const _cancel = {
    name: "Cancel",
    value: "",
    short: ""
  };
  if (cancel === "start") {
    choices.unshift(_cancel, cancelSeparator);
  } else {
    choices.push(cancelSeparator, _cancel);
  }
  const answer = await client.input.select({
    message,
    choices,
    pageSize,
    default: selected
  });
  if (eraseFinalAnswer === true) {
    process.stdout.write(eraseLines(2));
  }
  return answer;
}

// src/util/git/connect-git-provider.ts
async function disconnectGitProvider(client, org, projectId) {
  const fetchUrl = `/v9/projects/${projectId}/link`;
  return client.fetch(fetchUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
async function connectGitProvider(client, projectId, type, repo) {
  const fetchUrl = `/v9/projects/${projectId}/link`;
  try {
    return await client.fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        repo
      })
    });
  } catch (err) {
    const apiError = isAPIError(err);
    if (apiError && (err.action === "Install GitHub App" || err.code === "repo_not_found")) {
      output_manager_default.error(
        `Failed to connect ${import_chalk15.default.cyan(
          repo
        )} to project. Make sure there aren't any typos and that you have access to the repository if it's private.`
      );
    } else if (apiError && err.action === "Add a Login Connection") {
      output_manager_default.error(
        err.message.replace(repo, import_chalk15.default.cyan(repo)) + `
Visit ${link_default(err.link)} for more information.`
      );
    } else {
      output_manager_default.error(
        `Failed to connect the ${formatProvider(
          type
        )} repository ${repo}.
${err}`
      );
    }
    return 1;
  }
}
