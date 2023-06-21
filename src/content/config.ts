import { defineCollection } from "astro:content";

const projectCollection = defineCollection({ type: "data" });

export const collections = {
  "project": projectCollection,
}