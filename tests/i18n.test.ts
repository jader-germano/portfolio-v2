import test from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_LOCALE, getDictionary, resolveLocale } from "../lib/i18n";

test("resolveLocale falls back to english", () => {
  assert.equal(resolveLocale("pt"), "pt");
  assert.equal(resolveLocale("en"), "en");
  assert.equal(resolveLocale("es"), DEFAULT_LOCALE);
  assert.equal(resolveLocale(null), DEFAULT_LOCALE);
});

test("getDictionary returns localized navigation labels", () => {
  assert.equal(getDictionary("en").nav.items.instances, "Instances");
  assert.equal(getDictionary("pt").nav.items.instances, "Instâncias");
});

test("critical homepage copy stays aligned with the selected locale", () => {
  const englishDictionary = getDictionary("en");
  const portugueseDictionary = getDictionary("pt");

  assert.equal(englishDictionary.hero.eyebrow, "Senior Full-Stack Engineer");
  assert.equal(englishDictionary.skills.title, "Skills");
  assert.equal(englishDictionary.login.title, "Access Hub");
  assert.equal(englishDictionary.experience.items[0].period, "2026 – Present");

  assert.equal(portugueseDictionary.hero.eyebrow, "Engenheiro Full-Stack Sênior");
  assert.equal(portugueseDictionary.skills.title, "Competências");
  assert.equal(portugueseDictionary.login.title, "Central de Acesso");
  assert.equal(portugueseDictionary.experience.items[0].period, "2026 – Atual");
  assert.equal(portugueseDictionary.knowledgeVault.explore, "Explorar Base");
});
