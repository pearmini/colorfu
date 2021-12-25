export function gotoEditor(router, options, activeType = "pc") {
  localStorage.setItem("cd-example", JSON.stringify(options));
  localStorage.setItem("cd-type", activeType);
  router.push({ path: "editor" });
}
