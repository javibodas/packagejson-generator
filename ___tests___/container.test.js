import React from "react";
import Container from "components/Container";
import { FormJSONContextProvider } from "context/formJsonContext";
import { TextEditorJSONContextProvider } from "context/textEditorJsonContext";
import { JSON_FILE_OBJECT_DEFAULT } from "context/DEFAULT_PKG_JSON";
import { server } from "./setupWorkerAPI";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "jest-extended";
import preloadAll from "jest-next-dynamic";

/*describe("Container Test", () => {
  const wrapper = ({ children }) => {
    return (
      <TextEditorJSONContextProvider>
        <FormJSONContextProvider>{children}</FormJSONContextProvider>
      </TextEditorJSONContextProvider>
    );
  };

  beforeEach(() => {});
  beforeAll(async () => {
    await preloadAll();
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("When initial load", () => {
    it("should have default context values in form and texteditor", () => {
      render(<Container />, { wrapper });

      Object.keys(JSON_FILE_OBJECT_DEFAULT).map((key) => {
        if (typeof JSON_FILE_OBJECT_DEFAULT[key] === "string") {
          const input = screen.queryByTestId("form-" + key);
          input
            ? expect(input.value).toBe(JSON_FILE_OBJECT_DEFAULT[key])
            : null;
          expect(screen.getByTestId("text-area-editor").textContent).toInclude(
            JSON_FILE_OBJECT_DEFAULT[key]
          );
        }
      });
    });
  });

  describe("When modifying field form", () => {
    const json = {
      authorName: "javi",
      projectName: "packagejson-generator",
      version: "2.3.9",
      description: "Testing packagejson-generator",
      mainFile: "app.js",
    };

    it("should show changes in text editor (author)", () => {
      fireEvent.change(screen.getByTestId("form-author"), {
        target: { value: json.authorName },
      });
      console.log(screen.getByTestId("text-area-editor"));
      expect(screen.getByTestId("text-area-editor").textContent).toInclude(
        json.authorName
      );
    });

    it("should show changes in text editor (project name)", () => {
      fireEvent.change(screen.getByTestId("form-name"), {
        target: { value: json.projectName },
      });
      expect(screen.getByTestId("text-area-editor").textContent).toInclude(
        json.projectName
      );
    });

    it("should show changes in text editor (version)", () => {
      fireEvent.change(screen.getByTestId("form-version"), {
        target: { value: json.version },
      });
      expect(screen.getByTestId("text-area-editor").textContent).toInclude(
        json.version
      );
    });

    it("should show changes in text editor (description)", () => {
      fireEvent.change(screen.getByTestId("form-description"), {
        target: { value: json.description },
      });
      expect(screen.getByTestId("text-area-editor").textContent).toInclude(
        json.description
      );
    });

    it("should show changes in text editor (main)", () => {
      fireEvent.change(screen.getByTestId("form-main"), {
        target: { value: json.mainFile },
      });
      expect(screen.getByTestId("text-area-editor").textContent).toInclude(
        json.mainFile
      );
    });
  });

  describe("When selecting package in dependencies combo ", () => {
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

    it("should add package to dependencies list and text editor content", () => {
      expect(screen.getByTestId("dependencies-list").textContent).toInclude(
        packageName
      );
      expect(screen.getByTestId("text-area-editor").textContent).toInclude(
        packageName
      );
    });
  });

  describe("When adding script in form", () => {
    const scriptKey = "test-jest";
    const scriptvalue = "jest";

    it("should add script to scripts list and text editor content", () => {
      screen.getByTestId("script-key").value = scriptKey;
      screen.getByTestId("script-value").value = scriptvalue;

      fireEvent.click(screen.getByTestId("script-add-btn"));
      expect(screen.getByTestId("scripts-list").textContent).toInclude(
        scriptKey
      );
      expect(screen.getByTestId("scripts-list").textContent).toInclude(
        scriptvalue
      );

      expect(screen.getByTestId("text-area-editor").textContent).toInclude(
        scriptKey
      );
      expect(screen.getByTestId("text-area-editor").textContent).toInclude(
        scriptvalue
      );
    });
  });
});*/
