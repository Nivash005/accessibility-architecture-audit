import fs from "node:fs/promises";

const files = ["client/index.html", "client/services.html", "client/reports.html"];
let failed = false;

for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  const response = await fetch("https://validator.w3.org/nu/?out=json", {
    method: "POST",
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: html
  });

  if (!response.ok) {
    console.error(`W3C validator request failed for ${file}: HTTP ${response.status}`);
    failed = true;
    continue;
  }

  const result = await response.json();
  const errors = (result.messages || []).filter((message) => message.type === "error");

  if (errors.length) {
    failed = true;
    console.error(`W3C validation failed for ${file}`);
    for (const error of errors) {
      console.error(`- ${error.message}`);
    }
  } else {
    console.log(`W3C validation passed: ${file}`);
  }
}

process.exitCode = failed ? 1 : 0;
