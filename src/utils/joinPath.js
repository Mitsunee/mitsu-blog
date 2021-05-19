import { join } from "path";

export default function joinPath(...paths) {
  return join(process.cwd(), ...paths);
}
