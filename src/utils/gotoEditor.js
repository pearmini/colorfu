export function gotoEditor(router, options) {
  localStorage.setItem("cd-example", JSON.stringify(options));
  router.push({ path: "editor" });
}
