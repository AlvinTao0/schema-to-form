import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest"
import { runValidator } from './util'

describe("util.js", () => {
  test("regex pattern pass", () => {
    const res = runValidator('pattern', '^test$', 'test', 'name')
    expect(res).toBe(false)
  })
  test("regex pattern not pass", () => {
    const res = runValidator('pattern', '^test$', 'test2', 'name')
    expect(res).not.toBe(false)
  })
});
