import React from "react";
import Form from "components/Form";
import { FormJSONContextProvider } from "context/formJsonContext";
import { TextEditorJSONContextProvider } from "context/textEditorJsonContext";
import { JSON_FILE_OBJECT_DEFAULT } from "context/DEFAULT_PKG_JSON";
import { server } from "./setupWorkerAPI";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "jest-extended";

describe("Form Test", () => {
  const wrapper = ({ children }) => {
    return (
      <TextEditorJSONContextProvider>
        <FormJSONContextProvider>{children}</FormJSONContextProvider>
      </TextEditorJSONContextProvider>
    );
  };

  beforeEach(() => render(<Form />, { wrapper }));
  beforeAll(async () => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("When initial load", () => {
    it("should have default context values", () => {
      Object.keys(JSON_FILE_OBJECT_DEFAULT).map((key) => {
        if (typeof JSON_FILE_OBJECT_DEFAULT[key] === "string") {
          const input = screen.queryByTestId("form-" + key);
          input
            ? expect(input.value).toBe(JSON_FILE_OBJECT_DEFAULT[key])
            : null;
        }
      });
    });
  });

  describe("When writing text in dependencie field", () => {
    const packageName = "react";

    it("should appear dependencies list", async () => {
      fireEvent.change(screen.getByTestId("input-dependencies"), {
        target: { value: packageName },
      });

      await waitFor(() => {
        expect(screen.queryByTestId("dependencies-list-item")).toBeDefined();
      });
    });
  });

  describe("When selecting package in dependencies combo", () => {
    const packageName = "react";

    beforeEach(async () => {
      fireEvent.change(screen.getByTestId("input-dependencies"), {
        target: { value: packageName },
      });

      await waitFor(() => {
        expect(screen.queryByTestId("dependencies-list-item")).toBeDefined();
        fireEvent.click(screen.getByTestId("dependencies-list-item"), {
          target: { innerText: packageName },
        });
      });
    });

    it("should add package to dependencies list", () => {
      expect(screen.getByTestId("dependencies-list").textContent).toInclude(
        packageName
      );
    });
  });

  describe("When adding script in form", () => {
    const scriptKey = "test-jest";
    const scriptvalue = "jest";

    it("should add script to scripts list", () => {
      screen.getByTestId("script-key").value = scriptKey;
      screen.getByTestId("script-value").value = scriptvalue;

      fireEvent.click(screen.getByTestId("script-add-btn"));
      expect(screen.getByTestId("scripts-list").textContent).toInclude(
        scriptKey
      );
      expect(screen.getByTestId("scripts-list").textContent).toInclude(
        scriptvalue
      );
    });
  });
});
