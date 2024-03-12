function clickWithKeymap (e: KeyboardEvent) {
  const hasFocusOnInput = document.activeElement instanceof HTMLInputElement

  if (hasFocusOnInput || !e.shiftKey) {
    return
  }

  const el = document.querySelector(`[data-keymap="${e.key}"]`)

  const elIsClickable =
      el instanceof HTMLAnchorElement ||
      el instanceof HTMLButtonElement

  if (!elIsClickable) {
    return
  }

  el.click()
}

export function bindKeymapFunctionality () {
  window.addEventListener('keypress', clickWithKeymap)
}
