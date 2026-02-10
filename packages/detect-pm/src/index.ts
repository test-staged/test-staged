export async function getPackageManager(cwd: string = process.cwd()) {
  const { detect } = await import('package-manager-detector/detect');
  const pm = await detect({ cwd });
  return pm;
}

export async function resolveCommand(...args: any[]) {
  const { resolveCommand } = await import('package-manager-detector/commands');
  // @ts-ignore
  return resolveCommand(...args);
}
