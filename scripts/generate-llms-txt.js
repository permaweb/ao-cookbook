import fs from "fs";
import path from "path";
import { globby } from "globby";
import { fileURLToPath } from "url";

// Determine if this script is being run directly

async function generateLLMsFull() {
  // Output to public directory instead of dist
  const baseOutDir = "./src/public";

  // Define languages including English as default
  const languages = ["en", "zh", "ja"];

  // Define content categories with simpler focus
  const contentCategories = {
    references: {
      pattern: /\/references\//i,
      importance: "high",
      description: "API and function references",
    },
    releasenotes: {
      pattern: /\/releasenotes\//i,
      importance: "high",
      description: "Release notes and changelogs",
    },
  };

  try {
    for (const lang of languages) {
      // Set the subdirectory and ignore patterns based on language
      let subdir, ignorePatterns;
      if (lang === "en") {
        subdir = "./src";
        // For English, ignore other language directories and common directories
        ignorePatterns = [
          "**/node_modules/**",
          "**/dist/**",
          "./src/zh/**",
          "./src/ja/**",
          "./src/.vitepress/**",
          "./src/public/**",
        ];
      } else {
        subdir = `./src/${lang}`;
        ignorePatterns = ["**/node_modules/**", "**/dist/**"];
      }

      // Find all markdown files for the directory listing
      const allMdFiles = await globby(`${subdir}/**/*.md`, {
        cwd: process.cwd(),
        ignore: ignorePatterns,
      });

      // Find markdown files only in references and releasenotes directories for detailed content
      const refAndReleaseFiles = await globby(
        [`${subdir}/references/**/*.md`, `${subdir}/releasenotes/**/*.md`],
        {
          cwd: process.cwd(),
          ignore: ignorePatterns,
        },
      );

      // If no files found for this language, skip to next language
      if (refAndReleaseFiles.length === 0) {
        continue;
      }

      // Sort files for consistent output
      const sortedFiles = refAndReleaseFiles.sort();

      // Group files by content category
      const categorizedFiles = {};

      for (const [category, info] of Object.entries(contentCategories)) {
        categorizedFiles[category] = sortedFiles.filter((file) =>
          info.pattern.test(file),
        );
      }

      // Prepare directory for language
      const langOutDir =
        lang === "en" ? baseOutDir : path.join(baseOutDir, lang);
      if (!fs.existsSync(langOutDir)) {
        fs.mkdirSync(langOutDir, { recursive: true });
      }

      // Create a single content file with all references and release notes
      let fullContent = `# ${lang.toUpperCase()} Technical Documentation\n\n`;
      fullContent += `Generated: ${new Date().toISOString()}\n\n`;
      fullContent += `This file contains technical reference documentation and release notes.\n\n`;

      // Create the LLMs file with structured content and comprehensive directory
      let llmsContent = `# ${lang.toUpperCase()} Documentation for LLMs\n\n`;
      llmsContent += `Generated: ${new Date().toISOString()}\n\n`;
      llmsContent += `This file contains structured reference documentation, release notes, and a comprehensive directory of all documentation pages.\n\n`;

      // Generate the comprehensive directory listing
      const { directoryStructure, nonEmptyFileCount } =
        generateDirectoryListing(allMdFiles, lang);
      llmsContent += `# Documentation Directory\n\n`;
      llmsContent += directoryStructure;
      llmsContent += `\n\n`;

      // Add table of contents for reference and release notes
      llmsContent += `# Detailed Content\n\n`;
      llmsContent += `## TABLE OF CONTENTS\n\n`;

      let totalFilesProcessed = 0;
      const tocEntries = [];

      // Process each category and add to the content files
      for (const [category, files] of Object.entries(categorizedFiles)) {
        if (files.length === 0) continue;

        // Add category header to full content
        fullContent += `\n\n# ${contentCategories[category].description.toUpperCase()}\n\n`;

        // Add category header to LLMs content
        const categoryHeader = `${contentCategories[category].description.toUpperCase()}`;
        llmsContent += `\n\n## ${categoryHeader}\n\n`;
        tocEntries.push(categoryHeader);

        // Process each file in the category
        for (const file of files) {
          try {
            const content = fs.readFileSync(file, "utf8");

            // Process content - remove frontmatter and image references
            let processedContent = content
              .replace(/^---\n([\s\S]*?)\n---\n/, "")
              .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
              .trim();

            // Skip if no useful content was extracted
            if (!processedContent.trim()) {
              continue;
            }

            // Try to extract a title from the document
            let title = path.basename(file, ".md");
            const titleMatch = processedContent.match(/^# (.*?)$/m);
            if (titleMatch) {
              title = titleMatch[1];
              // Remove the title from the content since we'll add it with our formatting
              processedContent = processedContent.replace(/^# .*$/m, "").trim();
            }

            // Extract a summary for LLMs file
            const summary = extractSummary(processedContent);

            // Create HTML URL for source reference
            let relativePath = file;
            if (lang === "en") {
              relativePath = file.replace(/^\.\/src\//, "");
            } else {
              relativePath = file.replace(new RegExp(`^\\./src/${lang}/`), "");
            }
            const htmlPath = relativePath.replace(/\.md$/, ".html");
            const sourceUrl =
              lang === "en"
                ? `https://cookbook_ao.arweave.net/${htmlPath}`
                : `https://cookbook_ao.arweave.net/${lang}/${htmlPath}`;

            // Add to the full content with clear section delimiters
            fullContent += `\n\n## ${title}\n`;
            fullContent += `Source: ${sourceUrl}\n\n`;
            fullContent += processedContent;

            // Add the title to table of contents
            tocEntries.push(`  - ${title}`);

            // Add structured content to LLMs file
            llmsContent += `\n\n### ${title}\n`;
            llmsContent += `Source: ${sourceUrl}\n\n`;

            // For reference files, extract and format key information
            if (category === "references") {
              const apiInfo = extractAPIInfo(processedContent);
              llmsContent += apiInfo.length > 0 ? apiInfo : summary;
            }
            // For release notes, extract version and key points
            else if (category === "releasenotes") {
              const releaseInfo = extractReleaseInfo(processedContent, title);
              llmsContent += releaseInfo.length > 0 ? releaseInfo : summary;
            }

            totalFilesProcessed++;
          } catch (err) {
            console.warn(
              `Warning: Could not read file ${file}: ${err.message}`,
            );
          }
        }
      }

      // Add overall statistics to the end of full content
      fullContent += `\n\n# Summary\n\n`;
      fullContent += `Total files processed: ${totalFilesProcessed}\n`;

      // Add table of contents to LLMs content
      let tocContent = "";
      for (const entry of tocEntries) {
        tocContent += entry.startsWith("  ") ? `${entry}\n` : `- ${entry}\n`;
      }

      // Insert TOC after the introduction
      const tocPlaceholder = `## TABLE OF CONTENTS\n\n`;
      llmsContent = llmsContent.replace(
        tocPlaceholder,
        `${tocPlaceholder}${tocContent}\n`,
      );

      // Add summary to LLMs content
      llmsContent += `\n\n# Summary\n\n`;
      llmsContent += `Total files processed: ${totalFilesProcessed}\n`;
      llmsContent += `Total documentation pages: ${nonEmptyFileCount}\n`;
      llmsContent += `This documentation is focused on technical references and release notes, prioritizing accuracy and relevance for LLM processing.\n`;

      // Write the full content file
      const fullPath = path.join(langOutDir, "llms-full.txt");
      fs.writeFileSync(fullPath, fullContent, "utf8");

      // Write the LLMs structured content file
      const llmsPath = path.join(langOutDir, "llms.txt");
      fs.writeFileSync(llmsPath, llmsContent, "utf8");
    }
  } catch (err) {
    console.error("Error generating LLM files:", err);
    process.exit(1);
  }
}

/**
 * Generate a hierarchical directory listing of all documentation files
 */
function generateDirectoryListing(files, lang) {
  // Group files by directory
  const directoryTree = {};
  const nonEmptyFiles = [];

  files.forEach((file) => {
    // Check if file is empty or effectively empty (only contains frontmatter)
    try {
      const content = fs.readFileSync(file, "utf8");

      // Skip empty files or files with only frontmatter
      const contentWithoutFrontmatter = content
        .replace(/^---\n([\s\S]*?)\n---\n/, "")
        .trim();
      if (!contentWithoutFrontmatter) {
        return; // Skip this file
      }

      // Add to the list of non-empty files
      nonEmptyFiles.push(file);

      // Create a path relative to the language directory
      let relativePath = file;

      // For English, strip './src/' prefix
      if (lang === "en") {
        relativePath = file.replace(/^\.\/src\//, "");
      }
      // For other languages, strip './src/lang/' prefix
      else {
        relativePath = file.replace(new RegExp(`^\\./src/${lang}/`), "");
      }

      // Split the path into directories
      const parts = relativePath.split("/");

      // Create the HTML path version that would be used in the built site
      const htmlPath = relativePath.replace(/\.md$/, ".html");
      const fullUrl =
        lang === "en"
          ? `https://cookbook_ao.arweave.net/${htmlPath}`
          : `https://cookbook_ao.arweave.net/${lang}/${htmlPath}`;

      // Get the filename without extension
      const fileName = path.basename(file, ".md");

      // Find the title from the file
      let title = fileName;
      const titleMatch = content.match(/^# (.*?)$/m);
      if (titleMatch) {
        title = titleMatch[1];
      } else {
        // If no title found, use prettified version of filename
        title = fileName
          .replace(/-/g, " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase());
      }

      // Build the directory tree
      let current = directoryTree;
      const dirPath = parts.slice(0, -1);

      dirPath.forEach((dir) => {
        if (!current[dir]) {
          current[dir] = {};
        }
        current = current[dir];
      });

      // Add the file to the current directory
      if (!current._files) {
        current._files = [];
      }
      current._files.push({ title, path: fullUrl });
    } catch (err) {
      console.warn(`Warning: Could not read file ${file}: ${err.message}`);
    }
  });

  // Convert the directory tree to Markdown
  let result = "";

  // Track heading levels properly
  function processDirectory(dir, level = 1) {
    // Process directories first (sorted alphabetically)
    const dirs = Object.keys(dir)
      .filter((key) => key !== "_files")
      .sort();

    dirs.forEach((dirName) => {
      // Create a header for the directory with proper heading level
      const dirHeader =
        dirName.charAt(0).toUpperCase() + dirName.slice(1).replace(/-/g, " ");
      result += `${"#".repeat(level + 1)} ${dirHeader}\n\n`;

      // Process subdirectory with increased level
      processDirectory(dir[dirName], level + 1);
    });

    // Then process files (sorted alphabetically)
    if (dir._files && dir._files.length > 0) {
      dir._files.sort((a, b) => a.title.localeCompare(b.title));

      dir._files.forEach((file) => {
        result += `- [${file.title}](${file.path})\n`;
      });

      result += "\n";
    }
  }

  processDirectory(directoryTree);

  return {
    directoryStructure: result,
    nonEmptyFileCount: nonEmptyFiles.length,
  };
}

/**
 * Extract a brief summary from the content
 */
function extractSummary(content) {
  // Try to find the first paragraph after a heading that isn't a list or code block
  const paragraphs = content.split("\n\n");

  for (const paragraph of paragraphs) {
    // Skip headings, code blocks, lists
    if (
      !paragraph.startsWith("#") &&
      !paragraph.startsWith("```") &&
      !paragraph.startsWith("- ") &&
      !paragraph.startsWith("* ") &&
      !paragraph.startsWith("|") &&
      paragraph.trim().length > 30
    ) {
      // Return the first substantial paragraph (with reasonable length)
      return paragraph.trim();
    }
  }

  // If no good paragraph found, just return first 150 chars
  return content.substring(0, 150).trim() + "...";
}

/**
 * Extract API information from reference content
 */
function extractAPIInfo(content) {
  let apiInfo = "";

  // Extract function/class definitions
  const functionMatches = content.match(
    /###? (function |class |interface |type )?`?[\w\.]+`?/gi,
  );
  if (functionMatches && functionMatches.length > 0) {
    apiInfo += "### API Definitions\n";
    for (const match of functionMatches) {
      apiInfo += `- ${match.replace(/^###? /, "")}\n`;
    }
  }

  // Extract code blocks which are likely function signatures
  const codeBlocks = [];
  const codeRegex = /```(?:js|javascript|typescript|ts)?\n([\s\S]*?)```/g;
  let codeMatch;
  while ((codeMatch = codeRegex.exec(content)) !== null) {
    if (
      codeMatch[1].includes("(") &&
      codeMatch[1].includes(")") &&
      codeMatch[1].length < 300
    ) {
      codeBlocks.push(codeMatch[1].trim());
    }
  }

  if (codeBlocks.length > 0) {
    apiInfo += "\n### Code Examples\n";
    for (const block of codeBlocks.slice(0, 3)) {
      // Limit to first 3 examples
      apiInfo += "```\n" + block + "\n```\n\n";
    }
  }

  // Extract parameter tables if present
  if (content.includes("| Parameter ") || content.includes("| Name ")) {
    const tableRegex = /\|[\s\-:|]+\|([\s\S]*?)(?=\n\n|\n#)/g;
    let tableMatch;
    while ((tableMatch = tableRegex.exec(content)) !== null) {
      apiInfo += "\n### Parameters\n";
      apiInfo += tableMatch[0] + "\n\n";
    }
  }

  return apiInfo;
}

/**
 * Extract release note information
 */
function extractReleaseInfo(content, title) {
  let releaseInfo = "";

  // Try to extract version number from title or content
  const versionMatch =
    title.match(/v?(\d+\.\d+\.\d+)/) ||
    content.match(/version (\d+\.\d+\.\d+)/i);
  if (versionMatch) {
    releaseInfo += `Version: ${versionMatch[1]}\n\n`;
  }

  // Extract release date if present
  const dateMatch =
    content.match(/released on (\w+ \d+,? \d{4})/i) ||
    content.match(/date: (\d{4}-\d{2}-\d{2})/i);
  if (dateMatch) {
    releaseInfo += `Date: ${dateMatch[1]}\n\n`;
  }

  // Extract bullet points for changes
  const bulletPoints = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      (trimmed.startsWith("- ") || trimmed.startsWith("* ")) &&
      !trimmed.includes("![") &&
      trimmed.length > 10
    ) {
      bulletPoints.push(trimmed);
    }
  }

  if (bulletPoints.length > 0) {
    releaseInfo += "Changes:\n";
    for (const point of bulletPoints) {
      releaseInfo += point + "\n";
    }
  } else {
    // If no bullet points, try to extract paragraphs
    const paragraphs = content.split("\n\n");
    for (const paragraph of paragraphs.slice(0, 3)) {
      // Limit to first 3 paragraphs
      if (
        paragraph.trim().length > 30 &&
        !paragraph.startsWith("#") &&
        !paragraph.startsWith("```")
      ) {
        releaseInfo += paragraph.trim() + "\n\n";
      }
    }
  }

  return releaseInfo;
}

// Run the function immediately without any checks
generateLLMsFull();

// Export the function for use in other scripts
export default generateLLMsFull;
