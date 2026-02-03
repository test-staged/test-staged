import { detect } from 'package-manager-detector/detect';
import { resolveCommand } from 'package-manager-detector/commands';

export async function getPackageManager(cwd: string = process.cwd()) {
  const pm = await detect({ cwd });
  return pm;
}

export { resolveCommand };
