import test from "node:test";
import assert from "node:assert/strict";

import { checkProperty } from "./index.js";

const testObj = {
  id: "00",
  name: "jack",
  gander: "male",
  active: false,
  score: 0,
  profile: null,
  meta: {
    tags: undefined,
  },
  parent: {
    father: {
      id: "01",
      name: "john",
      gander: "male",
    },
    mother: {
      id: "02",
      name: "rose",
    },
  },
};

function assertResult(result, expected) {
  assert.equal(result.type, expected.type);
  assert.equal(result.value, expected.value);
  assert.equal(result.exist_index, expected.exist_index);
}

test("returns the final nested property when the full path exists", () => {
  const result = checkProperty(testObj, ["parent", "father", "name"]);

  assertResult(result, {
    type: "string",
    value: "john",
    exist_index: 2,
  });
});

test("returns the last existing node when the path breaks", () => {
  const result = checkProperty(testObj, ["parent", "brother", "name"]);

  assertResult(result, {
    type: "undefined",
    value: undefined,
    exist_index: 0,
  });
});

test("returns the root object information when properties is empty", () => {
  const result = checkProperty(testObj, []);

  assert.equal(result.type, null);
  assert.equal(result.value, null);
  assert.equal(result.exist_index, -1);
});

test("supports properties whose value is undefined", () => {
  const result = checkProperty(testObj, ["meta", "tags"]);

  assertResult(result, {
    type: "undefined",
    value: undefined,
    exist_index: 1,
  });
});

test("supports properties whose value is null", () => {
  const result = checkProperty(testObj, ["profile"]);

  assertResult(result, {
    type: "object",
    value: null,
    exist_index: 0,
  });
});

test("supports properties whose value is false", () => {
  const result = checkProperty(testObj, ["active"]);

  assertResult(result, {
    type: "boolean",
    value: false,
    exist_index: 0,
  });
});

test("supports properties whose value is 0", () => {
  const result = checkProperty(testObj, ["score"]);

  assertResult(result, {
    type: "number",
    value: 0,
    exist_index: 0,
  });
});

test("throws when properties is not an array", () => {
  assert.throws(() => checkProperty(testObj, "parent"), {
    message: "parent is not an array",
  });
});

test("keeps current behavior when the root object is undefined", () => {
  const result = checkProperty(undefined, ["parent"]);

  assertResult(result, {
    type: "undefined",
    value: undefined,
    exist_index: -1,
  });
});

test("keeps current behavior when the root object is null", () => {
  const result = checkProperty(null, ["parent"]);

  assertResult(result, {
    type: "object",
    value: null,
    exist_index: -1,
  });
});

test("keeps current behavior when the root object is false", () => {
  const result = checkProperty(false, ["parent"]);

  assertResult(result, {
    type: "boolean",
    value: false,
    exist_index: -1,
  });
});

test("keeps current behavior when the root object is 0", () => {
  const result = checkProperty(0, ["parent"]);

  assertResult(result, {
    type: "number",
    value: 0,
    exist_index: -1,
  });
});
