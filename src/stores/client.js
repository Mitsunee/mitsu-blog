import { createStore } from "nanostores";

export const clientStore = createStore(() => {
  try {
    clientStore.set({
      width: window.innerWidth,
      height: window.innerHeight
    });
  } catch {
    clientStore.set({
      width: 0,
      height: 0
    });
  }
});

function updateClient() {
  try {
    clientStore.set({
      width: window.innerWidth,
      height: window.innerHeight
    });
  } catch {
    // do nothing on server
  }
}

try {
  window.addEventListener("resize", updateClient);
  updateClient();
} catch {
  // do nothing on server
}
