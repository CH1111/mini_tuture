export function isCommitEqual(commitA, commitB) {
  return commitA?.startsWith(commitB) || commitB?.startsWith(commitA);
}
