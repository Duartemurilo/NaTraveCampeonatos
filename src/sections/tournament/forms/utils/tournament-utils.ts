export function isPowerOfTwo(n: number): boolean {
  return n > 0 && Number.isInteger(Math.log2(n));
}

export function getValidGroupCounts(totalTeams: number): number[] {
  const validGroupCounts: number[] = [];
  for (let groupCount = 2; groupCount <= totalTeams; groupCount++) {
    if (totalTeams % groupCount !== 0) continue;
    const teamsPerGroup = totalTeams / groupCount;
    if (teamsPerGroup < 2) continue;
    let hasValid = false;
    for (let adv = 1; adv <= teamsPerGroup; adv++) {
      const totalClassified = groupCount * adv;
      if (isPowerOfTwo(totalClassified)) {
        hasValid = true;
        break;
      }
    }
    if (hasValid) validGroupCounts.push(groupCount);
  }
  return validGroupCounts;
}

export function getValidAdvancingPerGroupOptions(
  totalTeams: number,
  selectedGroupCount: number | null
): number[] {
  if (selectedGroupCount === null || totalTeams % selectedGroupCount !== 0) return [];

  const teamsPerGroup = totalTeams / selectedGroupCount;
  const validOptions: number[] = [];

  for (let adv = 1; adv <= teamsPerGroup; adv++) {
    const totalClassified = selectedGroupCount * adv;
    if (isPowerOfTwo(totalClassified)) validOptions.push(adv);
  }

  return validOptions;
}
