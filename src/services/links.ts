import { USE_MOCKS, apiFetch } from "@/lib/api-client";
import { mockLinks } from "@/lib/mock-data";
import { sleep } from "@/lib/utils";
import { CreatorLink } from "@/types";

let links = [...mockLinks];

export const linksService = {
  async list() {
    if (USE_MOCKS) {
      await sleep(400);
      return { success: true as const, data: [...links].sort((a, b) => a.order - b.order) };
    }
    return apiFetch<CreatorLink[]>("/links");
  },
  async create(input: Omit<CreatorLink, "id" | "creatorId" | "clicks" | "order">) {
    if (USE_MOCKS) {
      await sleep(500);
      const newLink: CreatorLink = { ...input, id: `link_${Date.now()}`, creatorId: "creator_1", clicks: 0, order: links.length };
      links = [...links, newLink];
      return { success: true as const, data: newLink };
    }
    return apiFetch<CreatorLink>("/links", { method: "POST", body: JSON.stringify(input) });
  },
  async update(id: string, patch: Partial<CreatorLink>) {
    if (USE_MOCKS) {
      await sleep(400);
      links = links.map((l) => (l.id === id ? { ...l, ...patch } : l));
      return { success: true as const, data: links.find((l) => l.id === id)! };
    }
    return apiFetch<CreatorLink>(`/links/${id}`, { method: "PATCH", body: JSON.stringify(patch) });
  },
  async remove(id: string) {
    if (USE_MOCKS) {
      await sleep(400);
      links = links.filter((l) => l.id !== id);
      return { success: true as const, data: { id } };
    }
    return apiFetch(`/links/${id}`, { method: "DELETE" });
  },
  async reorder(orderedIds: string[]) {
    if (USE_MOCKS) {
      await sleep(300);
      links = links.map((l) => ({ ...l, order: orderedIds.indexOf(l.id) }));
      return { success: true as const, data: links };
    }
    return apiFetch<CreatorLink[]>("/links/reorder", { method: "POST", body: JSON.stringify({ orderedIds }) });
  },
  async getById(id: string) {
    if (USE_MOCKS) {
      await sleep(300);
      const link = links.find((l) => l.id === id);
      if (!link) return { success: false as const, error: "Link not found." };
      return { success: true as const, data: link };
    }
    return apiFetch<CreatorLink>(`/links/${id}`);
  }
};
